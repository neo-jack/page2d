import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useThemeStore = defineStore("theme", () => {
  // 状态
  const darkMode = ref(true);
  const autoTheme = ref(false);
  const manualTheme = ref("#9FB3DF");

  // 计算属性 - 当前主题色
  const themeColor = computed(() => {
    if (autoTheme.value) {
      // 自动主题模式下，根据时间或其他逻辑返回主题色
      return darkMode.value ? "#9FB3DF" : "#9EC6F3";
    }
    return manualTheme.value;
  });

  // 切换暗黑模式
  const toggleDarkMode = () => {
    darkMode.value = !darkMode.value;
    localStorage.setItem("darkMode", darkMode.value.toString());
    updateCSSVariables();
  };

  // 切换自动主题
  const toggleAutoTheme = () => {
    autoTheme.value = !autoTheme.value;
    localStorage.setItem("autoTheme", autoTheme.value.toString());
    updateCSSVariables();
  };

  // 设置手动主题色
  const setManualTheme = (color: string) => {
    manualTheme.value = color;
    localStorage.setItem("manualTheme", color);
    updateCSSVariables();
  };

  // 更新CSS变量
  const updateCSSVariables = () => {
    document.documentElement.style.setProperty("--primary-color", themeColor.value);
  };

  // 初始化
  const init = () => {
    const savedDarkMode = localStorage.getItem("darkMode");
    const savedAutoTheme = localStorage.getItem("autoTheme");
    const savedManualTheme = localStorage.getItem("manualTheme");

    darkMode.value = savedDarkMode !== "false";
    autoTheme.value = savedAutoTheme === "true";
    manualTheme.value = savedManualTheme || "#9FB3DF";

    updateCSSVariables();
  };

  return {
    darkMode,
    autoTheme,
    manualTheme,
    themeColor,
    toggleDarkMode,
    toggleAutoTheme,
    setManualTheme,
    init,
  };
});
