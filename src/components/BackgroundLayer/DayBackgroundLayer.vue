<template>
  <div class="day-background" :style="dayBackgroundStyle">
    <!-- 太阳元素 -->
    <div class="sun-layer">
      <div class="sun">
        <div class="sun-core"></div>
      </div>
    </div>

    <!-- 白云层 -->
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

    <!-- 蜂巢结构 -->
    <div class="honeycomb-layer">
      <div class="honeycomb-grid">
        <div
          v-for="row in 7"
          :key="'row-' + row"
          class="honeycomb-row"
          :class="{ offset: row % 2 === 0 }"
        >
          <div
            v-for="col in 7"
            :key="'cell-' + row + '-' + col"
            class="honeycomb-cell"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";

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

onMounted(() => {
  const cloudCount = 8;
  const cloudList: Cloud[] = [];
  for (let i = 0; i < cloudCount; i++) {
    cloudList.push({
      id: i,
      top: 5 + Math.random() * 30,
      size: 120 + Math.random() * 80,
      duration: 50 + Math.random() * 40,
      delay: -Math.random() * 50,
      opacity: 0.6 + Math.random() * 0.3,
    });
  }
  clouds.value = cloudList;
});

// 晴天背景样式
const dayBackgroundStyle = computed(() => ({
  background: "linear-gradient(180deg, #9EC6F3 0%, #BDDDE4 80%, #B8E6C8  100%)",
}));
</script>

<style lang="scss" scoped>
.day-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  transition: background 0.5s ease;
  overflow: hidden;
}

// 太阳层
.sun-layer {
  position: absolute;
  inset: 0;
  pointer-events: none;
}

.sun {
  position: absolute;
  top: 15%;
  right: 20%;
  width: 80px;
  height: 80px;
  animation: sun-glow 4s ease-in-out infinite;
}

.sun-core {
  position: absolute;
  width: 100%;
  height: 100%;
  background: radial-gradient(
    circle,
    #ffd700 0%,
    #ffed4e 30%,
    #ffc107 60%,
    rgba(255, 215, 0, 0.8) 100%
  );
  border-radius: 50%;
  box-shadow: 0 0 10px rgba(255, 215, 0, 0.3), 0 0 20px rgba(255, 215, 0, 0.2);
}

// 白云层
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
  background: rgba(255, 255, 255, 1);
  border-radius: 50%;
  box-shadow: 35px 8px 0 5px rgba(250, 250, 255, 1),
    70px 3px 0 -5px rgba(245, 245, 250, 1), -25px 5px 0 0 rgba(250, 252, 255, 1);
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

// 蜂巢结构
.honeycomb-layer {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0.1;
  pointer-events: none;
}

.honeycomb-grid {
  display: flex;
  flex-direction: column;
  gap: -2px;
}

.honeycomb-row {
  display: flex;
  gap: 2px;

  &.offset {
    margin-left: 15px;
  }
}

.honeycomb-cell {
  width: 30px;
  height: 26px;
  background: rgba(255, 193, 7, 0.3);
  clip-path: polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%);
  border: 1px solid rgba(255, 193, 7, 0.5);
}

@keyframes sun-glow {
  0%,
  100% {
    transform: scale(1);
    filter: brightness(1);
  }
  50% {
    transform: scale(1.05);
    filter: brightness(1.1);
  }
}

@keyframes sun-rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes ray-pulse {
  0%,
  100% {
    opacity: 0.6;
    transform: scaleY(1);
  }
  50% {
    opacity: 1;
    transform: scaleY(1.2);
  }
}
</style>
