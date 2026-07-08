# P6 AI 接口线上服务端部署准备记录

更新时间：2026-07-09

## 1. 阶段目标

在 DeepSeek AI-only 接入和第一轮真实输出安全加固完成后，准备线上部署所需的脚本、文档、检查项和验证路径。

本阶段不执行生产部署，不修改生产域名解析，不配置生产密钥。

## 2. 当前结论

真实 AI 上线必须使用支持服务端 API 的部署环境。

原因：

- `/api/reports` 是 Next.js 服务端动态路由。
- 纯静态托管无法运行 `/api/reports`。
- 静态托管模式下，页面只能在接口失败后回退为本地测试报告。

当前公开域名检查：

- `https://www.laozuzongxuanxue.cn/` 返回 200。
- `https://www.laozuzongxuanxue.cn/api/reports` 的 GET 请求返回 HTML 页面，不是 API 响应。
- 结论：当前公开环境仍不具备真实 AI 服务端接口能力。

## 3. 已完成准备

1. 新增 `scripts/ai_report_api_check.mjs`。
2. 新增 npm 命令：

```powershell
npm run test:ai -- https://你的线上域名
```

3. `test:ai` 覆盖 5 个代表性功能：
   - 八字解读
   - 易经问事
   - 祈福心愿
   - 周公解梦
   - 住宅风水
4. `test:ai` 检查项：
   - `/api/reports` 是否返回结构化报告。
   - `analysis`、`realitySuggestions`、`avoidActions`、`followUps` 是否为 3-5 条。
   - 是否包含古籍引用。
   - 是否包含固定风险提醒。
   - 是否命中高风险正向表达。
5. 更新 `06_上线发布/腾讯云国内部署指南.md`：
   - 区分真实 AI 服务端部署和静态兜底部署。
   - 明确真实 AI 必须配置 `DEEPSEEK_API_KEY` 和 `DEEPSEEK_MODEL=deepseek-v4-pro`。
6. 更新 `06_上线发布/国内部署检查清单.md`：
   - 增加线上服务端 API、环境变量、`test:ai` 和 P6 smoke 检查项。
7. 新增 CloudBase 云托管 Dockerfile 部署文件：
   - `Dockerfile`
   - `.dockerignore`

## 4. 已验证

本地服务端环境：

- `npm run test:ai -- http://127.0.0.1:3009` 通过。
- `npm run test:p6 -- http://127.0.0.1:3009` 通过。
- `npm run lint` 通过。
- `npm run build` 通过。
- `npm run build:static` 通过。
- `docker --version` 本机检查超时，未完成本地 Docker 镜像构建验证。

`test:ai` 输出摘要：

- bazi：analysis=5，suggestions=5，avoid=5，followUps=5，citations=2。
- yijing：analysis=5，suggestions=5，avoid=5，followUps=5，citations=2。
- wish：analysis=5，suggestions=5，avoid=5，followUps=5，citations=2。
- dream：analysis=5，suggestions=5，avoid=5，followUps=5，citations=2。
- fengshui：analysis=5，suggestions=5，avoid=5，followUps=5，citations=2。

## 5. 线上部署要求

如要启用真实 AI，线上平台必须满足：

1. 支持 Next.js 服务端 API / 云函数 / 云托管。
2. 支持 `npm ci && npm run build`。
3. 支持 `npm run start` 或等效 Next.js 服务端运行时。
4. 支持配置服务端环境变量：

```text
DEEPSEEK_API_KEY=线上有效密钥
DEEPSEEK_MODEL=deepseek-v4-pro
```

CloudBase Git 平台部署页面建议：

```text
目标目录：留空；如果控制台强制要求，填 .
Dockerfile 文件：有
Dockerfile 名称：Dockerfile
访问端口：80
服务端口：3000
服务名称：fengshui-ai-site
```

上线后必须验证：

```powershell
npm run test:ai -- https://www.laozuzongxuanxue.cn
npm run test:p6 -- https://www.laozuzongxuanxue.cn
```

## 6. 阶段审核

评分：90 / 100。

通过项：

- 本地服务端部署路径验证完整。
- 线上验证脚本已补齐。
- 部署文档已从静态托管改为服务端 / 静态兜底双路径。
- 当前公开域名 API 状态已复查，明确仍不是服务端 API 环境。

扣分项：

- 尚未执行生产部署。
- 尚未在线上配置 `DEEPSEEK_API_KEY`。
- 尚未获得腾讯云具体服务端产品形态和临时地址。
- API Key 已在对话中出现过，正式上线前应重新生成。

## 7. 下一步

进入生产部署前需要用户参与，因为这涉及腾讯云账号、线上环境变量、密钥和生产部署。

建议用户先确认：

1. 当前腾讯云项目是否支持云托管 / 云函数 / Next.js 服务端运行。
2. 是否准备把当前静态托管迁移到服务端部署。
3. 正式上线前是否重新生成 DeepSeek API Key。

支付阶段继续暂停。
