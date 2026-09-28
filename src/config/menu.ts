export const new3DPageUrl = "http://www.lanbinquan.top/";

export interface MenuItem {
  label: string;
  labelEn: string;
  href: string;
  requireOuterNet?: boolean;
}

export const menuItems: MenuItem[] = [
  {
    label: "github链接",
    labelEn: "GitHub",
    href: "https://github.com/neo-jack",
    requireOuterNet: true,
  }
];
