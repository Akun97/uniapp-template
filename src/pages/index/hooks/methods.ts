import { ResultModel } from '@/model/result';

export const initFunc = () => {

  const { initTabbar } = useTabbar();
  const list = ref<string[]>(['/profile/upload/2022/06/13/8677e8e3-162e-4cc1-908e-002b39956eb0.png']);

  onShow(() => {
    initTabbar(0);
    (api.banner.selectShowList() as Promise<result>).then((res:result) => {
      const result = new ResultModel(res);
      console.log(result)
    });
    api.banner.selectShowList({
      success: (res:result) => {
        const result = new ResultModel(res);
        console.log(result)
      }
    });
  });

  return {
    list
  }

}