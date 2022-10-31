<template>
  <view class="w-full flex flex-col items-center">
    <view class="w-[320rpx] h-[300rpx] bg-no-data bg-full bg-no-repeat bg-center mb-[4rpx]"></view>
    <view class="text-gray-200 text-[28rpx]">暂无数据</view>
  </view>
</template>

<script setup lang="ts">

interface Props {
  msg?: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: '暂无数据'
});

</script>