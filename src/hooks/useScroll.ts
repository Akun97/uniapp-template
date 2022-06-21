export const useScroll = () => {

  const scrollTop = ref<number>(0);

  const onScroll = (e:any) => {
    scrollTop.value = e.detail.scrollTop;
  }

  return {
    scrollTop,
    onScroll
  }

}