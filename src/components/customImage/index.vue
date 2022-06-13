<template>
  <view :class="[classname, 'overflow-hidden', 'relative']" 
    :style="{ backgroundColor: show ? 'transparent' : '#EEEEEE' }"
    @click="onTap">
    <template v-if="src">
      <view v-if="!show" class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
        <view class="circle-loader">
          <template v-for="(item, index) in 8" :key="index">
            <view class="circle-loader-item"></view>
          </template>
        </view>
      </view>
      <image :class="[
          'w-full h-full', 
          transition ? 'transition-all ease-linear duration-500' : '',
          show ? '' : 'opacity-0'
        ]" 
        :src="src" 
        @load="imageLoad">
      </image>
    </template>
  </view>
</template>

<script setup lang="ts">
import { replaceJs } from 'weapp-tailwindcss-webpack-plugin/replace'
import { ref, watch } from 'vue';

interface Props {
  className?: string,
  src?: string,
}
const props = withDefaults(defineProps<Props>(), {
  className: '',
  src: ''
});
const emit = defineEmits(['click']);

const show = ref<boolean>(false);
const transition = ref<boolean>(true);
const classname = ref<string>('');

watch(() => props.src, (newV, oldV) => {
  if (newV != oldV) {
    show.value = false;
    setTimeout(() => {
      transition.value = true;
    }, 1);
  }
});

watch(() => props.className, (newV, oldV) => {
  classname.value = replaceJs(props.className);
}, { immediate: true });

const onTap = () => {
  emit('click');
}

const imageLoad = () => {
  show.value = true;
  setTimeout(() => {
    transition.value = false;
  }, 500);
}

</script>

<style scoped lang="scss">
@-webkit-keyframes opaque {
  0% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.1;
  }
}

@keyframes opaque {
  0% {
    opacity: 0.1;
  }
  40% {
    opacity: 1;
  }
  80% {
    opacity: 0.1;
  }
  100% {
    opacity: 0.1;
  }
}
.circle-loader {
  position: relative;
  width: auto;
  height: auto;
  &-item {
    height: 10rpx;
    width: 10rpx;
    background-color: #999999;
    border-radius: 50%;
    position: absolute;
    -webkit-animation: 0.8s opaque ease-in-out infinite both;
    animation: 0.8s opaque ease-in-out infinite both;
  }
  &-item:nth-child(1) {
    top: -25rpx;
    left: 0;
  }
  &-item:nth-child(2) {
    top: -17rpx;
    left: 17rpx;
    -webkit-animation-delay: 0.1s;
    animation-delay: 0.1s;
  }
  &-item:nth-child(3) {
    top: 0;
    left: 25rpx;
    -webkit-animation-delay: 0.2s;
    animation-delay: 0.2s;
  }
  &-item:nth-child(4) {
    top: 17rpx;
    left: 17rpx;
    -webkit-animation-delay: 0.3s;
    animation-delay: 0.3s;
  }
  &-item:nth-child(5) {
    top: 25rpx;
    left: 0;
    -webkit-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }
  &-item:nth-child(6) {
    top: 17rpx;
    left: -17rpx;
    -webkit-animation-delay: 0.5s;
    animation-delay: 0.5s;
  }
  &-item:nth-child(7) {
    top: 0;
    left: -25rpx;
    -webkit-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }
  &-item:nth-child(8) {
    top: -17rpx;
    left: -17rpx;
    -webkit-animation-delay: 0.7s;
    animation-delay: 0.7s;
  }
}
</style>