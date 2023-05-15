<template>
  <view 
    v-if="!refresherTriggered && !refresherReady"
    :class="`w-full ${data.length === 0 ? '' : 'top-0 left-0 z-10 fixed'}`"
  >
    <view 
      class="w-full flex items-center justify-center transition-all ease-linear duration-300" 
      :style="{
        height: `${navbarHeight() + (statusBarHeight??0)}px`,
        paddingTop: `${(statusBarHeight??0)}px`,
        backgroundColor: data.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeBg : defaultBg
      }"
    >

      <template v-if="!hasTabbar">
        <view 
          class="left-0 flex items-center justify-center absolute"
          :style="{
            width: `${navbarHeight()}px`,
            height: `${navbarHeight()}px`,
            top: `${statusBarHeight}px`
          }" @click="back"
        >

          <template v-if="pagesLength != 1">
            <view 
              class="text-[34rpx] iconfont icon-fanhui1"
              :style="{
                color: data.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : defaultText
              }"
            ></view>
          </template>

          <template v-else>
            <view 
              class="text-[34rpx] iconfont icon-home"
              :style="{
                color: data.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : defaultText
              }"
            ></view>
          </template>

        </view>
      </template>

      <view 
        class="text-[34rpx] font-extrabold tracking-[3rpx]"
        :style="{
          color: data.length === 0 || scrollTop > (navbarHeight() + (statusBarHeight??0)) ? activeText : defaultText
        }"
      >
        <text>{{title}}</text>
      </view>

    </view>
  </view>
</template>

<script setup lang="ts">

interface Props {
  hasTabbar?: boolean, // 是否是导航页 是的会没有左侧按钮
  refresherTriggered?: boolean, // 刷新或下拉都会隐藏
  refresherReady?: boolean, // 刷新或下拉都会隐藏
  data?: any[], // 页面顶部没轮播之类的将不会定位
  scrollTop: number, // 当页面滚动样式变成激活样式
  title: string, // 标题
  defaultBg?: string, // 默认背景色
  activeBg?: string,
  defaultText?: string, // 默认文本色
  activeText?: string,

}
const props = withDefaults(defineProps<Props>(), {
  hasTabbar: false,
  refresherTriggered: false,
  refresherReady: false,
  data: () => [0],
  defaultBg: '',
  activeBg: '#F7F7F7',
  defaultText: '#FFFFFF',
  activeText: '#000000'
});

const { statusBarHeight, pagesLength, navbarHeight, back } = useNavbar();

</script>