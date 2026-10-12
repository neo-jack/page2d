import { createApp, defineAsyncComponent, defineComponent, h, onUnmounted, ref } from "vue";
import { createPinia } from "pinia";
import Home from "./App.vue";
import { useThemeStore } from "./store/theme";
import { useLocaleStore } from "./store/locale";
import "./assets/styles/global.scss";

const DesignWorkflow = defineAsyncComponent(() => import("./pages/design-workflow/DesignWorkflow.vue"));
const Root = defineComponent({
  setup() {
    const hash = ref(window.location.hash);
    const onHashChange = () => {
      hash.value = window.location.hash;
      document.documentElement.dataset.page = hash.value === "#/design-workflow" ? "design-workflow" : "home";
    };
    window.addEventListener("hashchange", onHashChange);
    onUnmounted(() => window.removeEventListener("hashchange", onHashChange));
    return () => h(hash.value === "#/design-workflow" ? DesignWorkflow : Home);
  },
});
const app = createApp(Root);
const pinia = createPinia();

app.use(pinia);
// 首次渲染前恢复偏好，避免子组件先渲染默认主题和语言。
try { useThemeStore(pinia).init(); } catch { /* 存储不可用时沿用默认主题。 */ }
try { useLocaleStore(pinia).init(); } catch { /* 存储不可用时沿用默认语言。 */ }
app.mount("#app");
