<template>
  <view :class="['w-full', 'h-full', 'flex', 'flex-col', `bg-${backgroundColor}`]" 
    :style="{ 
      paddingBottom: hasTabbar ? 0 : 'env(safe-area-inset-bottom)',
    }">

    <slot name="navbar">
      <template v-if="hasNavbar">
        <navbar :hasTabbar="hasTabbar" :title="title"></navbar>
      </template>
    </slot>

    <view class="flex-1 h-full overflow-hidden">
      <slot name="content"></slot>
    </view>

    <template v-if="hasTabbar">
      <tabbar></tabbar>
    </template>

  </view>
</template>

<script setup lang="ts">
import navbar from '@/components/navbar/index.vue';
import tabbar from '@/components/tabbar/index.vue';

interface Props {
  hasNavbar?: boolean,
  hasTabbar?: boolean,
  title?: string,
  backgroundColor?: string
}
const props = withDefaults(defineProps<Props>(), {
  hasNavbar: true,
  hasTabbar: false,
  title: '',
  backgroundColor: 'white'
});

</script>