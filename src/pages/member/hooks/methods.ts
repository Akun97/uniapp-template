import { onShow } from '@dcloudio/uni-app';
import { useTabbar } from '@/hooks/useTabbar';

export const initFunc = () => {

  const { initTabbar } = useTabbar();

  onShow(() => {
    initTabbar(4);
  });

}