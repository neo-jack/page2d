<script setup lang="ts">
import image0 from './images/actual-design.png';
import image1 from './images/actual-before.png';
import image2 from './images/actual-after.png';
import image3 from './images/actual-heatmap.png';
import image4 from './images/actual-overlay.png';
const homeUrl = import.meta.env.BASE_URL;
</script>

<template>
  <main class="article-page" lang="zh-CN">
    <article>
      <nav aria-label="页面导航"><a :href="homeUrl">← 返回导航</a><span>SKILL / desginer</span></nav>
      <header><p class="eyebrow">设计与前端工程</p><h1>设计稿像素还原 AI 工作流</h1><p class="lead">从设计稿到运行页面，围绕真实差异反复修改与验证。</p></header>
      <p>这是一套辅助前端还原设计稿的 AI 工作流。针对页面开发中反复调整间距、字号、颜色的工作，通过截图对比、差异分析和定量测量，让 AI 定位问题、修改代码，再检查修改后的效果。</p>
      <p>核心思路是 <strong>loop engine + 图像 diff</strong>：通过图像对比找到问题，再循环修改、验证。图像 diff 主要分成三部分：热力图让 AI 看到颜色差异，叠图让 AI 看到位置和形状的偏差，差异列表则把这些问题拆成可以逐个处理的小区域。下面是实际运行的效果。</p>
      <h2>设计稿</h2>
      <figure><a :href="image0" target="_blank" rel="noopener noreferrer" aria-label="查看原图：设计稿：创建评价表模板页面"><img :src="image0" alt="设计稿：创建评价表模板页面" loading="lazy" decoding="async" /></a><figcaption>设计稿：创建评价表模板页面</figcaption></figure>
      <h2>修改前的运行页面</h2>
      <figure><a :href="image1" target="_blank" rel="noopener noreferrer" aria-label="查看原图：修改前：页面框架已经搭好，布局、控件和内容状态仍与设计稿有较大差异"><img :src="image1" alt="修改前：页面框架已经搭好，布局、控件和内容状态仍与设计稿有较大差异" loading="lazy" decoding="async" /></a><figcaption>修改前：页面框架已经搭好，布局、控件和内容状态仍与设计稿有较大差异</figcaption></figure>
      <h2>经过工作流调整后的运行页面</h2>
      <figure><a :href="image2" target="_blank" rel="noopener noreferrer" aria-label="查看原图：工作流调整后：表单、步骤栏和右侧规则区域逐步接近设计稿"><img :src="image2" alt="工作流调整后：表单、步骤栏和右侧规则区域逐步接近设计稿" loading="lazy" decoding="async" /></a><figcaption>工作流调整后：表单、步骤栏和右侧规则区域逐步接近设计稿</figcaption></figure>
      <h2>最后一轮的热力图</h2>
      <figure><a :href="image3" target="_blank" rel="noopener noreferrer" aria-label="查看原图：第八轮热力图：文字、控件和区域边缘的像素差异被标红"><img :src="image3" alt="第八轮热力图：文字、控件和区域边缘的像素差异被标红" loading="lazy" decoding="async" /></a><figcaption>第八轮热力图：文字、控件和区域边缘的像素差异被标红</figcaption></figure>
      <p>这里仍然能看到不少差异。一方面，页面用了大量组件库组件，它们有自己的默认样式；另一方面，设计稿本身也不完全规范。所以子 agent 在处理差异列表时，还要判断：这些差异到底需不需要改，而不是看到标红就全部消掉。</p>
      <p>比如，布局本来应该左右各占一半，如果只追求消除图像差异，可能会被改成左边 47.8%、右边 52.2%，只是为了迁就设计稿里不规范的比例。组件也是一样，如果为了对齐设计稿，强行修改 Ant Design 5 这类组件库的内部样式，改到最后，可能就从页面还原变成了组件重构。</p>
      <p>差异任务分成几种状态，用来区分哪些能直接改、哪些要先测量、哪些需要人工确认：</p>
      <ul><li><code>actionable</code>：问题明确，可以直接修改。</li><li><code>measure-before-next-layout-change</code>：需要先测量，或者等父级布局修复后再检查。</li><li><code>depends-on-xxx</code>：依赖某个组件或上游问题，先解决依赖再处理。</li><li><code>confirm-with-user-last</code>：设计稿不规范、没有更新，或者与公共组件的默认样式冲突，不能擅自修改，留到最后统一确认。</li><li><code>complete</code>：已经完成；即使仍有视觉差异，只要确认符合项目规范，也可以不再修改。</li></ul>
      <h2>最后一轮的叠图</h2>
      <figure><a :href="image4" target="_blank" rel="noopener noreferrer" aria-label="查看原图：第八轮叠图：品红色设计内容与运行页面叠加，错开的边缘暴露位置和形状差异"><img :src="image4" alt="第八轮叠图：品红色设计内容与运行页面叠加，错开的边缘暴露位置和形状差异" loading="lazy" decoding="async" /></a><figcaption>第八轮叠图：品红色设计内容与运行页面叠加，错开的边缘暴露位置和形状差异</figcaption></figure>
      <p>整个流程的核心，就是<strong>让 AI 知道问题具体出在哪里</strong>。热力图辅助定位色差，叠图帮助判断位置和形状偏差，再通过差异列表拆分任务，改完继续检查。同时，把截图、对比和测量这些重复操作做成 CLI 命令，减少每一轮临时写脚本、反复塞入中间结果带来的上下文膨胀。</p>
      <p>目前这套基于静态截图的流程无法分析动效，对设计稿的规范程度要求比较高，而且 token 消耗很大。每一轮都要看图、分析、测量、修改，再重新验证，运行成本会随迭代轮次增加。</p>
      <footer><a :href="homeUrl">← 返回导航</a><span>desginer · 设计稿还原</span></footer>
    </article>
  </main>
</template>

<style scoped>
.article-page { height: 100dvh; overflow-y: auto; background: #f6f5f0; color: #343c34; padding: 32px 24px 72px; line-height: 1.9; overflow-wrap: anywhere; }
article { max-width: 960px; margin: 0 auto; }
nav, footer { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 16px; font-size: 14px; color: #62715e; }
a:hover { color: #273e2c; text-decoration: underline; }
a:focus-visible { outline: 2px solid #536c4f; outline-offset: 5px; }
header { padding: 56px 0 36px; border-bottom: 1px solid #cdd2c7; margin-bottom: 32px; }
.eyebrow { font-size: 13px; letter-spacing: 0.16em; color: #6c7e64; }
h1 { font-size: clamp(28px, 5vw, 46px); line-height: 1.3; margin: 12px 0 20px; letter-spacing: -0.03em; }
.lead { color: #63705d; font-size: 18px; }
p, ul { margin: 20px 0; font-size: 16px; }
h2 { font-size: 23px; margin: 40px 0 16px; }
ul { padding-left: 24px; }
li { margin: 10px 0; }
code { font-size: 0.88em; background: #e6eadd; padding: 2px 5px; border-radius: 4px; }
figure { margin: 20px 0 36px; }
figure a { display: block; }
img { display: block; width: 100%; height: auto; border: 1px solid #d7dbd1; border-radius: 10px; background: white; }
figcaption { margin-top: 10px; color: #727c6c; font-size: 13px; }
footer { margin-top: 48px; padding-top: 24px; border-top: 1px solid #cdd2c7; }
@media (max-width: 600px) { .article-page { padding: 20px 18px 48px; } header { padding-top: 36px; } p, ul { font-size: 15px; } }
</style>
