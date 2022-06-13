<template>
  <custom-page :hasTabbar="true" 
    title="校友通"
    :refresherEnabled="true"
    :fixedNavBar="true"
    :fixedNavBarObj="{
      data: list,
      activeBg: '#31C6B2',
      activeText: '#FFFFFF'
    }">
    <template v-slot:content>
      <view class="w-full flex flex-col">
        <swiper class="w-full h-[556rpx]"
          :autoplay="true" 
          :circular="true">
          <template v-for="(item, index) in list" :key="index">
            <swiper-item class="w-full h-full">
              <custom-image className="w-full h-full" :src="`${fileUrl}${item}`"></custom-image>
            </swiper-item>
          </template>
        </swiper>
        <view class="w-full h-[300rpx] bg-red-600"></view>
        <view class="w-full h-[300rpx] bg-yellow-600"></view>
        <view class="w-full h-[300rpx] bg-blue-600"></view>
        <view class="w-full h-[300rpx] bg-green-600"></view>
        <view class="w-full h-[300rpx] bg-pink-600"></view>
        <view class="w-full h-[300rpx] bg-orange-600"></view>
      </view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
import { initFunc } from '@/pages/index/hooks/methods';
import { fileUrl } from '@/hooks/global';

const {list} = initFunc();

</script>
