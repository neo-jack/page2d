import { defineStore } from "pinia";
import { ref } from "vue";

export type Locale = "zh" | "en";

export const useLocaleStore = defineStore("locale", () => {
  const locale = ref<Locale>("zh");

  // 切换语言
  const toggleLocale = () => {
    locale.value = locale.value === "zh" ? "en" : "zh";
    localStorage.setItem("locale", locale.value);
  };

  // 设置语言
  const setLocale = (lang: Locale) => {
    locale.value = lang;
    localStorage.setItem("locale", lang);
  };

  // 初始化
  const init = () => {
    const saved = localStorage.getItem("locale") as Locale;
    if (saved && (saved === "zh" || saved === "en")) {
      locale.value = saved;
    }
  };

  return {
    locale,
    toggleLocale,
    setLocale,
    init,
  };
});
