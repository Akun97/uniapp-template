<template>
  <custom-page :hasTabbar="true" 
    title="校友通"
    :refresherEnabled="true">
    <template v-slot:content>
      <view class="w-full">
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
import { initFunc } from '@/pages/educate/hooks/methods';

initFunc();

</script>