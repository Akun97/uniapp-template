<template>
  <scroll-view 
    id="scroll" 
    class="w-full h-full" 
    :scroll-y="true" 
    :scroll-into-view="scrollIntoView" 
    @scroll="scrollListener"
  >

    <slot></slot>

    <slot name="top"></slot>

    <view 
      id="data" 
      :style="{ marginTop: `${headerTop}rpx` }"
      class="w-full h-full flex flex-col"
    >

      <slot name="header"></slot>
      
      <view 
        class="flex-1 h-full overflow-hidden" 
        :style="{ marginTop: `${listTop}rpx` }"
      >
        <scroll-view class="w-full h-full" :scroll-y="scroll">
          <slot name="list"></slot>
        </scroll-view>
      </view>

    </view>

  </scroll-view>
</template>

<script setup lang="ts">
import { constructFunc } from '@/components/sticky-view/hooks/methods';

interface Props {
  headerTop?: string, // 吸顶头部顶部间距
  listTop?: string //列表顶部间距
}
const props = withDefaults(defineProps<Props>(), {
  headerTop: '0',
  listTop: '0'
});

const { scroll, scrollIntoView, getDataTop, scrollListener } = constructFunc();

onMounted(() => {
  getDataTop();
});

</script>