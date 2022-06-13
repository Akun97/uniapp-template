<template>
  <custom-page :hasTabbar="true" title="校友通">
    <template v-slot:content>
      <view class="w-full">5</view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
import { initFunc } from '@/pages/member/hooks/methods';

initFunc();

</script>