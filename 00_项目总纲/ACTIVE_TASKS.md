# ACTIVE_TASKS.md｜当前活跃任务

## 当前阶段

第 0 阶段：项目规则与目录建设

## 当前任务

### TASK-0001：建立项目目录和核心文档

状态：已完成

负责 Agent：总控架构 Agent

输入文件：
- `00_项目总纲/项目启动总文档.md`
- `00_项目总纲/CONTEXT.md`

输出文件：
- `README.md`
- `AGENTS.md`
- `00_项目总纲/MVP范围.md`
- `00_项目总纲/任务看板.md`
- `03_古籍知识库/古籍录入规范.md`
- `03_古籍知识库/出处引用规范.md`
- `05_技术开发/紫微斗数推理架构.md`
- `06_上线发布/发布路线.md`
- `00_项目总纲/开发日志.md`

验收标准：
- [x] 只创建文档和目录
- [x] 不写前端代码
- [x] 不接支付
- [x] 不接真实 AI
- [x] 不删减功能范围

验收结果：
- 第 0 阶段核心目录和文档已创建。
- `app/`、`components/` 和 `lib/` 中没有前端或业务代码。
- 未创建 `package.json`。
- 未接入真实支付或真实 AI。
- MVP 要求的 13 项功能均保留。

## 下一任务

### TASK-0002：补齐阶段模板文件

状态：已完成

负责 Agent：总控架构 Agent

输出文件：
- `00_项目总纲/STAGE_HANDOFF_TEMPLATE.md`
- `00_项目总纲/STAGE_REVIEW_TEMPLATE.md`

验收结果：
- [x] 已创建阶段交接模板
- [x] 已创建阶段审核模板

## 阶段状态

P0 待审核。建设任务已完成，审核报告已生成，必须修复项已处理，等待用户确认是否通过审核。

### TASK-0003：建立 GitHub 仓库治理内容

状态：已完成

负责 Agent：总控架构 Agent

输出文件：
- `.gitattributes`
- `CONTRIBUTING.md`
- `SECURITY.md`
- `.github/PULL_REQUEST_TEMPLATE.md`
- `.github/ISSUE_TEMPLATE/*.yml`

验收结果：
- [x] 已建立贡献与安全说明
- [x] 已建立 Pull Request 模板
- [x] 已建立 Bug、文档问题与功能建议模板
- [x] 未提前创建代码 CI
- [x] 未擅自选择开源许可证

### TASK-0004：建立 Obsidian 项目大脑内容

状态：已完成

负责 Agent：总控架构 Agent

输出文件：
- `00_项目总纲/OBSIDIAN_HOME.md`
- `00_项目总纲/决策记录.md`
- `00_项目总纲/灵感收集.md`
- `00_项目总纲/Obsidian模板/*.md`

验收结果：
- [x] 建立 Obsidian 项目工作台
- [x] 建立决策与灵感记录入口
- [x] 建立产品、古籍和用户测试模板
- [x] 所有内容仍位于同一个 GitHub 仓库
- [x] 未建立第二套知识库
