<template>
  <div class="night-background" :style="nightBackgroundStyle">
    <!-- 成对星点层 -->
    <div class="star-pairs-layer">
      <div
        v-for="pair in starPairs"
        :key="'pair-' + pair.id"
        class="star-pair"
        :style="{
          left: pair.x + '%',
          top: pair.y + '%',
          animationDelay: pair.moveDelay + 's',
          animationDuration: pair.moveDuration + 's',
        }"
      >
        <!-- 星点1 -->
        <div
          class="star"
          :style="{
            left: pair.star1.offsetX + 'px',
            top: pair.star1.offsetY + 'px',
            width: pair.star1.size + 'px',
            height: pair.star1.size + 'px',
          }"
        ></div>
        <!-- 星点2 -->
        <div
          class="star"
          :style="{
            left: pair.star2.offsetX + 'px',
            top: pair.star2.offsetY + 'px',
            width: pair.star2.size + 'px',
            height: pair.star2.size + 'px',
          }"
        ></div>
        <!-- 虚线连接 -->
        <svg class="pair-line">
          <line
            :x1="pair.star1.offsetX + pair.star1.size / 2"
            :y1="pair.star1.offsetY + pair.star1.size / 2"
            :x2="pair.star2.offsetX + pair.star2.size / 2"
            :y2="pair.star2.offsetY + pair.star2.size / 2"
            class="connection-line"
          />
        </svg>
      </div>
    </div>

    <!-- 移动云朵 -->
    <div class="clouds-layer">
      <div
        v-for="cloud in clouds"
        :key="'cloud-' + cloud.id"
        class="cloud"
        :style="{
          top: cloud.top + '%',
          width: cloud.size + 'px',
          height: cloud.size * 0.6 + 'px',
          animationDuration: cloud.duration + 's',
          animationDelay: cloud.delay + 's',
          opacity: cloud.opacity,
        }"
      ></div>
    </div>

    <!-- 流星（随机位置） -->
    <template v-for="meteor in meteors" :key="'meteor-' + meteor.id">
      <div
        class="meteor"
        :style="{
          top: meteor.top + '%',
          right: meteor.right + '%',
          animationDuration: meteor.duration + 's',
        }"
      >
        <div class="meteor-head"></div>
        <div class="meteor-tail"></div>
      </div>
    </template>

    <!-- 叶片装饰（左右两侧分布） -->
    <div class="leaves-layer">
      <div
        v-for="leaf in leaves"
        :key="'leaf-' + leaf.id"
        class="leaf"
        :style="{
          [leaf.side]: leaf.offset + 'px',
          top: leaf.top + '%',
          transform: 'rotate(' + leaf.rotate + 'deg) scale(' + leaf.size + ')',
          animationDelay: leaf.delay + 's',
          animationDuration: leaf.duration + 's',
        }"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from "vue";

// 黑夜背景样式
const nightBackgroundStyle = computed(() => ({
  background: "linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%)",
}));

// 星点对数据（成对出现，带虚线连接，整体移动）
interface StarPair {
  id: number;
  x: number;
  y: number;
  star1: { offsetX: number; offsetY: number; size: number };
  star2: { offsetX: number; offsetY: number; size: number };
  moveDelay: number;
  moveDuration: number;
}
const starPairs = ref<StarPair[]>([]);

// 云朵数据
interface Cloud {
  id: number;
  top: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}
const clouds = ref<Cloud[]>([]);

// 叶片数据（左右两边随机分布）
interface Leaf {
  id: number;
  side: "left" | "right";
  top: number;
  offset: number;
  size: number;
  rotate: number;
  delay: number;
  duration: number;
}
const leaves = ref<Leaf[]>([]);

// 流星数据（随机位置）
interface Meteor {
  id: number;
  top: number;
  right: number;
  delay: number;
  duration: number;
}
const meteors = ref<Meteor[]>([]);

// 流星定时器
let meteorTimer: ReturnType<typeof setInterval> | null = null;

// 生成随机流星
const generateMeteor = () => {
  const id = Date.now();
  const newMeteor: Meteor = {
    id,
    top: Math.random() * 40,
    right: Math.random() * 60 + 10,
    delay: 0,
    duration: 1.5 + Math.random() * 1,
  };
  meteors.value.push(newMeteor);

  // 动画结束后移除
  setTimeout(() => {
    meteors.value = meteors.value.filter((m) => m.id !== id);
  }, newMeteor.duration * 1000 + 500);
};

onMounted(() => {
  // 生成成对星点（8-12对）
  const pairCount = 8 + Math.floor(Math.random() * 5);
  const pairList: StarPair[] = [];
  for (let i = 0; i < pairCount; i++) {
    pairList.push({
      id: i,
      x: Math.random() * 90 + 5,
      y: Math.random() * 80 + 10,
      star1: {
        offsetX: 0,
        offsetY: 0,
        size: Math.random() * 2 + 2,
      },
      star2: {
        offsetX: 15 + Math.random() * 25,
        offsetY: -10 + Math.random() * 20,
        size: Math.random() * 2 + 1.5,
      },
      moveDelay: Math.random() * 5,
      moveDuration: 15 + Math.random() * 20,
    });
  }
  starPairs.value = pairList;

  // 生成云朵（增加透明度和尺寸）
  const cloudCount = 5;
  const cloudList: Cloud[] = [];
  for (let i = 0; i < cloudCount; i++) {
    cloudList.push({
      id: i,
      top: 5 + Math.random() * 25,
      size: 150 + Math.random() * 100,
      duration: 60 + Math.random() * 40,
      delay: -Math.random() * 60,
      opacity: 0.15 + Math.random() * 0.1,
    });
  }
  clouds.value = cloudList;

  // 生成叶片（左右两侧分布）
  const leafCount = 4;
  const leafList: Leaf[] = [];
  for (let i = 0; i < leafCount; i++) {
    const side: "left" | "right" = i < leafCount / 2 ? "left" : "right";
    leafList.push({
      id: i,
      side,
      top: 10 + Math.random() * 70,
      offset: Math.random() * 170,
      size: 0.3 + Math.random() * 0.2,
      rotate:
        side === "left" ? -30 + Math.random() * 60 : 120 + Math.random() * 60,
      delay: Math.random() * 2,
      duration: 3 + Math.random() * 4,
    });
  }
  leaves.value = leafList;

  // 初始生成一个流星
  generateMeteor();

  // 随机间隔生成流星
  meteorTimer = setInterval(() => {
    generateMeteor();
  }, 4000 + Math.random() * 4000);
});

