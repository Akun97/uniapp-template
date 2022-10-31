/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'js-cookie';
declare module 'jsencrypt/bin/jsencrypt.min';
declare module 'mp-html/dist/uni-app/components/mp-html/mp-html';