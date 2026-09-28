// 环境判断
const isDev = import.meta.env.DEV;
const skillsSourceUrl = "https://github.com/neo-jack/all-project/tree/master/.codex/skills";
const skillUrl = (name: string) => `${skillsSourceUrl}/${name}`;

// 导航分类
export type NavCategory = "AI工具箱" | "源码" | "SKILL" | "其他";

export const NAV_CATEGORIES: NavCategory[] = ["AI工具箱", "源码", "SKILL", "其他"];

// 导航图标配置
export interface NavIcon {
  // icon-park 图标名称或自定义图片路径（以 / 开头）
  icon: string;
  url: string;
  title: string;
  requireOuterNet?: boolean;
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
        requireOuterNet: true,
      },
      {
        icon: `${import.meta.env.BASE_URL}icon/figma.svg`,
        url: "https://www.figma.com/design/66yZgdnDIB3orW1hM58aku/102%E6%BA%90%E7%A0%81?node-id=0-1&p=f",
        title: "Figma",
        requireOuterNet: true,
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
    category: "源码",
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
        requireOuterNet: true,
      },
    ],
    localUrl: "http://127.0.0.1:5177/",
    prodUrl: "/AItool/",
    color: "#22c55e",
    description: "选择网页元素，提取截图、样式与组件上下文，定位源码并交给 Codex",
    descriptionEn: "Select web elements, capture screenshots, styles and component context, locate source code, and hand it to Codex",
    techStack: ["JavaScript", "Bookmarklet"],
    techStackEn: ["JavaScript", "Bookmarklet"],
    highlights: ["元素选择", "源码定位", "AI 上下文"],
    highlightsEn: ["Element Selection", "Source Lookup", "AI Context"],
    category: "AI工具箱",
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
        requireOuterNet: true,
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
    category: "SKILL",
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
        requireOuterNet: true,
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
    category: "源码",
  },
  */
  {
    id: 7,
    name: "资料-前端手撕",
    nameEn: "Frontend Notes",
    icons: [
      {
        icon: `${import.meta.env.BASE_URL}icon/csdn.svg`,
        url: "https://blog.csdn.net/2604_94869367/article/details/159763228",
        title: "CSDN",
        requireOuterNet: true,
      },
    ],
    localUrl: "https://blog.csdn.net/2604_94869367/article/details/159763228",
    prodUrl: "https://blog.csdn.net/2604_94869367/article/details/159763228",
    color: "#ff6a00",
    description: "前端手撕资料整理",
    descriptionEn: "Frontend problem-solving notes",
    techStack: ["JavaScript", "TypeScript", "Frontend"],
    techStackEn: ["JavaScript", "TypeScript", "Frontend"],
    highlights: ["资料整理", "前端手撕", "CSDN文章"],
    highlightsEn: ["Study Notes", "Frontend Practice", "CSDN Article"],
    category: "其他",
  },
];

// 获取导航链接
export const getNavUrl = (item: NavItem): string => {
  return isDev ? item.localUrl : item.prodUrl;
};
