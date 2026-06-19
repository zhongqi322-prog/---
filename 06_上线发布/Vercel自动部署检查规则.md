# Vercel自动部署检查规则

## 1. 触发时机

每次向 `main` 分支推送后，必须检查 Vercel 自动部署状态。

适用场景：

- 修改前端页面、组件或样式。
- 修改 mock 报告、古籍出处或风险提醒展示。
- 修改 `data/classics/*.json`。
- 修改构建配置、依赖或脚本。
- 修改上线发布相关文档后需要确认生产状态。

## 2. 检查内容

在 Vercel 项目页检查：

- 最新部署是否来自 `main` 分支。
- 最新部署提交 SHA 是否与 GitHub 最新提交一致。
- 状态是否为 `Ready` / `准备好`。
- 生产域名是否仍可访问：

```text
https://laozuzong-xuanxue.vercel.app
```

## 3. 必跑命令

每次部署 Ready 后，执行：

```powershell
python scripts/p5_public_smoke_test.py https://laozuzong-xuanxue.vercel.app
```

## 4. 失败处理

如果部署失败：

1. 不进入下一阶段。
2. 记录失败提交 SHA。
3. 查看 Vercel 构建日志。
4. 本地复现：

```powershell
npm run lint
npx tsc --noEmit
npm run build
```

5. 修复后重新推送 `main`。

## 5. 记录位置

部署状态和 smoke test 结果写入：

- `06_上线发布/P5测试记录.md`
- `06_上线发布/上线检查清单.md`
- `00_项目总纲/开发日志.md`
