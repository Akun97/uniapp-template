export const useGlobal = () => {

  const ossUrl = process.env.VITE_OSS_URL;

  const baseUrl = process.env.VITE_REQUEST_URL;

  const devIng = ():void => {
    uni.showModal({
      content: '正在建设中，敬请期待',
      showCancel: false
    });
  }

  const htmlGetPlainText = (richStr: string):string => { // 提取富文本文字内容
    let value = richStr;
    if (value) {
      // 方法一： 
      // value= value.replace(/\s*/g, "");  //去掉空格
      value= value.replace(/<[^>]+>/g, ""); //去掉所有的html标记
      value = value.replace(/↵/g, "");     //去掉所有的↵符号
      value = value.replace(/[\r\n]/g, ""); //去掉回车换行
      value = value.replace(/&nbsp;/g, ""); //去掉空格
      const arrEntities:any = {'lt':'<','gt':'>','nbsp':' ','amp':'&','quot':'"'};
      value = value.replace(/&(lt|gt|nbsp|amp|quot);/ig,function(all,t){return arrEntities[t];}); //转意符换成普通字符
      return value;
    } else {
      return '';
    }
  }
  
  const currentTime = ref<any>(null);
  const preventReClick = (callback:() => void):void => { // 防抖
    if (!currentTime) {
      currentTime.value = new Date().getTime();
      callback();
    } else {
      if ((new Date().getTime() - currentTime) > 3000) {
        currentTime.value = new Date().getTime();
        callback();
      }
    }
  }

  return {
    ossUrl,
    baseUrl,
    devIng,
    htmlGetPlainText,
    preventReClick
  }

}