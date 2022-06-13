export const fileUrl = process.env.VITE_FILE_URL;

export const ossUrl = process.env.VITE_OSS_URL;

export const devIng = () => {
  uni.showModal({
    content: '正在建设中，敬请期待',
    showCancel: false
  });
}