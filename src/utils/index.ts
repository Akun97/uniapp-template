export const formatNumber = (num:number|undefined|null):string => {
  // 数字千分位格式化
  if (num) {
    const numArr = num.toString().split('.');
    return numArr[0]
      .split('')
      .reverse()
      .reduce((prev, next, index) => {
        return (index % 3 ? next : next + ',') + prev;
      }) + `${numArr[1] ? '.' + numArr[1] : ''}`;
  } else {
    return '-';
  }
}