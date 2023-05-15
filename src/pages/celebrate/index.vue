<template>
  <custom-page 
    :hasTabbar="true" 
    title="demo"
  >
    <template v-slot:content>
      <view class="w-full">3</view>
    </template>
  </custom-page>
</template>

<script setup lang="ts">
const { initTabbar } = useTabbar();

onShow(() => {
  initTabbar(2);
});

</script>