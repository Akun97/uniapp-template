<template>
  <view class="flex flex-col items-center justify-center" :style="{ width: width, height: height }">
    <view :class="`w-[320rpx] h-[320rpx] ${placeholder} bg-full bg-no-repeat bg-center`"></view>
    <view class="text-gray-200 text-[28rpx] leading-[44rpx] mt-[10rpx]">{{ msg }}</view>
  </view>
</template>

<script setup lang="ts">

interface Props {
  msg?: string,
  width?: string,
  height?: string,
  placeholder?: string
}
const props = withDefaults(defineProps<Props>(), {
  msg: '暂无数据',
  width: '100%',
  height: '100%',
  placeholder: 'bg-no-data'
});

</script>