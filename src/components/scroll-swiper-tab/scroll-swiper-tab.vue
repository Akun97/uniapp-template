<!-- tab滚动列表（附带切换动画，吸顶功能） -->
<template>
  <scroll-view 
    id="scroll" 
    class="w-full h-full"
    :scroll-y="sticky" 
    :scroll-into-view="scrollIntoView" 
    @scroll="scrollListener"
  >

    <slot name="top"></slot>

    <view id="data" class="w-full h-full flex flex-col">

      <slot></slot>

      <slot name="tabs" :tabs="tabs" :change="tabsChange">
        <view 
          class="w-full flex justify-center bg-white shadow-00320-#1677FF-005 z-10"
          :style="{paddingTop: `${tabsPaddingTop}rpx`, paddingBottom: `${tabsPaddingBottom}rpx`}"
        >
          <view 
            class="sst-tabs-scroll whitespace-nowrap w-max relative" 
            :style="{ height: tabsScrollHeight ? `${tabsScrollHeight}px` : 'auto' }"
          >
          
            <template v-for="(item, index) in tabs" :key="index">
              <view 
                class="sst-tabs text-center inline-block"
                :style="{ 
                  width: tabsItemWidth ? `${tabsItemWidth}px` : 'auto',
                  paddingLeft: `${itemSpace}rpx`,
                  paddingRight: `${itemSpace}rpx`
                }"
                @click="tabsChange(index)"
              >         
                <view 
                  :class="`
                    text-[32rpx] pb-[16rpx] 
                    ${tabsIndex == index ? 'text-theme' : 'text-gray-100'}
                  `" 
                  :style="{
                    fontWeight: tabsIndex == index ? 'bold' : 500
                  }"
                >
                  <text>{{item}}</text>
                </view>
              </view>
            </template>
                
            <template v-if="tabsLineOffset">
              <view 
                :class="`
                  w-[29rpx] h-[5rpx] rounded-[2rpx] bg-theme absolute 
                  transition-all duration-200 ease-linear
                `" 
                :style="{ left: `${tabsLineOffset}px` }"
              ></view>
            </template>
          
          </view>
        </view>
      </slot>

      <slot name="middle"></slot>

      <view class="flex-1 h-full overflow-hidden">
        <swiper class="w-full h-full" @change="swiperChange" :current="(tabsIndex as number)">
          <template v-for="(list, i) in data" :key="i">
            <swiper-item>
              <scroll-view 
                class="w-full h-full" 
                :scroll-y="scroll"
                refresher-background="transparent"
                :refresher-enabled="refresherEnabled" 
                :refresher-triggered="refresherTriggered[i]" 
                @refresherrefresh="refresh(i)"
                @scrolltolower="loadmore(i)"
              >
                <slot name="list" :list="list" :index="i"></slot>
              </scroll-view>
            </swiper-item>
          </template>
        </swiper>
      </view>

    </view>

  </scroll-view>
</template>

<script setup lang="ts">
import { constructFunc } from '@/components/scroll-swiper-tab/hooks/methods';

interface Props {
  sticky?: boolean, // 是否吸顶
  tabsIndex?: number, // tab下标
  tabs?: string[], // tab栏列表
  data?: any[], // 列表数据
  itemSpace?: string, // 每个tab的左右间距
  tabsPaddingTop?: string, // tab栏顶部间距
  tabsPaddingBottom?: string // tab栏底部间距
  refresherEnabled?: boolean // 是否开启刷新
}
const props = withDefaults(defineProps<Props>(), {
  sticky: false,
  tabsIndex: 0,
  tabs: () => [],
  data: () => [],
  itemSpace: '0',
  tabsPaddingTop: '0',
  tabsPaddingBottom: '0',
  refresherEnabled: false
});
const emit = defineEmits(['change', 'update:tabsIndex', 'refresh', 'loadmore']);

const {
  tabsScrollHeight,
  tabsItemWidth,
  tabsLineOffset,
  scroll,
  scrollIntoView,
  refresherTriggered,
  getTabHeight,
  getTabWidth,
  getDataTop,
  scrollListener,
  tabsChange,
  swiperChange,
  refresh,
  loadmore
} = constructFunc(props, emit);

onMounted(() => {
  if (!props.sticky) {
    scroll.value = true;
  }
  getTabHeight();
  getTabWidth();
  getDataTop();
});

</script>