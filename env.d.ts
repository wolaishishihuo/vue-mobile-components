/// <reference types="vite/client" />

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
