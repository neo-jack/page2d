<template>
  <div class="theme-switch">
    <button
      class="auto-btn"
      :class="{ active: themeStore.autoTheme }"
      @click="themeStore.toggleAutoTheme"
      title="自动主题"
    >
      自动
    </button>
    <div v-if="!themeStore.autoTheme" class="color-picker">
      <button
        v-for="theme in themeColors"
        :key="theme.color"
        class="color-btn"
        :style="{ backgroundColor: theme.color }"
        :class="{ active: themeStore.manualTheme === theme.color }"
        :title="theme.name"
        @click="selectColor(theme.color)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useThemeStore } from "../../store/theme";

const themeStore = useThemeStore();

// 预设主题色
const themeColors = [
  { name: "蓝色", color: "#4a9eff" },
  { name: "橙色", color: "#ff9500" },
  { name: "粉色", color: "#ff2d55" },
  { name: "青色", color: "#5ac8fa" },
  { name: "紫色", color: "#af52de" },
];

// 选择颜色
const selectColor = (color: string) => {
  themeStore.setManualTheme(color);
};

// 切换自动主题
// const toggleAutoTheme = () => {
//   themeStore.toggleAutoTheme();
// };
</script>

<style lang="scss" scoped>
.theme-switch {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.auto-btn {
  padding: 0.4rem 0.8rem;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  font-size: 0.8rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }

  &.active {
    background: var(--primary-color, #4a9eff);
    border-color: var(--primary-color, #4a9eff);
  }
}

.color-picker {
  display: flex;
  gap: 0.3rem;
}

.color-btn {
  width: 24px;
  height: 24px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    transform: scale(1.1);
  }

  &.active {
    border-color: #fff;
    box-shadow: 0 0 8px rgba(255, 255, 255, 0.5);
  }
}
</style>
