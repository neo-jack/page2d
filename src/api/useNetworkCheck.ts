
import { ref } from "vue";
const canAccessOuterNet = ref<boolean | null>(null);
let pollingTimer: number | null = null;

const checkOuterNet = (timeout = 300): Promise<boolean> => {
  const targets = ["https://www.google.com/favicon.ico"];

  const check = (url: string) =>
    new Promise<boolean>((resolve) => {
      const img = new Image();
      const timer = setTimeout(() => {
        img.src = "";
        resolve(false);
      }, timeout);
      img.onload = () => {
        clearTimeout(timer);
        resolve(true);
      };
      img.onerror = () => {
        clearTimeout(timer);
        console.log("[网络检测] 不可达:", url);
        resolve(false);
      };
      img.src = `${url}?_=${Date.now()}`;
      console.log("[网络检测] 请求发出:", url);
    });

  return Promise.all(targets.map(check)).then((results) =>
    results.some(Boolean),
  );
};

const runCheck = () => {
  checkOuterNet().then((result) => {
    canAccessOuterNet.value = result;
  });
};

//封装：每隔 interval ms 重新检测一次
export const useNetworkCheck = (interval = 30000) => {
  if (!pollingTimer) {
    runCheck();
    pollingTimer = window.setInterval(runCheck, interval);
  }
  return { canAccessOuterNet };
};