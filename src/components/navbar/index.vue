<template>
  <view class="w-full bg-theme flex items-center justify-center relative" 
    :style="{
      height: `${navbarHeight() + (statusBarHeight??0)}px`,
      paddingTop: `${(statusBarHeight??0)}px`
    }">

    <template v-if="!hasTabbar">
      <view class="left-0 flex items-center justify-center absolute"
        :style="{
          width: `${navbarHeight()}px`,
          height: `${navbarHeight()}px`,
          top: `${statusBarHeight}px`
        }" @click="back">

        <template v-if="pagesLength != 1">
          <view class="text-white text-[36rpx] iconfont icon-fanhui1"></view>
        </template>

        <template v-else>
          <view class="text-white text-[36rpx] iconfont icon-home"></view>
        </template>

      </view>
    </template>

    <view class="text-[36rpx] text-white font-extrabold tracking-[3rpx]">{{title}}</view>

  </view>
</template>

<script setup lang="ts">
import { constructFunc } from '@/components/navbar/hooks/methods';

interface Props {
  hasTabbar?: boolean,
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  hasTabbar: false,
  title: ''
});

const { statusBarHeight, pagesLength, navbarHeight, back } = constructFunc();

</script>