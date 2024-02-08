<template>
  <custom-page 
    :hasTabbar="true" 
    title="demo"
    :refresherEnabled="true"
    :fixedNavBar="true"
    :fixedNavBarObj="{
      data: list,
      activeBg: '#31C6B2',
      activeText: '#FFFFFF'
    }"
  >
    <template v-slot:content>
      <view class="w-full flex flex-col">
        <swiper class="w-full h-[556rpx]"
          :autoplay="true" 
          :circular="true">
          <template v-for="(item, index) in list" :key="index">
            <swiper-item class="w-full h-full">
              <custom-image className="w-full h-full" :src="item"></custom-image>
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
import { ResultModel } from '@/model/result';

const { initTabbar } = useTabbar();
const list = ref<string[]>(['/static/2022/06/13/8677e8e3-162e-4cc1-908e-002b39956eb0.png']);

onShow(() => {
  initTabbar(0);
  (api.banner.selectShowList() as Promise<result>).then((res:result) => {
    const result = new ResultModel(res);
    console.log(result)
  });
  api.banner.selectShowList({
    success: (res:result) => {
      const result = new ResultModel(res);
      console.log(result)
    }
  });
});

</script>
