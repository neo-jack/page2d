<template>
  <div class="profile-card glass-card">
    <!-- 头像 -->
    <div class="avatar-wrapper">
      <img :src="profile.avatar" :alt="profile.name" class="avatar" />
    </div>

    <!-- 信息内容 -->
    <div class="info-content">
      <!-- 名称 -->
      <h1 class="name">{{ profile.name }}</h1>

      <!-- 描述 -->
      <p class="description">{{ t.profile.description }}</p>

      <!-- 社交链接 -->
      <div class="social-links">
        <span
          v-for="link in profile.socialLinks"
          :key="link.url"
          class="social-link"
          :title="link.title"
          @click="handleLinkClick(link)"
        >
          <img
            v-if="isImageIcon(link.icon)"
            :src="link.icon"
            :alt="link.title"
            class="custom-icon"
          />
          <component
            v-else
            :is="getIcon(link.icon)"
            theme="filled"
            size="24"
            :fill="link.color || iconColor"
          />
        </span>
        <span class="author-name">@蓝斌铨</span>
      </div>
    </div>
  </div>
  <NetCheck ref="netCheckRef" />
</template>

<script setup lang="ts">
import * as IconPark from "@icon-park/vue-next";
import { useLocaleStore } from "../../store/locale";
import { useThemeStore } from "../../store/theme";
import { zh, en } from "../../i18n";
import { computed, ref, type Component } from "vue";
import { profile } from "../../config/profiles";
import NetCheck from "../NetCheck/NetCheck.vue";

const localeStore = useLocaleStore();
const themeStore = useThemeStore();
const t = computed(() => (localeStore.locale === "zh" ? zh : en));
const iconColor = computed(() =>
  themeStore.darkMode ? "#fff" : "rgba(0, 0, 0, 0.8)"
);

// 判断是否为自定义图片路径
const isImageIcon = (icon: string): boolean => icon.charAt(0) === "/";

// 根据图标名称获取 icon-park 组件
const getIcon = (name: string): Component | undefined => {
  return (IconPark as Record<string, Component>)[name];
};
// 网络检测
const netCheckRef = ref<InstanceType<typeof NetCheck> | null>(null);

const handleLinkClick = (link: { url: string; requireOuterNet?: boolean }) => {
  netCheckRef.value?.checkAndOpen(link);
};
</script>

<style lang="scss" scoped>
.profile-card {
  padding: 2rem;
  text-align: center;
  color: var(--text-light);
  animation: fade-in 0.6s ease forwards;
  min-height: auto;
  height: auto;
}

.avatar-wrapper {
  margin-bottom: 1.5rem;
}

.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 3px solid var(--border-light);
  transition: transform 0.3s;

}

.name {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: var(--text-light);
}

.description {
  font-size: 1rem;
  color: var(--text-muted);
  margin-bottom: 1.5rem;
  line-height: 1.6;
}

.social-links {
  display: flex;
  justify-content: center;
  gap: 0.2rem;
  position: relative; /* 为绝对定位的子元素提供参考 */
  align-items: center;
}

.author-name {
  position: absolute;
  right: 0;
  font-size: 0.75rem;
  color: var(--text-muted);
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.3s;
  line-height: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.2)
  }
}

.custom-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
}

// 响应式适配 - 移动端左右布局
@media (max-width: 768px) {
  .profile-card {
    padding: 1rem;
    display: flex;
    align-items: center;
    text-align: left;
    gap: 1rem;
    min-height: auto;
    position: relative;
  }

  .avatar-wrapper {
    margin-bottom: 0;
    flex-shrink: 0;
  }

  .avatar {
    width: 70px;
    height: 70px;
    border-width: 2px;
  }

  .info-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .name {
    font-size: 1.3rem;
    margin-bottom: 0;
  }

  .description {
    font-size: 0.85rem;
    margin-bottom: 0;
    padding: 0;
    line-height: 1.4;
  }

  .social-links {
    gap: 0.2rem;
    justify-content: flex-start;
  }

  .social-link {
    width: 36px;
    height: 36px;
  }

  .author-name {
    font-size: 0.65rem;
    position: absolute;
    bottom: 0;
    right: 0;
  }
}

@media (max-width: 480px) {
  .profile-card {
    padding: 0.8rem;
    gap: 0.8rem;
  }

  .avatar {
    width: 60px;
    height: 60px;
  }

  .info-content {
    gap: 0.4rem;
  }

  .name {
    font-size: 1.2rem;
  }

  .description {
    font-size: 0.8rem;
    line-height: 1.3;
  }

  .social-link {
    width: 32px;
    height: 32px;
  }

  .author-name {
    font-size: 0.6rem;
  }
}
</style>
