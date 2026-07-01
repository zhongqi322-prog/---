/* global console, process */

import { createRequire } from 'node:module';

const require = createRequire(import.meta.url);
const { chromium } = require('playwright-core');

const baseUrl = (process.argv[2] || 'https://www.laozuzongxuanxue.cn').replace(/\/$/, '');

const requiredAfterReport = [
  '古籍出处',
  '书名：',
  '原文：',
  '白话解释：',
  '与本问题的关系：',
  '风险提醒',
];

async function assertText(page, expected, scope = 'page') {
  const text = await page.locator('body').innerText();
  const missing = expected.filter((item) => !text.includes(item));
  if (missing.length > 0) {
    throw new Error(`${scope} missing text: ${missing.join(', ')}`);
  }
}

async function assertRoute(page, route) {
  const response = await page.goto(`${baseUrl}${route}`, { waitUntil: 'networkidle' });
  if (!response || response.status() >= 400) {
    throw new Error(`Route failed: ${route} (${response?.status() ?? 'no response'})`);
  }
}

const launchOptions = { headless: true };
if (process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE) {
  launchOptions.executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
}

const browser = await chromium.launch(launchOptions);
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });

try {
  await assertRoute(page, '/');
  await assertText(page, ['今日黄历', '八字解读', '风险说明'], 'home');

  const routes = [
    '/service/bazi/',
    '/service/ziwei/',
    '/service/marriage/',
    '/service/fengshui/',
    '/service/yijing/',
    '/service/wish/',
    '/service/dream/',
    '/service/palm/',
    '/service/classics/',
    '/records/',
  ];

  for (const route of routes) {
    await assertRoute(page, route);
  }

  await assertRoute(page, '/service/bazi/');

  const fields = [
    ['input[name="name"]', '测试用户'],
    ['input[name="birthDate"]', '1990-01-01'],
    ['input[name="birthTime"]', '08:00'],
    ['textarea[name="question"]', '想了解接下来工作方向'],
  ];

  for (const [selector, value] of fields) {
    const field = page.locator(selector);
    if ((await field.count()) > 0) {
      await field.fill(value);
    }
  }

  await page.locator('button[type="submit"]').click();
  await page.waitForTimeout(800);
  await assertText(page, requiredAfterReport, 'mock report');

  await page.getByText('解锁完整报告').click();
  await page.waitForTimeout(400);
  await assertText(page, ['mock 支付', '不会产生真实扣款'], 'mock payment modal');

  await page.getByText('mock 支付成功').click();
  await page.waitForTimeout(400);
  await assertText(page, ['完整报告已 mock 解锁'], 'mock unlock');

  await assertRoute(page, '/records/');
  await assertText(page, ['八字解读'], 'records');

  console.log(`p6-www-smoke passed: ${baseUrl}`);
} finally {
  await browser.close();
}
