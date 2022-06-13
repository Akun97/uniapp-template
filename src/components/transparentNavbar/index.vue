<template>
  <view v-if="!refresherTriggered && !refresherReady"
    class="w-full flex flex-col top-0 left-0 z-10 fixed">
    <view class="w-full flex items-center justify-center transition-all ease-linear duration-300" 
      :style="{
        height: `${navbarHeight() + (statusBarHeight??0)}px`,
        paddingTop: `${(statusBarHeight??0)}px`,
        backgroundColor: banner.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeBg : ''
      }">

      <template v-if="!hasTabbar">
        <view class="left-0 flex items-center justify-center absolute"
          :style="{
            width: `${navbarHeight()}px`,
            height: `${navbarHeight()}px`,
            top: `${statusBarHeight}px`
          }" @click="back">

          <template v-if="pagesLength != 1">
            <view class="text-[34rpx] iconfont icon-fanhui1"
              :style="{
                color: banner.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : '#FFFFFF'
              }">
            </view>
          </template>

          <template v-else>
            <view class="text-[34rpx] iconfont icon-home"
              :style="{
                color: banner.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : '#FFFFFF'
              }">
            </view>
          </template>

        </view>
      </template>

      <view class="text-[34rpx] tracking-[3rpx]"
        :style="{
          color: banner.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : '#FFFFFF'
        }">{{title}}</view>

    </view>
    <view v-if="banner.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0))" class="w-full h-[1rpx] bg-black/[0.1]"></view>
  </view>
</template>

<script setup lang="ts">
import { useNavbar } from '@/hooks/useNavbar';

interface Props {
  hasTabbar?: boolean,
  refresherTriggered?: boolean,
  refresherReady?: boolean,
  banner?: any[]
  scrollTop: number,
  title: string,
  activeBg?: string,
  activeText?: string
}
const props = withDefaults(defineProps<Props>(), {
  hasTabbar: false,
  refresherTriggered: false,
  refresherReady: false,
  banner: () => [0],
  activeBg: '#F7F7F7',
  activeText: '#000000'
});

const { statusBarHeight, pagesLength, navbarHeight, back } = useNavbar();

</script>