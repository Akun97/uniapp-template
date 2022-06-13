/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-05-19 10:26:48
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 11:10:56
 * @FilePath: \uniapp_template\src\main.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { createSSRApp } from "vue";
import App from "./App.vue";
import { store, key } from "./store";
import CustomPage from "@/components/customPage/index.vue";
import ScrollSwiperTab from '@/components/scrollSwiperTab/index.vue';
import StickyView from '@/components/stickyView/index.vue';

export function createApp() {

  const app = createSSRApp(App);

  app.use(store, key);

  app.component('custom-page', CustomPage);
  app.component('scroll-swiper-tab', ScrollSwiperTab);
  app.component('sticky-view', StickyView);

  return {
    app,
  };

}