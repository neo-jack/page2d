// 个人信息配置

export interface SocialLink {
  // icon-park 图标名称，如 "Github", "Twitter", "Mail" 等
  icon: string;
  url: string;
  title: string;
  color?: string;
  requireOuterNet?: boolean;
}

export interface ProfileConfig {
  avatar: string;
  name: string;
  socialLinks: SocialLink[];
}

export const profile: ProfileConfig = {
  avatar: `${import.meta.env.BASE_URL}avatar.png`,
  name: "Laaaanbq",
  socialLinks: [
    {
      icon: "Github",
      url: "https://github.com/neo-jack",
      title: "GitHub",
      requireOuterNet: true,
    },
    {
      icon: `${import.meta.env.BASE_URL}icon/leetcode.png`,
      url: "https://leetcode.cn/u/jack-xin/",
      title: "LeetCode",
    },
    {
      icon: `${import.meta.env.BASE_URL}icon/csdn.svg`,
      url: "https://blog.csdn.net/2604_94869367",
      title: "CSDN",
    },
  ],
};
