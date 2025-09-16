/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue';

  const component: DefineComponent<
    Record<string, never>,
    Record<string, never>,
    any
  >;
  export default component;
}

// Less 文件类型声明
declare module '*.less' {
  const content: string;
  export default content;
}

// CSS 文件类型声明
declare module '*.css' {
  const content: string;
  export default content;
}
