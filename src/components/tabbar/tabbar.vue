<template>

  <view v-show="tabbarShow" class="relative w-full h-[100rpx] shadow-0081-#E0EAE9-05 bg-white box-content 
    flex justify-around items-center" 
    :style="{ paddingBottom: `env(safe-area-inset-bottom)` }">

    <template v-for="(item, index) in tabbarList" :key="index">

      <template v-if="item.position === 'center'">
        <image class="w-[93rpx] h-[72rpx]" 
          :src="item.icon"  
          @click="tabbarChange(index, item.path)">
        </image>
      </template>

      <template v-else>
        <view class="h-[100rpx] flex flex-col justify-center items-center" 
          @click="tabbarChange(index, item.path)">

          <image v-show="tabbarIndex == index" 
            class="w-[59rpx] h-[59rpx] will-change-transform" 
            :src="item.selectIcon">
          </image>

          <image v-show="tabbarIndex != index" 
            class="w-[59rpx] h-[59rpx] will-change-transform" 
            :src="item.icon">
          </image>

          <view :class="['text-[20rpx]', 'mt-[3rpx]', 'font-bold', 
            `${tabbarIndex == index ? 'text-tabbar-selected' : 'text-tabbar-default'}`]">{{item.text}}</view>

        </view>
      </template>

    </template>

  </view>
</template>

<script setup lang="ts">
import { constructFunc } from '@/components/tabbar/hooks/methods';

const { tabbarList, tabbarShow, tabbarIndex, tabbarChange } = constructFunc();

</script>