## 108my-2dpage

本目录是独立 Git 仓库，使用 Vue 3 + TypeScript + Vite 的个人主页/导航页项目，包含导航数据、主题/语言状态、网络检测、静态资源和 Docker + Nginx 部署配置。

**Important:** 不要把 `node_modules/`、`dist/` 当作源码维护；修改源码、配置或部署文件后优先用 `pnpm run build` 验证。

**Important:** 源码、依赖、资源和 CI 全部在本仓库；不依赖同级其他项目。

### Important files

- `package.json` — 项目脚本和依赖入口；`build` 会先运行 `vue-tsc -b` 再执行 Vite 构建。
- `index.html` — Vue 挂载壳、浏览器标题及 favicon / Apple 主屏幕图标引用入口；图标资源细则见 `public/AGENTS.md`。
- `pnpm-lock.yaml` — 当前依赖锁文件；调整依赖时保持锁文件同步。
- `vite.config.ts` — Vite 与 Vue 插件配置；变更构建行为时同步检查 TypeScript 配置。
- `tsconfig.json` / `tsconfig.app.json` / `tsconfig.node.json` — TypeScript 工程引用与严格检查配置。
- `Dockerfile` / `nginx.conf` / `.dockerignore` — 生产镜像、静态站点服务和构建上下文边界。
- `.github/workflows/2dpage-cicd.yml` — 本项目独立构建、GHCR 镜像发布和 SSH 部署，仅更新内网 `100my-page-2d` 容器。
- `src/` — 前端源码主目录，子目录有更具体的 AGENTS.md。
- `public/` — 原样发布的头像、favicon 和导航图标资源。

### Implementation notes

- 面向用户的展示文案优先进入 `src/i18n/`，导航、菜单、个人信息等数据优先进入 `src/config/`。
- 浏览器标题在 `index.html` 中维护，使用 `LBQ©2D©2025`；2025 是固定展示年份，不随当前日期自动变化。标签页图标采用透明底蓝青双色交叠圆环，在本项目 `public/` 中独立维护；Apple 主屏幕图标保留透明底蓝色 L。
- 主题、语言等跨组件状态放在 `src/store/`；单组件临时状态留在组件内部。
- 本地 `.env` 不跟踪、不进入 Docker；仓库与镜像只使用空白 `.env.example`，构建使用 Node.js 24 + pnpm 10 frozen-lockfile。
- 修改部署链路时同时核对 `package.json` 脚本、`Dockerfile` 安装/构建命令和 `.dockerignore`。
- `vite.config.ts` 使用 `VITE_BASE_PATH` 控制构建基础路径，默认 `/`；统一站点构建设置为 `/2D/`，配置图片使用 `import.meta.env.BASE_URL`，HTML 图标路径由 Vite 处理。
- 本目录 Dockerfile/Nginx 保留为根路径本地部署配置；生产工作流使用 `.github/deploy/Dockerfile.2d` 和 `nginx-2d.conf`，以 `/2D/` 为前缀，仅接入 Docker 内网，由主入口按 `page-2d` 别名转发，不发布宿主端口。
- Git 状态和提交以本目录独立仓库为准。
- Windows 下重命名项目目录时，同时修正本地 pnpm 安装元数据、依赖 junction 和生成启动器中的绝对路径；它们属于安装产物，不作为源码维护。

- GitHub 远程为 `neo-jack/page2d`，私有仓库、master 主分支；主分支以独立项目初始提交重建，旧历史保存在本机归档。上传默认仅 CI，部署需仓库变量 DEPLOY_ENABLED=true。
