<template>
  <div class="site-status">
    <div class="status-header">
      <span class="label">{{ t.siteStatus.title }}</span>
      <button class="refresh-btn" @click="refresh" title="刷新">
        <span>↻</span>
      </button>
    </div>
    <div class="status-list">
      <div
        v-for="site in sites"
        :key="site.id"
        class="status-item"
        :title="site.url"
      >
        <span class="dot" :class="site.status"></span>
        <span class="site-name">{{ site.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import {
  checkSite,
  getSiteList,
  type SiteCheckResult,
} from "../../api/siteCheck";
import { useLocaleStore } from "../../store/locale";
import { zh, en } from "../../i18n";
import { computed } from "vue";

const localeStore = useLocaleStore();
const t = computed(() => (localeStore.locale === "zh" ? zh : en));

const sites = ref<SiteCheckResult[]>(getSiteList());
let checkInterval: number | null = null;

// 检测所有站点
const checkAllSites = async () => {
  for (const site of sites.value) {
    site.status = "checking";
    const isOnline = await checkSite(site.url);
    site.status = isOnline ? "online" : "offline";
  }
};

onMounted(() => {
  // 初始检测
  checkAllSites();
  // 每60秒检测一次
  checkInterval = window.setInterval(checkAllSites, 60000);
});

onUnmounted(() => {
  if (checkInterval) {
    clearInterval(checkInterval);
  }
});

// 手动刷新
const refresh = () => {
  checkAllSites();
};
</script>

<style lang="scss" scoped>
.site-status {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.status-header {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.label {
  font-size: 0.85rem;
  color: var(--text-muted);
  font-weight: 500;
}

.refresh-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
  cursor: pointer;
  transition: all 0.3s;
  font-size: 0.9rem;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
}

.status-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.8rem;
  color: var(--text-light);
}

.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  transition: background 0.3s;

  &.online {
    background: #34c759;
    box-shadow: 0 0 6px rgba(52, 199, 89, 0.5);
  }

  &.offline {
    background: #ff3b30;
    box-shadow: 0 0 6px rgba(255, 59, 48, 0.5);
  }

  &.checking {
    background: #8e8e93;
    animation: pulse 1s infinite;
  }
}

.site-name {
  font-size: 0.75rem;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}
</style>
