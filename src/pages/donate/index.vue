<template>
  <custom-page 
    :hasTabbar="true" 
    title="demo"
  >
    <template v-slot:content>
      <view class="w-full">4</view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
const { initTabbar } = useTabbar();

onShow(() => {
  initTabbar(3);
});

</script>