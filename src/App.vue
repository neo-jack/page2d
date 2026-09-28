<script setup lang="ts">
import { ref, onMounted, watch, computed, nextTick } from "vue";
import BackgroundLayer from "./components/BackgroundLayer/BackgroundLayer.vue";
import ProfileCard from "./components/ProfileCard/ProfileCard.vue";
import NavGrid from "./components/NavGrid/NavGrid.vue";
import SettingsMenu from "./components/SettingsMenu/SettingsMenu.vue";
import { useLocaleStore } from "./store/locale";
import { useThemeStore } from "./store/theme";
import { zh, en } from "./i18n";
import { NAV_CATEGORIES, type NavCategory } from "./config/nav";
import { new3DPageUrl } from "./config/menu";

const localeStore = useLocaleStore();
const themeStore = useThemeStore();

// 国际化文案
const t = computed(() => (localeStore.locale === "zh" ? zh : en));
const isLoaded = ref(false);
const activeCategory = ref<NavCategory>(NAV_CATEGORIES[0]!);

const tabsRef = ref<HTMLElement | null>(null);
const sliderStyle = ref({ left: "3px", width: "0px" });

const updateSlider = async () => {
  await nextTick();
  if (!tabsRef.value) return;
  const activeBtn = tabsRef.value.querySelector<HTMLElement>(".tab-btn.active");
  if (!activeBtn) return;
  sliderStyle.value = {
    left: `${activeBtn.offsetLeft}px`,
    width: `${activeBtn.offsetWidth}px`,
  };
};

watch(activeCategory, updateSlider);
watch(isLoaded, (val) => {
  if (val) updateSlider();
});
//渲染启动 卸载清除
const ro = new ResizeObserver(() => updateSlider());
watch(tabsRef, (el, _, onCleanup) => {
  if (el) ro.observe(el);
  onCleanup(() => ro.disconnect());
});

// 监听主题色变化
watch(
  () => themeStore.themeColor,
  (color) => {
    document.documentElement.style.setProperty("--primary-color", color);
  },
  { immediate: true },
);

onMounted(() => {
  // 初始化语言设置
  localeStore.init();
  // 初始化主题设置
  themeStore.init();

  // 页面加载完成后显示内容
  setTimeout(() => {
    isLoaded.value = true;
  }, 300);
});
</script>

<template>
  <div
    class="app-container"
    :class="{
      'dark-mode': themeStore.darkMode,
      'light-mode': !themeStore.darkMode,
    }"
  >
    <!-- 背景层 -->
    <BackgroundLayer />

    <!-- 主内容区 -->
    <Transition name="fade">
      <main v-if="isLoaded" class="main-content">
        <div class="main-actions">
          <a class="new-3d-link" :href="new3DPageUrl">
            {{ t.mainActions.new3DPage }}
          </a>
          <!-- 语言切换按钮 -->
          <button
            class="locale-toggle-btn"
            type="button"
            title="切换语言"
            @click="localeStore.toggleLocale"
          >
            {{ t.locale.switch }}
          </button>
          <!-- 主题切换按钮 -->
          <button
            class="theme-toggle-btn"
            type="button"
            :title="themeStore.darkMode ? t.theme.toLight : t.theme.toDark"
            @click="themeStore.toggleDarkMode"
          >
            <span v-if="themeStore.darkMode" class="icon">&#9728;</span>
            <span v-else class="icon">&#9790;</span>
          </button>
          <SettingsMenu />
        </div>
        <div class="content-wrapper">
          <!-- 左侧：个人信息卡片 -->
          <section class="left-section">
            <ProfileCard />
          </section>

          <!-- 右侧：功能区 -->
          <section class="right-section">
            <!-- 功能区顶部 -->
            <div class="top-bar">
              <div class="nav-tabs" ref="tabsRef">
                <span class="tab-slider" :style="sliderStyle"></span>
                <button
                  v-for="cat in NAV_CATEGORIES"
                  :key="cat"
                  class="tab-btn"
                  :class="{ active: activeCategory === cat }"
                  @click="activeCategory = cat"
                >
                  {{ t.navCategory[cat] }}
                </button>
              </div>
            </div>
            <!-- 导航网格 -->
            <NavGrid :category="activeCategory" />
          </section>
        </div>
      </main>
    </Transition>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.main-content {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  z-index: 1;
}

