<template>
  <uni-popup ref="refPopup" type="bottom" :safe-area="false" @maskClick="maskClick">
    <view 
      class="w-full h-[568rpx] rounded-[24rpx] bg-white flex flex-col box-content" 
      :style="{ paddingBottom: `env(safe-area-inset-bottom)` }"
    >
      <view class="w-full h-[96rpx] flex justify-between items-center border-b-gray-100 border-b-[1rpx]">
        <view class="text-[32rpx] text-black-100 px-[32rpx]" @click="cancel">取消</view>
        <view class="text-[28rpx] text-gray-200">{{ title }}</view>
        <view class="text-[32rpx] text-theme px-[32rpx]" @click="confirm">确定</view>
      </view>
      <picker-view 
        class="flex-1 w-full h-full picker-box" 
        v-model:value="pickerValue"  
        indicator-style="height: 40px;" 
        :immediate-change="false"
        @change="cascadeChange" 
      >
        
        <template v-if="cascade > 1">
          <template v-for="(child, pi) in cascadeData" :key="pi">
            <picker-view-column>
              <template v-for="(item, index) in child" :key="index">
                <view class="w-full leading-[40px] text-[32rpx] text-center line-clamp-1">{{item.text}}</view>
              </template>
            </picker-view-column>
          </template>
        </template>

        <template v-else>
          <template v-for="(child, pi) in data" :key="pi">
            <picker-view-column>
              <template v-for="(item, index) in child" :key="index">
                <view class="w-full leading-[40px] text-[32rpx] text-center line-clamp-1">{{item.text}}</view>
              </template>
            </picker-view-column>
          </template>
        </template>

      </picker-view>
    </view>
  </uni-popup>
</template>

<script lang="ts">
export default {
  options: { styleIsolation: 'shared' }
}
</script>
<script setup lang="ts">

interface Props {
  // data格式可以是
  // { text:string, value: string, children: any[] }[] 联动列表格式
  // { text:string, value: string }[][] 不联动列表格式
  data: any[],
  value: any[], // 选中value值列表string[]
  title?: string,
  cascade?: number, // 联级等级,只有cascade>1的时候才会被认定为可联动
}
const props = withDefaults(defineProps<Props>(), {
  title: '',
  cascade: 1
});
const emit = defineEmits(['confirm', 'update:value']);

const cascadeData = ref<any>([]);
const cascadeOldData = ref<any>([]);
const pickerValue = ref<any>([]);
const pickerCopyValue = ref<any>([]); // 用于监听联级列表变动
const pickerOldValue = ref<any>([]); // 用于没确定回复初始数据
const refPopup = ref<any>(null);

const open = ():void => {
  refPopup.value.open();
}
defineExpose({open});

watch(() => props.value, (newV, oldV) => {
  if (props.cascade > 1) { // 联级列表特殊情况，将列表项的children抽离出来
    const item = props.data.find(item => item.value === newV[0]); // 第一列初始选中项
    const index = props.data.findIndex(item => item.value === newV[0]); // 第一列初始选中项的下标
    let cascadeDataCopy = [props.data]; // 改造后的列表 => [[], [], [].....]
    let children = []; // 用于装剩余子列表的下标
    for (let i = 1; i < props.cascade; i++) { // 初始化(下标列表长度,长度为联级层数-1)(改造后的列表长度，长度为联级层数)
      cascadeDataCopy.push([]);
      children.push(0);
    }
    if (item) {
      let obj = item; // 第一列的选中项
      children.forEach((element:any, index:number) => {
        if (obj.children) { // 下一列的列表，存在的话赋值给下一列
          cascadeDataCopy[index+1] = obj.children;
        }
        // 根据初始值查询下一列列表选中项的下标以及列表项
        const childrenIndex = obj.children?.findIndex((child:any) => child.value === newV[index+1]);
        obj = obj.children?.find((child:any) => child.value === newV[index+1]);
        if (obj) { // 若存在则保存下标
          children[index] = childrenIndex;
        }
      });
    }
    // 处理好的选中下标以及列表
    const indexs = [index === -1 ? 0 : index].concat(children);
    pickerValue.value = JSON.parse(JSON.stringify(indexs));
    pickerCopyValue.value = JSON.parse(JSON.stringify(indexs));
    pickerOldValue.value = JSON.parse(JSON.stringify(indexs));
    cascadeData.value = JSON.parse(JSON.stringify(cascadeDataCopy));
    cascadeOldData.value = JSON.parse(JSON.stringify(cascadeDataCopy));
  } else {
    pickerValue.value = props.data.map((child:any[], index:number) => child.findIndex(item => item.value === newV[index]));
    pickerOldValue.value = props.data.map((child:any[], index:number) => child.findIndex(item => item.value === newV[index]));
  }
}, {
  immediate: true,
  deep: true
});

const cancel = ():void => {
  setTimeout(() => {
    cascadeData.value = JSON.parse(JSON.stringify(cascadeOldData.value));
    pickerValue.value = JSON.parse(JSON.stringify(pickerOldValue.value));
  }, 350);
  refPopup.value.close();
}

const cascadeChange = (e:any):void => {
  if (props.cascade > 1) {
    const changeIndex = e.detail.value.map((i:number, index: number) => {
      if (i != pickerCopyValue.value[index]) {
        return index;
      } else {
        return null;
      }
    }).filter((item: any) => item != null).reverse()[0];// 最有一个有变动的列表下标
    const source = cascadeData.value[changeIndex]; // 获取变动的列表
    for (let i = (changeIndex+1); i < cascadeData.value.length; i++) {
      if (cascadeData.value[i]) { // 若是有下一级则将列表当前选中项的子列表赋值给下一级,并且下一级初始下标为0
        cascadeData.value[i] = source[e.detail.value[i-1]].children;
        pickerValue.value[i] = 0;
      }
    }
    // 使用完重置成最新数据
    pickerCopyValue.value = JSON.parse(JSON.stringify(pickerValue.value));
  } 
}

const confirm = ():void => {
  setTimeout(() => {
    cascadeOldData.value = JSON.parse(JSON.stringify(cascadeData.value));
    pickerOldValue.value = JSON.parse(JSON.stringify(pickerValue.value));
    if (props.cascade > 1) {
      emit('confirm', cascadeData.value.map((child:any[], index:number) => child[pickerValue.value[index]]));
      emit('update:value', cascadeData.value.map((child:any[], index:number) => child[pickerValue.value[index]].value));
    } else {
      emit('confirm', props.data.map((child:any[], index:number) => child[pickerValue.value[index]]));
      emit('update:value', props.data.map((child:any[], index:number) => child[pickerValue.value[index]].value));
    }
  }, 350);
  refPopup.value.close();
}

const maskClick = ():void => {
  setTimeout(() => {
    cascadeData.value = JSON.parse(JSON.stringify(cascadeOldData.value));
    pickerValue.value = JSON.parse(JSON.stringify(pickerOldValue.value));
  }, 350);
}

</script>

<style scoped lang="scss">
.picker-box {
  :deep(.uni-picker-view-wrapper) {
    @apply w-full flex;
  }
}
</style>