<!--
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-05-19 10:26:48
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 11:15:07
 * @FilePath: \uniapp_template\src\components\navbar\index.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
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
import { useNavbar } from '@/hooks/useNavbar';

interface Props {
  hasTabbar?: boolean,
  title?: string
}
const props = withDefaults(defineProps<Props>(), {
  hasTabbar: false,
  title: ''
});

const { statusBarHeight, pagesLength, navbarHeight, back } = useNavbar();

</script>