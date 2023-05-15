<template>

  <view 
    v-show="tabbarShow" 
    :class="`
      relative w-full h-[100rpx] shadow-0081-#E0EAE9-05 bg-white box-content 
      flex justify-around items-center z-10
    `" 
    :style="{ paddingBottom: `env(safe-area-inset-bottom)` }"
  >

    <template v-for="(item, index) in tabbarList" :key="index">

      <template v-if="item.position === 'center'">
        <image 
          :lazy-load="true"
          class="w-[93rpx] h-[72rpx]" 
          :src="item.icon"  
          @click="tabbarChange(item.index, item.path)"
        ></image>
      </template>

      <template v-else>
        <view 
          class="h-[100rpx] flex flex-col justify-center items-center" 
          @click="tabbarChange(item.index, item.path)"
          v-if="!item.hidden"
        >

          <image 
            v-show="tabbarIndex == item.index || item.keep" 
            :lazy-load="true"
            class="w-[59rpx] h-[59rpx] will-change-transform" 
            :src="item.selectIcon"
          ></image>

          <image 
            v-show="tabbarIndex != item.index && !item.keep" 
            :lazy-load="true"
            class="w-[59rpx] h-[59rpx] will-change-transform" 
            :src="item.icon"
          ></image>

          <view 
            :class="`
              text-[20rpx] leading-[36rpx] font-bold 
              ${tabbarIndex == item.index || item.keep ? 'text-tabbar-selected' : 'text-tabbar-default'}
            `"
          >
            <text>{{item.text}}</text>
          </view>

        </view>
      </template>

    </template>

  </view>
</template>

<script setup lang="ts">
import { constructFunc } from '@/components/tabbar/hooks/methods';

const { tabbarList, tabbarShow, tabbarIndex, tabbarChange } = constructFunc();

</script>