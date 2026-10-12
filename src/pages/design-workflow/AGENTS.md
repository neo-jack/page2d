## 设计稿还原图文介绍

本目录维护图文正文、历史截图与下载附件，由 `#/design-workflow` 访问。

### Important files

- `DesignWorkflow.vue` — 图文介绍、三个附件下载入口。
- `images/actual-*.png` — 经业务信息打码的历史截图；模板、科室、人员角色、评分和通知文本已用不透明色块替换，不能虚构同轮误差下降或完全还原结论。
- `downloads/heatmap.js.txt`、`downloads/overlay.js.txt` — 独立 CommonJS 脚本快照，下载恢复 `.js` 文件名。
- `downloads/SKILL.md.txt` — 已脱敏的主 Skill、参考文档及角色定义合集，仅提供下载，不是完整可安装技能包。

### Implementation notes

- 附件初始复制自 `100my-3dpage/src/data/note/A2design/downloads/`，本仓库独立保留，不跨项目导入，不自动覆盖用户级技能。
- 附件通过 Vite `?url` 导入，原生 `download` 指定文件名；不再内嵌 Skill 原文。
- 更新时核对脱敏、依赖、脚本语法与下载字节，附件内保留 CommonJS 使用方式与依赖说明；页面不展示使用说明段落、Skill 展开区或底部返回导航。
- 修改后运行 `pnpm run build`，检查下载入口、打码图片及生产资源路径。

- `images/redactions.json` 记录每张图的不透明遮盖坐标；页面缩略图与放大链接共用已打码资源，不得另行发布未打码原图。更新图片时重新检查业务文本及热力图/叠图中的重影文字。

- 「脚本下载与 Skill 参考」整体放在文章标题区之后、正文与效果图片之前，保留说明和三个下载按钮。
