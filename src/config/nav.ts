// 环境判断
const isDev = import.meta.env.DEV;
const skillsSourceUrl = "https://github.com/neo-jack/all-project/tree/master/.codex/skills";
const skillUrl = (name: string) => `${skillsSourceUrl}/${name}`;

// 导航分类
export type NavCategory = "AI" | "提效" | "研究" | "其他";

export const NAV_CATEGORIES: NavCategory[] = ["AI", "提效", "研究", "其他"];

// 导航图标配置
export interface NavIcon {
  // icon-park 图标名称或自定义图片路径（以 / 开头）
  icon: string;
  url: string;
  title: string;
}

export interface NavSubPage {
  path: string;
  name: string;
  nameEn: string;
  localUrl: string;
  prodUrl: string;
}

// 导航项配置
export interface NavItem {
  id: number;
  name: string;
  nameEn: string;
  icons: NavIcon[];
  localUrl: string;
  prodUrl: string;
  color: string;
  description: string;
  descriptionEn: string;
  techStack: string[];
  techStackEn: string[];
  highlights: string[];
  highlightsEn: string[];
  category: NavCategory;
  kind?: "skill";
  subPages?: NavSubPage[];
}

export const navItems: NavItem[] = [
  {
    id: 1,
    name: "手写 React 源码核心",
    nameEn: "React Core from Scratch",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: "https://github.com/neo-jack/102my-react",
        title: "GitHub",
      },
      {
        icon: `${import.meta.env.BASE_URL}icon/figma.svg`,
        url: "https://www.figma.com/design/66yZgdnDIB3orW1hM58aku/102%E6%BA%90%E7%A0%81?node-id=0-1&p=f",
        title: "Figma",
      },
    ],
    localUrl:
      "https://www.lanbinquan.top/React/",
    prodUrl:
      "https://www.lanbinquan.top/React/",
    color: "#4a9eff",
    description:
      "围绕 React 核心机制，从组件与虚拟 DOM 到 Fiber、协调更新与 Hooks，梳理渲染和状态管理的实现",
    descriptionEn:
      "Explore React internals through components, virtual DOM, Fiber, reconciliation, and Hooks",
    techStack: ["React", "TypeScript", "Rollup"],
    techStackEn: ["React", "TypeScript", "Rollup"],
    highlights: ["Fiber架构", "Hooks实现", "Reconciler", "并发模式"],
    highlightsEn: [
      "Fiber Architecture",
      "Hooks",
      "Reconciler",
      "Concurrent Mode",
    ],
    category: "研究",
  },
  {
    id: 11,
    name: "AI 竞品分析工作台",
    nameEn: "AI Competitive Analysis Workbench",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: "https://github.com/neo-jack/ai-app-studio",
        title: "GitHub",
      },
    ],
    localUrl: "http://localhost:3412/",
    prodUrl: "/Ai/",
    subPages: [
      { path: "/admin/", name: "后台", nameEn: "Admin", localUrl: "http://localhost:18112/admin/", prodUrl: "/Ai/admin/" },
      { path: "/monitor/", name: "队列监控", nameEn: "Queues", localUrl: "http://localhost:15555/", prodUrl: "/Ai/monitor/" },
      { path: "/observability/", name: "模型监控", nameEn: "Models", localUrl: "http://localhost:18112/observability/", prodUrl: "/Ai/observability/" },
    ],
    color: "#c9794a",
    description: "面向 AI 竞品研究的调研工作台，支持范围确认、资料采集、协作编排与结构化报告",
    descriptionEn: "An AI competitive research workbench for scope confirmation, evidence collection, orchestration, and structured reports",
    techStack: ["React", "FastAPI", "SQLite"],
    techStackEn: ["React", "FastAPI", "SQLite"],
    highlights: ["范围确认", "证据采集", "协作编排", "结构化报告"],
    highlightsEn: ["Scope Review", "Evidence Collection", "Orchestration", "Structured Reports"],
    category: "AI",
  },
  {
    id: 8,
    name: "界面元素选择器",
    nameEn: "UI Element Selector",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: "https://github.com/neo-jack/101my-agent",
        title: "GitHub",
      },
    ],
    localUrl: "http://127.0.0.1:5177/",
    prodUrl: "/AItool/",
    color: "#22c55e",
    description: "选择网页 DOM 元素，一键定位源码、转为 Figma 元素，复制网页信息",
    descriptionEn: "Select webpage DOM elements, locate source code in one click, convert elements to Figma, and copy webpage information",
    techStack: ["JavaScript", "Bookmarklet"],
    techStackEn: ["JavaScript", "Bookmarklet"],
    highlights: ["DOM 选择", "源码定位", "转为 Figma", "信息复制"],
    highlightsEn: ["DOM Selection", "Source Lookup", "Figma Conversion", "Copy Information"],
    category: "提效",
  },
  {
    id: 9,
    name: "desginer · 设计稿还原",
    nameEn: "desginer · UI Restoration",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: skillUrl("desginer"),
        title: "GitHub",
      },
    ],
    localUrl: `${import.meta.env.BASE_URL}#/design-workflow`,
    prodUrl: `${import.meta.env.BASE_URL}#/design-workflow`,
    color: "#06b6d4",
    description: "对照设计稿与运行页面，用组件截图、叠图和热力图定位差异，经定量测量、修复与复核逐步还原 UI",
    descriptionEn: "Compare designs with live pages using component screenshots, overlays and heatmaps, then measure, fix and verify UI differences",
    techStack: ["Playwright", "CDP"],
    techStackEn: ["Playwright", "CDP"],
    highlights: ["组件对比", "定量测量", "迭代修复"],
    highlightsEn: ["Component Comparison", "Measurements", "Iterative Fixes"],
    category: "提效",
    kind: "skill",
  },
  /* 暂时隐藏手写 Vue 核心，恢复时核对项目入口。
  {
    id: 10,
    name: "手写vue核心",
    nameEn: "Vue Core",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: "https://github.com/neo-jack",
        title: "GitHub",
      },
    ],
    localUrl: "http://localhost:5173",
    prodUrl: "https://github.com/neo-jack",
    color: "#8b949e",
    description: "从零实现 Vue 核心源码，包含响应式、依赖收集、渲染更新与组件机制",
    descriptionEn: "Build Vue core from scratch, including reactivity, dependency tracking, rendering updates, and component mechanisms",
    techStack: ["Vue", "TypeScript", "Vite"],
    techStackEn: ["Vue", "TypeScript", "Vite"],
    highlights: ["响应式原理", "依赖收集", "渲染更新", "组件机制"],
    highlightsEn: ["Reactivity", "Dependency Tracking", "Rendering Updates", "Components"],
    category: "研究",
  },
  */
  {
    id: 12,
    name: "AI 向导 · 复杂交互",
    nameEn: "AI Guide · Rich Interactions",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/github.svg`,
        url: "https://github.com/neo-jack/page3d",
        title: "GitHub",
      },
    ],
    localUrl: "https://www.lanbinquan.top/3D/",
    prodUrl: "https://www.lanbinquan.top/3D/",
    subPages: [
      { path: "/3D/monitor/", name: "前端监控", nameEn: "Frontend Monitor", localUrl: "https://www.lanbinquan.top/3D/monitor/", prodUrl: "/3D/monitor/" },
    ],
    color: "#8b5cf6",
    description: "融合 AI 向导与复杂交互的 3D 体验，通过对话触发砸窗互动，结合纸艺入口、开门转场与空中飞行探索三维场景",
    descriptionEn: "A 3D experience with an AI guide, conversation-driven glass breaking, a paper-art entrance, door transitions, and flight through the clouds",
    techStack: ["React", "TypeScript", "Three.js"],
    techStackEn: ["React", "TypeScript", "Three.js"],
    highlights: ["AI 对话", "场景联动", "飞行交互"],
    highlightsEn: ["AI Chat", "Scene Interaction", "Flight Controls"],
    category: "AI",
  },
];

// 获取导航链接
export const getNavUrl = (item: Pick<NavItem, "localUrl" | "prodUrl">): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
