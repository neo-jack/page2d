## 前端源码

本目录维护 Vue 主页、导航卡片、展示文案与主题状态，继承项目根目录规则。

### Important files

- `App.vue` — 首页布局与分类切换；顶部操作区保留语言、主题和设置。
- `components/NavGrid/NavGrid.vue` — 按分类展示卡片；文档卡片通过 `kind` 显示左侧绿点和标题右侧 SKILL 标识，点击整卡进入图文介绍，不显示额外入口文案，也不参与服务在线检测。
- `config/` — 导航及个人资料配置，细则见 `config/AGENTS.md`。
- `i18n/zh.ts` / `i18n/en.ts` — 中英文展示文案；分类键与配置同步。
- `pages/design-workflow/` — 图文介绍、JS 下载与 Skill 参考，细则见目录内 `AGENTS.md`。

### Implementation notes

- 分类与卡片类型独立维护；调整分类不能改变文档卡片的展示与检测行为。
- 修改后在项目根目录运行 `pnpm run build`，并检查分类切换及中英文展示。
- 首屏偏好在 `main.ts` 挂载前初始化，首页同步加载并直接渲染，不恢复延迟挂载或整卡入场淡入。`index.html` 提前读取 darkMode 铺设背景；App 的主题监听与 hash 路由分别同步根节点 data-theme/data-page，背景颜色调整时同步首屏壳。

- NavGrid 在卡片头部 GitHub 等图标左侧展示可选子页面小长条，只显示名称、不显示路径；头部与入口组支持窄屏换行；子链接用原生新标签页导航并阻止事件冒泡，点击或键盘激活不能触发整卡跳转。
