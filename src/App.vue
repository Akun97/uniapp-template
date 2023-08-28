<script setup lang="ts">

onLaunch(() => {
  console.log("App Launch");
});

onShow(() => {
  console.log("App Show");
  /* #ifdef MP */
  update();
  /* #endif */
});

onHide(() => {
  console.log("App Hide");
});

</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/utilities';
@import 'uniapp-nutui/styles/index';
page {
	width: 100%;
	height: 100%;
}
/* 隐藏滚动条 */
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
  display: none;
}
/* #ifdef APP-PLUS || H5 */
*, ::before, ::after {
  box-sizing: border-box;
  border-width: 0;
  border-style: solid;
  border-color: currentColor;
  touch-action: pan-x pan-y;
}
/* #endif */
.tdt-control-copyright {
  display: none !important;
}
</style>
