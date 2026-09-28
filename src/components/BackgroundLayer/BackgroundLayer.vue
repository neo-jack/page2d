//TODO: 恐龙快跑模块
<template>
  <component
    :is="themeStore.darkMode ? NightBackgroundLayer : DayBackgroundLayer"
  />
</template>

<script setup lang="ts">
import { useThemeStore } from "../../store/theme";
import DayBackgroundLayer from "./DayBackgroundLayer.vue";
import NightBackgroundLayer from "./NightBackgroundLayer.vue";

const themeStore = useThemeStore();
</script>
