# 108my-2dpage

独立 Vue 3 个人主页仓库。Node.js 24 + pnpm：`pnpm install --frozen-lockfile`、`pnpm run dev`、`pnpm run build`。源码已在根目录，无相邻仓库依赖。

`VITE_BASE_PATH` 配置发布前缀；默认根路径，原个人站点兼容发布使用 `/2D/`。Dockerfile / nginx.conf 提供独立静态部署；`.github/workflows/2dpage-cicd.yml` 是本仓库的 CI/CD，保留原站点服务器容器兼容命名。其他环境使用自己的域名与服务器配置即可。

以下为原项目使用说明：

# 0MainPage - 个人主页 / 导航页（Vue3 + TypeScript）

一个个人主页风格的导航站点，支持主题切换、国际化、响应式布局与站点状态（心跳）检测，并提供 Docker + Nginx 的生产部署方案。

---


## 技术栈

- **框架**：Vue 3
- **语言**：TypeScript
- **构建**：Vite
- **状态管理**：Pinia
- **样式**：SCSS
- **部署**：docker自动化

---

## 功能点

### 1. 动画

- **页面加载淡入**：使用 `<Transition name="fade">` 控制主内容加载后淡入
- **局部动画能力**：全局样式中提供基础动画 keyframes

### 2. 主题色 / 深浅模式

- **主题色（主色）**：通过 CSS 变量 `--primary-color` 管理
- **深浅模式**：通过容器 class（`dark-mode` / `light-mode`）切换一组 CSS 变量
- **持久化**：主题相关设置使用 `localStorage` 保存

### 3. 国际化（简易 i18n）

- **文案组织**：使用 `zh/en` 两份文案对象
- **切换方式**：通过 Pinia 的 `locale` 状态切换

### 4. 响应式

- **适配方式**：通过组件内 `@media` 与布局拆分实现响应式适配

### 5. 心跳包测试 / 站点状态检测

- **展示状态**：展示 `online/offline/checking`
- **检测方式**：对站点发起 `HEAD` 请求 + `AbortController` 超时控制（5s）
- **定时策略**：默认每 60 秒检测一次，也支持手动刷新
- **开发/生产差异**：会根据 `import.meta.env.DEV` 选择 `localUrl/prodUrl`

### 6. 自动化部署（Docker + Nginx）

- **构建/运行**：Node 构建 + Nginx 运行
- **Nginx 配置**：包含缓存与 Vue 路由回退
- **适用场景**：适合部署到任意支持 Docker 的服务器或平台

---

## GitHub 与提交历史

仓库：<https://github.com/neo-jack/page2d>（私有）。独立仓库主分支为 master，从整理后的项目初始提交开始维护；拆分前历史保存在本机项目归档中。CI 自动检查，只有仓库变量 `DEPLOY_ENABLED=true` 才执行镜像发布及服务器部署。npm 包发布仍单独维护。
