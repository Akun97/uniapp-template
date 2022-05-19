<script setup lang="ts">
import { onLaunch, onShow, onHide } from "@dcloudio/uni-app";

onLaunch(() => {
  console.log("App Launch");
});

onShow(() => {
  console.log("App Show");
});

onHide(() => {
  console.log("App Hide");
});

</script>

<style lang="scss">
@import 'tailwindcss/base';
@import 'tailwindcss/utilities';
page {
	width: 100%;
	height: 100%;
}
/* 隐藏滚动条 */
::-webkit-scrollbar{
  width: 0;
  height: 0;
  color: transparent;
}
</style>
