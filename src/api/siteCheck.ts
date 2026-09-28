import { getNavUrl, navItems } from "../config/nav";

export interface SiteCheckResult {
  id: number;
  name: string;
  url: string;
  status: "online" | "offline" | "checking";
}

// 检测单个站点
export const checkSite = async (url: string): Promise<boolean> => {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    // 使用 no-cors 模式避免跨域问题
    // 注意：no-cors 模式下无法获取响应内容，只能判断请求是否成功发出
    const response = await fetch(url, {
      method: "HEAD",
      mode: "no-cors",
      signal: controller.signal,
    });

    return response.type === "opaque" || response.ok;
  } catch {
    return false;
  } finally {
    clearTimeout(timeoutId);
  }
};

// 获取需要检测的站点列表
export const getSiteList = (): SiteCheckResult[] => {
  return navItems.filter((item) => item.category !== "SKILL").map((item) => ({
    id: item.id,
    name: item.name,
    url: getNavUrl(item),
    status: "checking" as const,
  }));
};
