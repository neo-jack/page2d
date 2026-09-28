<template>
  <div class="nav-grid">
    <div
      v-for="item in filteredItems"
      :key="item.id"
      class="nav-card"
      role="link"
      tabindex="0"
      :style="{ '--item-color': item.color }"
      @click="handleClick(item)"
      @keydown.enter.self="handleClick(item)"
    >
      <div class="card-header">
        <div class="left-section">
          <span v-if="item.category === 'SKILL'" class="skill-badge">SKILL</span>
          <div
            v-else
            class="status-dot"
            :class="{
              online: siteStatus[item.id] === true,
              offline: siteStatus[item.id] === false,
            }"
          ></div>
          <span class="project-name">{{ getName(item) }}</span>
        </div>
        <div class="icon-group">
          <a
            v-for="navIcon in item.icons"
            :key="navIcon.url"
            :href="navIcon.url"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-icon-link"
            :title="navIcon.title"
            @click.prevent.stop="handleIconClick(navIcon)"
          >
            <img
              v-if="isImageIcon(navIcon.icon)"
              :src="navIcon.icon"
              :alt="navIcon.title"
              class="custom-icon"
            />
            <component
              v-else
              :is="getIcon(navIcon.icon)"
              theme="filled"
              size="20"
              fill="currentColor"
            />
          </a>
        </div>
      </div>
      <p class="description">{{ getDescription(item) }}</p>
      <div class="tags">
        <span v-for="tech in getTechStack(item)" :key="tech" class="tag tech">{{
          tech
        }}</span>
        <span v-for="hl in getHighlights(item)" :key="hl" class="tag highlight">{{
          hl
        }}</span>
      </div>
      <span v-if="item.category === 'SKILL'" class="card-action">
        {{ t.navActions.viewSkill }} <span aria-hidden="true">↗</span>
      </span>
    </div>
  </div>
  <NetCheck ref="netCheckRef" />
</template>

<script setup lang="ts">
import * as IconPark from "@icon-park/vue-next";
import { navItems, getNavUrl, type NavItem, type NavIcon, type NavCategory } from "../../config/nav";
import { useLocaleStore } from "../../store/locale";
import { checkSite } from "../../api/siteCheck";
import { zh, en } from "../../i18n";
import { ref, computed, onMounted, type Component } from "vue";
import NetCheck from "../NetCheck/NetCheck.vue";

const props = defineProps<{ category: NavCategory }>();

const localeStore = useLocaleStore();
const t = computed(() => (localeStore.locale === "zh" ? zh : en));
const siteStatus = ref<Record<string, boolean>>({});
const netCheckRef = ref<InstanceType<typeof NetCheck> | null>(null);

const handleIconClick = (navIcon: NavIcon) => {
  netCheckRef.value?.checkAndOpen(navIcon);
};

// 按分类过滤导航项
const filteredItems = computed(() =>
  navItems.filter((item) => item.category === props.category)
);

// 获取名称
const getName = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.name : item.nameEn;
};

// 获取描述文字
const getDescription = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.description : item.descriptionEn;
};

// 获取技术栈
const getTechStack = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.techStack : item.techStackEn;
};

// 获取亮点
const getHighlights = (item: NavItem) => {
  return localeStore.locale === "zh" ? item.highlights : item.highlightsEn;
};

// 判断是否为自定义图片路径
const isImageIcon = (icon: string): boolean => icon.charAt(0) === "/";

// 根据图标名称获取 icon-park 组件
const getIcon = (name: string): Component | undefined => {
  return (IconPark as Record<string, Component>)[name];
};

// SKILL 是文档入口，不作为在线服务检测。
const initSiteStatus = async () => {
  await Promise.all(
    navItems.filter((item) => item.category !== "SKILL").map(async (item) => {
      siteStatus.value[item.id] = await checkSite(getNavUrl(item));
    }),
  );
};

// 跳转链接
const handleClick = (item: NavItem) => {
  window.open(getNavUrl(item), "_blank", "noopener,noreferrer");
};

onMounted(() => {
  initSiteStatus();
});
</script>

<style lang="scss" scoped>
.nav-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  animation: fade-in 0.6s ease forwards;
  animation-delay: 0.2s;
  opacity: 0;
  overflow-y: auto;

  // 隐藏滚动条但保留滚动功能
  scrollbar-width: none; // Firefox
  -ms-overflow-style: none; // IE/Edge
  &::-webkit-scrollbar {
    display: none; // Chrome/Safari
  }
}

.nav-card {
  padding: 1rem 1.25rem;
  cursor: pointer;
  color: var(--text-light);
  background: var(--card-bg-solid);
  backdrop-filter: blur(var(--glass-blur));
  border: 1px solid var(--border-light);
  border-radius: 12px;
  transition: all 0.3s;

  &:hover {
    filter: brightness(1.02);
  }

  &:focus-visible {
    outline: 2px solid var(--item-color);
    outline-offset: -2px;
  }

  &:active {
    transform: scale(0.96);
  }
}

.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 0.5rem;
}

.left-section {
  display: flex;
  align-items: center;
  gap: 8px;
  min-width: 0;
}

.skill-badge {
  flex-shrink: 0;
  padding: 3px 5px;
  border: 1px solid currentColor;
  border-radius: 5px;
  color: var(--item-color);
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.card-action {
  display: inline-flex;
  gap: 5px;
  margin-top: 0.65rem;
  font-size: 0.75rem;
  color: var(--text-light);
}

.status-dot {
  width: 8px;
  height: 8px;
  flex-shrink: 0;
  border-radius: 50%;
  background-color: #666;
  transition: all 0.3s ease;

  &.online {
    background-color: #00ff00;
  }

  &.offline {
    background-color: #ff0000;
  }
}

.icon-group {
  display: flex;
  align-items: flex-end;
  gap: 6px;
  flex-shrink: 0;
}

.nav-icon-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  font-size: 20px;
  color: var(--text-light);
  transition: all 0.3s ease;
  cursor: pointer;
  text-decoration: none;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: -2px;
    background:
      //左上角
      linear-gradient(currentColor, currentColor) 0 0 / 5px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) 0 0 / 1.5px 5px no-repeat,
      //右上角
      linear-gradient(currentColor, currentColor) 100% 0 / 5px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) 100% 0 / 1.5px 5px no-repeat,
      //左下角
      linear-gradient(currentColor, currentColor) 0 100% / 5px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) 0 100% / 1.5px 5px no-repeat,
      //右下角
      linear-gradient(currentColor, currentColor) 100% 100% / 5px 1.5px no-repeat,
      linear-gradient(currentColor, currentColor) 100% 100% / 1.5px 5px no-repeat;
    opacity: 0;
    //淡出
    transition: opacity 0.3s ease;
    pointer-events: none;
  }

  &:hover {
    filter: brightness(1);

    &::before {
      opacity: 1;
    }
  }
}

.custom-icon {
  width: 20px;
  height: 20px;
  object-fit: contain;
}

.project-name {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-light);
}
.description {
  font-size: 0.85rem;
  color: var(--text-muted);
  margin-bottom: 0.5rem;
  line-height: 1.4;
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.3rem;
  align-items: center;
}

.tag {
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  font-size: 0.75rem;
  color: var(--text-muted);

  // 圆点样式
  &::before {
    content: "";
    display: inline-block;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--tag-dot-bg);
  }

  &.highlight::before {
    background: #ff9500;
  }
}
</style>
