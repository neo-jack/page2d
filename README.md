# page2d

使用 Vue 3、TypeScript 和 Vite 构建的个人主页与导航站，支持主题切换、中英文界面、响应式布局和站点状态检测。

项目用于整理个人介绍、常用链接与作品入口。

## 在线体验

[打开 2D 个人主页](https://www.lanbinquan.top/2D/)

## 快速开始

建议使用 Node.js 24 和 pnpm 10。

```bash
git clone https://github.com/neo-jack/page2d.git
cd page2d
pnpm install --frozen-lockfile
pnpm run dev
```

个人资料与导航链接在 `src/config/` 中维护，界面文案在 `src/i18n/` 中维护。发布到子路径时，通过 `VITE_BASE_PATH` 设置路径前缀。

## 构建与验证

在仓库根目录执行：

```bash
# 检查 Vue / TypeScript 类型并生成生产构建
pnpm run build

# 预览构建产物
pnpm run preview
```
