# data/classics

本目录用于存放 P3 古籍知识库阶段的结构化古籍片段。

当前状态：

- 已建立 JSON 结构骨架。
- 尚未接入真实古籍内容。
- 真实古籍内容必须由用户提供或由用户确认来源。
- 禁止编造古籍原文、书名、章节、版本或出处。

## 文件说明

- `schema.json`：统一字段说明。
- `bazi.json`：八字命理片段。
- `ziwei.json`：紫微斗数片段。
- `fengshui.json`：风水片段。
- `yijing.json`：易经问事片段。
- `dream.json`：周公解梦片段。
- `palm.json`：相术 / 手相片段。

## 入库要求

每条片段必须至少包含：

- `id`
- `book_title`
- `edition`
- `chapter`
- `source_text`
- `plain_explanation`
- `keywords`
- `module`
- `scenarios`
- `source_reference`
- `copyright_status`
- `review_status`
- `uncertainty_notes`

未审核、版权未确认、来源不可定位的内容不得面向用户展示。