.main-actions {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 5;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.locale-toggle-btn,
.new-3d-link {
  height: 42px;
  padding: 0 1rem;
  border: 1px solid var(--border-light);
  border-radius: 21px;
  background: var(--btn-main-actions-bg);
  color: var(--text-light);
  font-size: 0.85rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }
}

.new-3d-link {
  text-decoration: none;
  white-space: nowrap;
}

.theme-toggle-btn {
  width: 42px;
  height: 42px;
  padding: 0;
  border: 1px solid var(--border-light);
  border-radius: 50%;
  background: var(--btn-main-actions-bg);
  color: var(--text-light);
  font-size: 1.2rem;
  cursor: pointer;
  transition: all 0.3s;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  &:hover {
    opacity: 0.8;
  }

  .icon {
    line-height: 0;
  }
}

.content-wrapper {
  flex: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  gap: 1rem;
  max-width: 1200px;
  margin: auto;
  width: 100%;
  overflow: hidden; /* 防止溢出 */
}

.left-section {
  flex: 0 0 auto;
  width: 380px;
  max-height: 340px;
}

.right-section {
  flex: 0 0 auto;
  width: 400px;
  display: flex;
  flex-direction: column;
  gap: 0;
  max-height: 340px;
}

.top-bar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin-top: 0.5rem;
  margin-bottom: 0.4rem;
}

.nav-title {
  flex-shrink: 0;
  font-size: 1.25rem;
  font-weight: bold;
  font-family: "Arial Black", "Microsoft YaHei", sans-serif;
  background-image: linear-gradient(
    135deg,
    #7a92c7,
    #29629c 25%,
    #138498 50%,
    #6989cf
  );
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% 200%;
  animation: gradientShift 3s ease-in-out infinite;
  letter-spacing: 2px;
}
.nav-tabs {
  display: flex;
  gap: 0.25rem;
  background: var(--card-bg-solid);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  padding: 3px;
  position: relative;
}

.tab-slider {
  position: absolute;
  top: 3px;
  bottom: 3px;
  border-radius: 8px;
  background: var(--primary-color, #4a9eff);
  transition:
    left 0.25s ease,
    width 0.25s ease;
  pointer-events: none;
}

.tab-btn {
  padding: 0.3rem 0.75rem;
  border: none;
  border-radius: 8px;
  background: transparent;
  color: var(--text-muted);
  font-size: 0.8rem;
  cursor: pointer;
  transition: color 0.25s;
  white-space: nowrap;
  position: relative;
  z-index: 1;

  &:hover {
    color: var(--text-light);
  }

  &.active {
    color: #fff;
  }
}
@keyframes gradientShift {
  0%,
  100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

// 响应式适配
@media (max-width: 768px) {
  .content-wrapper {
    flex-direction: column;
    align-items: center;
    gap: 0rem;
    padding: 5rem 1rem 0rem 1rem;
    height: 100vh;
    margin: 0 auto;
  }

  .left-section {
    width: 100%;
  }

  .right-section {
    width: 100%;
    flex: 3 3 auto; /* 占 2 份高度 */
    min-height: 100px;
    /* 移除 max-height: 500px; 让 flex 比例生效 */
    max-height: 2000px;
  }

  .nav-title {
    font-size: 1rem;
    letter-spacing: 1px;
  }

  .top-bar {
    margin-bottom: 0.5rem;
  }

  .tab-btn {
    padding: 0.25rem 0.5rem;
    font-size: 0.75rem;
    -webkit-tap-highlight-color: transparent;


  }
}

// 过渡动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
