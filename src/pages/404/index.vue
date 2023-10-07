<template>
  <custom-page
    :hasTabbar="false"
    :hasNavbar="false"
    backgroundColor="bg-gray-100"
  >
    <template v-slot:content>
      <no-data height="650rpx" msg="页面未找到" placeholder="bg-404"></no-data>
    </template>
  </custom-page>
</template>