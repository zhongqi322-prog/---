/* global console, process */

import { createRequire } from 'node:module';
import { mkdir } from 'node:fs/promises';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright');

const baseUrl = (process.argv[2] || 'https://www.laozuzongxuanxue.cn').replace(/\/$/, '');
const screenshotDir = 'output/playwright';

const requiredAfterReport = [
  '古籍出处',
  '书名：',
  '原文：',
  '白话解释：',
  '与本问题的关系：',
  '风险提醒',
];

const mockUnlockTexts = [
  '完整报告未模拟解锁',
  '查看模拟解锁说明',
  '不会跳转微信支付',
  '不会输入付款密码',
  '不会产生真实扣款',
];

const paymentModalTexts = [
  '模拟解锁说明',
  '当前不会真实付款',
  '不会跳转微信支付',
  '不会输入付款密码',
  '不会从任何账户扣钱',
  '不会真实扣款',
  '不会产生真实订单',
  '只是演示未来付费解锁的页面流程',
  '我理解，模拟解锁',
];

async function assertText(page, expected, scope = 'page') {
  const text = await page.locator('body').innerText();
  const missing = expected.filter((item) => !text.includes(item));
  if (missing.length > 0) {
    throw new Error(`${scope} missing text: ${missing.join(', ')}`);
  }
}

async function acknowledgeCloudBaseTestDomain(page) {
  const text = await page.locator('body').innerText();
  if (!text.includes('页面访问提示') || !text.includes('CloudBase')) {
    return;
  }

  const confirmButton = page.getByRole('button', { name: /确定访问/ });
  await confirmButton.waitFor({ timeout: 8000 });
  await page.waitForTimeout(3500);
  await confirmButton.click();
  await page.waitForLoadState('networkidle');
}

async function assertRoute(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  await acknowledgeCloudBaseTestDomain(page);
  if (!response || response.status() >= 400) {
    throw new Error(`Route failed: ${route} (${response?.status() ?? 'no response'})`);
  }
}

const launchOptions = { headless: true };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) {
  launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
}

await mkdir(screenshotDir, { recursive: true });

const browser = await chromium.launch(launchOptions);

try {
  const viewports = [
    ['desktop', { width: 1366, height: 900 }],
    ['mobile', { width: 390, height: 844 }],
  ];

  for (const [label, viewport] of viewports) {
    const page = await browser.newPage({ viewport });
    const consoleErrors = [];
    const failedResponses = [];

    page.on('console', (message) => {
      if (message.type() === 'error') {
        consoleErrors.push(message.text());
      }
    });
    page.on('response', (response) => {
      const status = response.status();
      const url = response.url();
      const isCloudBaseNoticeRoot =
        baseUrl.includes('tcloudbase.com') &&
        status === 404 &&
        (url === `${baseUrl}/` || url === baseUrl);
      if (status >= 400 && !url.includes('favicon.ico') && !url.includes('/api/reports')) {
        if (isCloudBaseNoticeRoot) {
          return;
        }
        failedResponses.push(`${status} ${url}`);
      }
    });

    try {
      await page.goto(`${baseUrl}/`, { waitUntil: 'networkidle' });
      await acknowledgeCloudBaseTestDomain(page);
      await page.evaluate(() => globalThis.localStorage.clear());
      await assertText(page, ['今日黄历', '八字解读', '免费摘要 + 模拟解锁', '风险说明'], `${label} home`);
      await page.screenshot({ caret: 'initial', fullPage: true, path: `${screenshotDir}/p6-${label}-home.png` });

      await assertRoute(page, '/service/wish/');
      await assertText(page, ['祈福心愿', '线下寺庙', '祈福', '点灯', '不承诺灵验'], `${label} wish`);
      await page.screenshot({ caret: 'initial', fullPage: true, path: `${screenshotDir}/p6-${label}-wish.png` });

      await assertRoute(page, '/service/ziwei/');
      await assertText(page, ['紫微斗数', '古籍与文化说明', '填写资料', '先看免费摘要，再通过模拟解锁'], `${label} ziwei`);

      const fields = [
        ['input[name="birthDate"]', '1990-01-01'],
        ['input[name="birthTime"]', '08:00'],
        ['select[name="gender"]', '男'],
        ['textarea[name="focus"]', '想了解接下来工作方向'],
      ];

      for (const [selector, value] of fields) {
        const field = page.locator(selector);
        if ((await field.count()) > 0) {
          if (selector.startsWith('select')) {
            await field.selectOption(value);
          } else {
            await field.fill(value);
          }
        }
      }

      await page.getByRole('button', { name: '生成 AI 参考报告' }).click();
      await page.getByText('报告编号').waitFor({ timeout: 60000 });
      await assertText(page, requiredAfterReport, `${label} mock report`);
      await assertText(page, mockUnlockTexts, `${label} mock unlock prompt`);
      await page.screenshot({ caret: 'initial', fullPage: true, path: `${screenshotDir}/p6-${label}-ziwei-report.png` });

      await page.getByText('查看模拟解锁说明').click();
      await page.waitForTimeout(400);
      await assertText(page, paymentModalTexts, `${label} payment modal`);
      await page.screenshot({ caret: 'initial', fullPage: true, path: `${screenshotDir}/p6-${label}-payment-modal.png` });

      await page.getByText('我理解，模拟解锁').click();
      await page.waitForTimeout(400);
      await assertText(page, ['完整报告已模拟解锁', '没有真实付款', '没有真实订单', '没有真实扣款'], `${label} mock unlocked`);

      await assertRoute(page, '/records/');
      await page.waitForTimeout(800);
      await assertText(page, ['紫微斗数', '已模拟解锁'], `${label} records`);
      await page.screenshot({ caret: 'initial', fullPage: true, path: `${screenshotDir}/p6-${label}-records.png` });

      const blockingErrors = consoleErrors.filter((message) => {
        if (message.includes('Failed to load resource')) {
          return false;
        }
        return true;
      });
      if (blockingErrors.length > 0 || failedResponses.length > 0) {
        throw new Error(`${label} browser errors: ${[...blockingErrors, ...failedResponses].join(' | ')}`);
      }
    } finally {
      await page.close();
    }
  }

  console.log(`p6-www-smoke passed: ${baseUrl}`);
} finally {
  await browser.close();
}
