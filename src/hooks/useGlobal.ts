export const useGlobal = () => {

  const fileUrl = process.env.VITE_FILE_URL;

  const ossUrl = process.env.VITE_OSS_URL;

  const devIng = ():void => {
    uni.showModal({
      content: '正在建设中，敬请期待',
      showCancel: false
    });
  }

  return {
    fileUrl,
    ossUrl,
    devIng
  }

}