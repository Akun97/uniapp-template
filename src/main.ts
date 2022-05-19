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
