# Vercel网页端部署指南

目的：绕过当前 Windows 中文用户名导致的 Vercel CLI 登录错误，使用 Vercel 网页端直接连接 GitHub 仓库部署。

## 1. 当前 CLI 阻塞

已尝试：

- `npx --yes vercel@latest whoami`
- 禁用遥测后执行 `vercel whoami`
- 设置 `CI=1`
- 设置 `USER=vercel` / `USERNAME=vercel`
- 设置 `npm_config_user_agent=npm`
- 执行 `vercel deploy --yes --prod`

结果：

```text
Error: 钟翔 @ vercel 54.14.2 node-v24.13.1 win32 (x64) is not a legal HTTP header value
```

判断：当前环境的 Vercel CLI 会把 Windows 中文用户名写入请求头，导致登录流程失败。该问题不能通过仓库代码修复。

## 2. 推荐部署方式

使用 Vercel 网页端导入 GitHub 仓库。

操作步骤：

1. 打开 Vercel Dashboard。
2. 选择 `Add New...`。
3. 选择 `Project`。
4. 选择 GitHub 仓库 `zhongqi322-prog/---`。
5. Root Directory 选择：

```text
.
```

6. Framework Preset 选择：

```text
Next.js
```

7. Build Command 使用：

```text
npm run build
```

8. Install Command 使用默认值：

```text
npm install
```

9. Output Directory 留空，让 Vercel 按 Next.js 默认方式处理。
10. 点击 Deploy。

## 3. 部署后必须回填

部署成功后，把公开地址写入：

- `06_上线发布/P5测试记录.md`
- `06_上线发布/上线检查清单.md`
- `08_阶段交接/P5_发布测试阶段_交接文.md`

## 4. 公开地址 Smoke Test

部署成功后，在仓库根目录执行：

```powershell
python scripts/p5_public_smoke_test.py https://你的项目地址.vercel.app
```

通过标准：

- 首页可打开。
- 核心服务页可打开。
- 390px 移动端视口可用。
- 八字表单可提交。
- mock 报告可生成。
- 古籍出处可见。
- 风险提醒可见。
- mock 支付弹窗可打开。
- mock 解锁可完成。
- 我的记录可读取 localStorage。

## 5. CLI 备选方案

如果必须使用 CLI，建议在英文用户名或英文路径环境中重新执行：

```powershell
npx --yes vercel@latest login
npx --yes vercel@latest deploy --prod
```

当前机器当前用户环境不建议继续使用 CLI 登录。
