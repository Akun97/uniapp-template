<template>
  <view 
    :class="`w-full h-full flex flex-col ${backgroundColor}`" 
    :style="{ 
      paddingBottom: hasTabbar ? 0 : safeArea ? 'env(safe-area-inset-bottom)' : 0,
    }"
  >

    <slot name="navbar">
      <template v-if="hasNavbar">
        
        <template v-if="fixedNavBar">
          <transparent-navbar 
            :scrollTop="scrollTop"
            :hasTabbar="hasTabbar"
            :title="title"
            :refresherTriggered="refresherTriggered"
            :refresherReady="refresherReady"
            :data="fixedNavBarObj.data"
            :defaultBg="fixedNavBarObj.defaultBg"
            :activeBg="fixedNavBarObj.activeBg"
            :defaultText="fixedNavBarObj.defaultText"
            :activeText="fixedNavBarObj.activeText"
          ></transparent-navbar>
        </template>

        <template v-else>
          <navbar :hasTabbar="hasTabbar" :title="title"></navbar>
        </template>

      </template>
    </slot>

    <view class="flex-1 h-full overflow-hidden">
      <scroll-view 
        class="w-full h-full" 
        :scroll-y="scroll" 
        refresher-background="transparent"
        :refresher-enabled="refresherEnabled" 
        :refresher-triggered="refresherTriggered" 
        @refresherrefresh="refresh"
        @refresherpulling="refresherReady = true"
        @refresherrestore="refresherReady = false"
        @refresherabort="refresherTriggered = false; refresherReady = false;"
        @scrolltolower="loadmore"
        @scroll="onScroll"
      >
        <slot name="content"></slot>
      </scroll-view>
    </view>

    <template v-if="hasTabbar">
      <tabbar></tabbar>
    </template>

  </view>
</template>

<script setup lang="ts">

interface fixedNavObject {
  data?: any[], // 页面顶部没轮播之类的将不会定位
  defaultBg?: string, // 默认背景色
  activeBg?: string,
  defaultText?: string, // 默认文本色
  activeText?: string
}

interface Props {
  safeArea?: boolean, // 是否适配底部安全区
  hasNavbar?: boolean, // 是否需要顶部导航栏
  hasTabbar?: boolean, // 是否需要底部导航栏
  title?: string, // 导航栏标题
  backgroundColor?: string, // 页面背景色, 颜色根据tailwind类名
  scroll?: boolean, //是否滚动
  refresherEnabled?: boolean, // 是否开启下拉刷新
  fixedNavBar?: boolean, // 顶部导航栏是否定位 随着页面滚动改变样式
  fixedNavBarObj?: fixedNavObject // 开启定位导航栏配置项
}
const props = withDefaults(defineProps<Props>(), {
  safeArea: true,
  hasNavbar: true,
  hasTabbar: false,
  title: '',
  backgroundColor: 'bg-white',
  scroll: true,
  refresherEnabled: false,
  fixedNavBar: false,
  fixedNavBarObj: () => ({
    data: [0],
    defaultBg: '',
    activeBg: '#F7F7F7',
    defaultText: '#FFFFFF',
    activeText: '#000000'
  } as fixedNavObject)
});
const emit = defineEmits(['refresh', 'loadmore']);

const { onScroll, scrollTop } = useScroll();

const refresherTriggered = ref<boolean>(false);
const refresherReady = ref<boolean>(false);

const refresh = ():void => {
  if (!refresherTriggered.value) {
    refresherTriggered.value = true;
    emit('refresh');
    setTimeout(() => {
      refresherTriggered.value = false;
    }, 500);
  } else {
    refresherTriggered.value = false;
  }
}

const loadmore = ():void => {
  emit('loadmore');
}

</script>