onUnmounted(() => {
  if (meteorTimer) {
    clearInterval(meteorTimer);
  }
});
</script>

<style lang="scss" scoped>
.night-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  transition: background 0.5s ease;
  overflow: hidden;
}

// 成对星点层
.star-pairs-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.star-pair {
  position: absolute;
  animation: pair-float 20s ease-in-out infinite;
}

@keyframes pair-float {
  0%,
  100% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(15px, -10px);
  }
  50% {
    transform: translate(25px, 5px);
  }
  75% {
    transform: translate(10px, 15px);
  }
}

.star {
  position: absolute;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.95) 0%,
    rgba(255, 255, 255, 0.5) 40%,
    rgba(255, 255, 255, 0) 70%
  );
  border-radius: 50%;
  animation: twinkle 2.5s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 1;
    transform: scale(1.3);
  }
}

// 星点虚线连接
.pair-line {
  position: absolute;
  left: 0;
  top: 0;
  width: 100px;
  height: 100px;
  overflow: visible;
  pointer-events: none;
}

.connection-line {
  stroke: rgba(255, 255, 255, 0.25);
  stroke-width: 1;
  stroke-dasharray: 3, 4;
  animation: dash-flow 4s linear infinite;
}

@keyframes dash-flow {
  0% {
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dashoffset: -20;
  }
}

// 云朵层
.clouds-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
  overflow: hidden;
}

.cloud {
  position: absolute;
  left: -200px;
  width: 100px !important;
  height: 70px !important;
  background: rgba(200, 210, 230, 1);
  border-radius: 50%;
  box-shadow: 35px 8px 0 5px rgba(190, 200, 220, 1),
    70px 3px 0 -5px rgba(180, 190, 210, 1), -25px 5px 0 0 rgba(210, 220, 240, 1);
  animation: cloud-move linear infinite;
}

@keyframes cloud-move {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(100vw + 400px));
  }
}

// 流星
.meteor {
  position: absolute;
  pointer-events: none;
  animation: meteor-fall ease-out forwards;
}

.meteor-head {
  width: 8px;
  height: 8px;
  background: radial-gradient(
    circle,
    #fff 0%,
    #ff6b9d 40%,
    rgba(255, 107, 157, 0.5) 70%,
    transparent 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 8px 3px rgba(255, 255, 255, 0.8),
    0 0 15px 5px rgba(255, 107, 157, 0.7),
    0 0 30px 10px rgba(255, 107, 157, 0.4);
}

.meteor-tail {
  position: absolute;
  top: 50%;
  right: 100%;
  transform: translateY(-50%) rotate(-35deg);
  transform-origin: right center;
  width: 100px;
  height: 3px;
  background: linear-gradient(
    to left,
    rgba(255, 107, 157, 0.9),
    rgba(255, 182, 193, 0.5),
    rgba(255, 200, 210, 0.2),
    transparent
  );
  border-radius: 3px;
  filter: blur(1px);

  &::after {
    content: "";
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    height: 7px;
    background: linear-gradient(to left, rgba(255, 107, 157, 0.4), transparent);
    filter: blur(4px);
    border-radius: 4px;
  }
}

@keyframes meteor-fall {
  0% {
    opacity: 0;
    transform: translate(0, 0);
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: translate(-250px, 180px);
  }
}

// 叶片装饰层
.leaves-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.leaf {
  position: absolute;
  width: 25px;
  height: 45px;
  background: linear-gradient(
    135deg,
    rgba(76, 175, 80, 0.5) 0%,
    rgba(56, 142, 60, 0.25) 100%
  );
  border-radius: 0 80% 0 80%;
  animation: leaf-sway 4s ease-in-out infinite;
  box-shadow: 0 0 10px rgba(76, 175, 80, 0.2);

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 10%;
    width: 1px;
    height: 80%;
    background: rgba(76, 175, 80, 0.6);
    transform: translateX(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    left: 30%;
    top: 20%;
    width: 40%;
    height: 60%;
    background: linear-gradient(
      135deg,
      rgba(100, 200, 100, 0.2) 0%,
      transparent 100%
    );
    border-radius: 0 80% 0 80%;
  }
}

@keyframes leaf-sway {
  0%,
  100% {
    transform: rotate(var(--leaf-rotate, 0deg)) scale(var(--leaf-scale, 1))
      translateX(0);
  }
  50% {
    transform: rotate(calc(var(--leaf-rotate, 0deg) + 8deg))
      scale(var(--leaf-scale, 1)) translateX(5px);
  }
}
</style>
