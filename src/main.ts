import { createApp, defineAsyncComponent, defineComponent, h, onUnmounted, ref } from "vue";
import { createPinia } from "pinia";
import "./assets/styles/global.scss";

const Home = defineAsyncComponent(() => import("./App.vue"));
const DesignWorkflow = defineAsyncComponent(() => import("./pages/design-workflow/DesignWorkflow.vue"));
const Root = defineComponent({
  setup() {
    const hash = ref(window.location.hash);
    const onHashChange = () => { hash.value = window.location.hash; };
    window.addEventListener("hashchange", onHashChange);
    onUnmounted(() => window.removeEventListener("hashchange", onHashChange));
    return () => h(hash.value === "#/design-workflow" ? DesignWorkflow : Home);
  },
});
const app = createApp(Root);
const pinia = createPinia();

app.use(pinia);
app.mount("#app");
