<template>
  <custom-page 
    :hasTabbar="true" 
    title="demo"
  >
    <template v-slot:content>
      <view class="w-full">5</view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
const { initTabbar } = useTabbar();

onShow(() => {
  initTabbar(4);
});

</script>