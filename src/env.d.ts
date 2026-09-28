/// <reference types="vite/client" />

declare module '*.vue' {
  const component: any
  export default component
}

interface ImportMetaEnv {
  readonly VITE_SITE_NAME: string;
  readonly VITE_SITE_DESCRIPTION: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
