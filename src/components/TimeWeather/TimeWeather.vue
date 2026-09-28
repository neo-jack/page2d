<template>
  <div class="time-weather glass-card">
    <!-- 时间 -->
    <div class="time-section">
      <div class="time">{{ currentTime }}</div>
      <div class="date">{{ currentDate }}</div>
    </div>

    <!-- 站点检测 -->
    <div class="status-section">
      <SiteStatus />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import SiteStatus from "../SiteStatus/SiteStatus.vue";
import { useLocaleStore } from "../../store/locale";

const localeStore = useLocaleStore();

// 时间显示
const currentTime = ref("");
const currentDate = ref("");

const updateTime = () => {
  const now = new Date();
  const locale = localeStore.locale === "zh" ? "zh-CN" : "en-US";
  currentTime.value = now.toLocaleTimeString(locale, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
  currentDate.value = now.toLocaleDateString(locale, {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
};

let timer: number;

onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped>
.time-weather {
  width: 100%;
  box-sizing: border-box;
  padding: 1rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--text-light);
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.1s;
  opacity: 0;
}

.time-section {
  .time {
    font-size: 1.5rem;
    font-weight: 600;
    font-variant-numeric: tabular-nums;
  }

  .date {
    font-size: 0.85rem;
    color: var(--text-muted);
    margin-top: 0.25rem;
  }
}

.status-section {
  display: flex;
  align-items: flex-start;
}
</style>
