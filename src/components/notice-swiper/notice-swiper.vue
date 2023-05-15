<template>
  <template v-if="list.length > 0">
    <view class="w-full my-[20rpx] bg-white rounded-[16rpx] px-[24rpx] h-[88rpx] flex items-center">
      <image class="w-[52rpx] h-[44rpx]" src="/static/index/icon_zxdt.png"></image>
      <view class="w-[2rpx] h-[32rpx] mx-[16rpx] bg-gray-200"></view>
      <view class="flex-1 w-full h-full flex items-center overflow-hidden">

        <template v-if="list.length === 1">
          <view class="w-full flex items-center" @click="itemTap(list[0].id)">
            <view class="flex-1 w-full">
              <uni-notice-bar :speed="50"
                background-color="transparent"
                :scrollable="true"
                color="#666666"
                :text="list[0].title">
              </uni-notice-bar>
            </view>
            <view class="iconfont icon-arrow-right text-[32rpx] text-gray-200 ml-[16rpx]"></view>
          </view>
        </template>

        <template v-else>
          <swiper
            class="w-full h-[40rpx]"
            :autoplay="true"
            :interval="3000"
            :vertical="true"
            :circular="true"
          >
            <template v-for="(item, index) in list" :key="index">
              <swiper-item>
                <view class="w-full h-full flex items-center" @click="itemTap(item.id)">
                  <view class="text-gray-100 text-[28rpx] leading-[40rpx] flex-1 w-full overflow-hidden whitespace-nowrap text-ellipsis">{{ item.title }}</view>
                  <view class="iconfont icon-arrow-right text-[32rpx] text-gray-200 ml-[16rpx]"></view>
                </view>
              </swiper-item>
            </template>
          </swiper>
        </template>

      </view>
    </view>
  </template>
</template>

<script lang="ts">
export default {
  options: { styleIsolation: 'shared' }
}
</script>

<script setup lang="ts">

interface Props {
  list: { title: string, id: string | number }[]
}
const props = withDefaults(defineProps<Props>(), {
  list: () => []
});
const emit = defineEmits(['itemTap']);

const itemTap = (id:string| number):void => {
  emit('itemTap', id);
}

</script>

<style scoped lang="scss">
:deep(.uni-noticebar) {
  padding: 0 !important;
  margin-bottom: 0 !important;
}
:deep(.uni-noticebar__content-wrapper--scrollable) {
  height: 40rpx !important;
}
:deep(.uni-noticebar__content-text) {
  font-size: 28rpx !important;
  line-height: 40rpx !important;
  height: 40rpx !important;
}
</style>