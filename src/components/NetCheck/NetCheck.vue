<template>
  <Transition name="toast-fade">
    <div v-if="toastMessage" class="net-toast">{{ toastMessage }}</div>
  </Transition>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useNetworkCheck } from "../../api/useNetworkCheck";

interface LinkItem {
  url: string;
  requireOuterNet?: boolean;
}

const { canAccessOuterNet } = useNetworkCheck();
const toastMessage = ref("");
let toastTimer = 0;

const showToast = (msg: string) => {
  toastMessage.value = msg;
  clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toastMessage.value = "";
  }, 3000);
};

const checkAndOpen = (link: LinkItem) => {
  if (link.requireOuterNet) {
    if (canAccessOuterNet.value === null) {
      showToast("网络检测中，请稍后重试");
      return;
    }
    if (canAccessOuterNet.value === false) {
      showToast("当前网络无法访问外网链接，需要VPN支持");
      return;
    }
  }
  window.open(link.url, "_blank");
};

defineExpose({ checkAndOpen });
</script>

<style lang="scss" scoped>
.net-toast {
  position: fixed;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
  padding: 0.6rem 1.25rem;
  background: var(--card-bg-solid);
  border: 1px solid var(--border-light);
  border-radius: 10px;
  color: var(--text-light);
  font-size: 0.85rem;
  backdrop-filter: blur(var(--glass-blur));
  z-index: 999;
  white-space: nowrap;
  pointer-events: none;
}

.toast-fade-enter-active,
.toast-fade-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}

.toast-fade-enter-from,
.toast-fade-leave-to {
  opacity: 0;
  transform: translateX(-50%) translateY(8px);
}
</style>
