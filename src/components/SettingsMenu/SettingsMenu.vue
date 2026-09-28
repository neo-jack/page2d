<template>
  <div ref="rootRef" class="settings">
    <button
      class="settings-btn"
      type="button"
      title="菜单/设置"
      @click.stop="toggle"
    >
      <span class="hamburger-icon">
        <span></span>
        <span></span>
        <span></span>
      </span>
    </button>

    <div v-if="open" class="menu glass-card" @click.stop>
      <span
        v-for="item in menuItems"
        :key="item.href"
        class="menu-item link"
        @click="handleMenuClick(item)"
      >
        {{ getLabel(item) }}
      </span>
    </div>
  </div>
  <NetCheck ref="netCheckRef" />
</template>
<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { menuItems } from "../../config/menu";
import type { MenuItem } from "../../config/menu";
import { useLocaleStore } from "../../store/locale";
import NetCheck from "../NetCheck/NetCheck.vue";

const localeStore = useLocaleStore();

const getLabel = (item: MenuItem) =>
  localeStore.locale === "zh" ? item.label : item.labelEn;
 

const open = ref(false);
const rootRef = ref<HTMLElement | null>(null);
const netCheckRef = ref<InstanceType<typeof NetCheck> | null>(null);

const handleMenuClick = (item: MenuItem) => {
  netCheckRef.value?.checkAndOpen({ url: item.href, requireOuterNet: item.requireOuterNet });
  close();
};

const toggle = () => {
  open.value = !open.value;
};

const close = () => {
  open.value = false;
};

const handleDocumentClick = (e: MouseEvent) => {
  const el = rootRef.value;
  if (!el) return;
  if (el.contains(e.target as Node)) return;
  close();
};


onMounted(() => {
  document.addEventListener("click", handleDocumentClick);
});

onUnmounted(() => {
  document.removeEventListener("click", handleDocumentClick);
});
</script>

<style lang="scss" scoped>
.settings {
  position: relative;
}

.settings-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--border-light);
  border-radius: 50%;
  background: var(--card-bg-solid);
  color: var(--text-light);
  font-size: 0.8rem;
  cursor: pointer;
  // transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  // &:hover {
  //   opacity: 0.8;
  // }

  &:hover,
  &:focus,
  &:active,
  &:focus-visible {
    outline: none !important;
    opacity: 1 !important;
    transform: none !important;
    border-color: var(--border-light) !important;
    background: var(--card-bg-solid) !important;
    color: var(--text-light) !important;
    box-shadow: none !important;
  }
}

.hamburger-icon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 4px;
  width: 18px;
  height: 18px;

  span {
    display: block;
    width: 16px;
    height: 2px;
    background: var(--text-light);
    border-radius: 1px;
  }
}

.menu {
  position: absolute;
  right: 0;
  top: calc(100% + 10px);
  min-width: 180px;
  padding: 0.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  z-index: 10;
  background: var(--card-bg);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border-radius: 16px;
  border: 1px solid var(--border-light);
}

.menu-item {
  width: 100%;
  text-align: left;
  padding: 0.55rem 0.6rem;
  border-radius: 10px;
  border: 1px solid transparent;
  background: rgba(9, 118, 124, 0.14);
  color: var(--text-light);
  font-size: 0.85rem;
  cursor: pointer;
  // transition: all 0.25s;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);

  // &:hover {
  //   border-color: var(--border-light);
  //   background: rgba(255, 255, 255, 0.1);
  //   transform: translateY(-1px);
  // }

  &:hover,
  &:focus,
  &:active,
  &:focus-visible,
  &:visited {
    outline: none !important;
    border-color: transparent !important;
    background: rgba(9, 118, 124, 0.14) !important;
    color: var(--text-light) !important;
    transform: none !important;
    text-decoration: none !important;
    box-shadow: none !important;
  }

  &.danger {
    color: rgba(255, 100, 100, 0.9);
  }

  &.link {
    text-decoration: none;
    display: block;
  }
}
</style>
