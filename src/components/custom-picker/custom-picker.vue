<template>
  <uni-popup ref="refPopup" type="bottom" :safe-area="false" @maskClick="maskClick">
    <view class="w-full h-[496rpx] bg-white flex flex-col box-content" 
      :style="{ paddingBottom: `env(safe-area-inset-bottom)` }">
      <view class="w-full h-[96rpx] flex justify-between items-center border-b-gray-400 border-b-[1rpx]">
        <view class="text-[32rpx] text-black-100/[0.6] px-[32rpx]" @click="cancel">取消</view>
        <view class="text-[32rpx] text-theme px-[32rpx]" @click="confirm">确定</view>
      </view>
      <picker-view class="flex-1 w-full h-full" v-model:value="pickerValue" indicator-style="height: 40px;" :immediate-change="true">
        <picker-view-column>
          <template v-for="(item, index) in data" :key="index">
            <view class="w-full leading-[40px] text-[32rpx] text-center">{{item.text}}</view>
          </template>
        </picker-view-column>
      </picker-view>
    </view>
  </uni-popup>
</template>

<script setup lang="ts">

interface Props {
  data: any[]
}
const props = withDefaults(defineProps<Props>(), {});
const emit = defineEmits(['confirm']);

const pickerValue = ref<any>([0]);
const pickerOldValue = ref<any>([0]);
const refPopup = ref<any>(null);

const open = ():void => {
  refPopup.value.open();
}
defineExpose({open})

const cancel = ():void => {
  pickerValue.value = pickerOldValue.value;
  refPopup.value.close();
}

const confirm = ():void => {
  pickerOldValue.value = pickerValue.value;
  emit('confirm', props.data[pickerValue.value[0]]);
  refPopup.value.close();
}

const maskClick = ():void => {
  pickerValue.value = pickerOldValue.value;
}

</script>