<!-- tab滚动列表（附带切换动画，吸顶功能） -->
<template>
  <scroll-view id="scroll" 
    class="w-full h-full"
    :scroll-y="sticky" 
    :scroll-into-view="scrollIntoView" 
    @scroll="scrollListener">

    <slot name="top"></slot>

    <view id="data" class="w-full h-full flex flex-col">

      <slot></slot>

      <view class="w-full"
        :style="{paddingTop: `${tabsPaddingTop}rpx`, paddingBottom: `${tabsPaddingBottom}rpx`}">
        <scroll-view :scroll-x="true" 
          :scroll-left="tabsScrollLeft"
          class="sst-tabs-scroll whitespace-nowrap w-full relative" 
          :style="{ height: tabsScrollHeight ? `${tabsScrollHeight}px` : 'auto' }">
        
          <template v-for="(item, index) in tabs" :key="index">
            <view class="sst-tabs text-center inline-block"
              :style="{ 
                width: tabsItemWidth ? `${tabsItemWidth}px` : 'auto',
                paddingLeft: `${itemSpace}rpx`,
                paddingRight: `${itemSpace}rpx`
              }"
              @click="tabsChange(index)">         
              <view :class="['text-[32rpx]', 'pb-[16rpx]', 
                tabsIndex == index ? 'text-theme' : 'text-gray-100']" 
                :style="{
                  fontWeight: tabsIndex == index ? 'bold' : 500
                }">
                {{item}}
              </view>
            </view>
          </template>
              
          <template v-if="tabsLineOffset">
            <view class="w-[29rpx] h-[5rpx] rounded-[2rpx] bg-theme absolute
              transition-all duration-200 ease-linear" 
              :style="{ left: `${tabsLineOffset}px` }">
            </view>
          </template>
        
        </scroll-view>
      </view>

      <view class="flex-1 h-full overflow-hidden">
        <swiper class="w-full h-full" @change="swiperChange" :current="(tabsIndex as number)">
          <template v-for="(list, i) in data" :key="i">
            <swiper-item>
              <scroll-view class="w-full h-full" :scroll-y="scroll">
                <slot name="list" :list="list"></slot>
              </scroll-view>
            </swiper-item>
          </template>
        </swiper>
      </view>

    </view>

  </scroll-view>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { constructFunc } from '@/components/scrollSwiperTab/hooks/methods';

interface Props {
  sticky?: boolean, // 是否吸顶
  tabsIndex?: number, // tab下标
  tabs?: string[], // tab栏列表
  data?: any[], // 列表数据
  itemSpace?: string, // 每个tab的左右间距
  tabsPaddingTop?: string, // tab栏顶部间距
  tabsPaddingBottom?: string // tab栏底部间距
}
const props = withDefaults(defineProps<Props>(), {
  sticky: false,
  tabsIndex: 0,
  tabs: () => [],
  data: () => [],
  itemSpace: '0',
  tabsPaddingTop: '0',
  tabsPaddingBottom: '0'
});
const emit = defineEmits(['change', 'update:tabsIndex']);

const {
  tabsScrollHeight,
  tabsScrollLeft,
  tabsItemWidth,
  tabsLineOffset,
  scroll,
  scrollIntoView,
  getTabHeight,
  getTabWidth,
  getDataTop,
  scrollListener,
  tabsChange,
  swiperChange
} = constructFunc(emit);

onMounted(() => {
  if (!props.sticky) {
    scroll.value = true;
  }
  getTabHeight();
  getTabWidth();
  getDataTop();
});

</script>