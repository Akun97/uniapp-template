<template>
  <custom-page :hasTabbar="true" title="校友通">
    <template v-slot:content>
      <view class="flex-1 h-full overflow-hidden">
        <scroll-view class="w-full h-full" :scroll-y="true">
          4
        </scroll-view>
      </view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
import { useTabbar } from '@/hooks/useTabbar';

const { initTabbar } = useTabbar();

initTabbar(3);

</script>