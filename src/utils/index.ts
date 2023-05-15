import { ListModel as DictList } from '@/model/dict';

/**
 * @param {date} time 需要转换的时间
 * @param {String} fmt 需要转换的格式 如 yyyy-MM-dd、yyyy-MM-dd HH:mm:ss
 * @returns {String}
 */
 export const formatTime = (
  time: string | number | Date,
  fmt: string
): string => {
  if (!time) return '-'
  const date = new Date(time)
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'H+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
    'q+': Math.floor((date.getMonth() + 3) / 3),
    S: date.getMilliseconds(),
  }
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        // @ts-ignore: Unreachable code error
        RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
      )
    }
  }
  return fmt
}

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

export const abbrNumber = (num:number|undefined|null):string => {
  // 千转k 万转w
  let numCopy:any = num;
  if (numCopy) {
    if(numCopy >= 10000) {
      numCopy = Math.round(numCopy/1000)/10 + 'W';
    } else if (numCopy >= 1000) {
      numCopy = Math.round(numCopy/100)/10 + 'K';
    }
  }
  return `${numCopy}`;
}

/**
 * @param {number[]} data 列表数据
 * @param {boolean} subMin 最小值是否再减subBase
 * @param {number} subBase 最小值是否再减subBase
 * @returns {sizeNumber}
 */
 export const getSizeNumber = (data:number[], subMin:boolean = false, subBase:number = 10):sizeNumber => {
  const maxValue = Math.ceil(Math.max.apply(null, data));
  const minData = Math.min.apply(null, data);
  const minfloor = Math.floor(Math.min.apply(null, data));
  const minValue = minfloor === minData ? minData - subBase : minfloor;
  return {
    max: maxValue,
    min: subMin ? minValue : minData
  }
}

/**
 * @param {number} min 最小值
 * @param {number} man 最大值
 * @param {number} count 分割线数量
 * @returns {interval}
 */
export const getInterval = (min: number, max: number, count: number):interval => {
  // 控制分割条数，
  let distance = parseInt(((max - min) / count).toString(), 10);
  if (max > distance*count) {
    distance = max/count;
  }
  return {
    max,
    min,
    interval: Math.ceil(distance),
  };
}

export const hexToRgba = (hex:any, opacity:number) => {
  // 十六进制颜色转换成rgba
  if (!hex) hex = '#ededed';
  let rgba = 'rgba(' + parseInt('0x' + hex.slice(1,3)) + ',' +
      parseInt('0x' + hex.slice(3,5)) + ',' +
      parseInt('0x' + hex.slice(5,7)) + ',' +
      (opacity) + ')'
  return rgba
}

// 回显数据字典
export const selectDictLabel = (datas:DictList[], value:string) => {
  let actions:string[] = [];
  Object.keys(datas).some((key:any) => {
    if (datas[key].dictValue == "" + value) {
      actions.push(datas[key].dictLabel);
      return true;
    }
  });
  return actions.length === 0 ? '-' : actions.join("");
}

// 回显数据字典（字符串数组）
export function selectDictLabels(datas:DictList[], value:string, separator?:string) {
  var actions:string[] = [];
  var currentSeparator = undefined === separator ? "," : separator;
  var temp = value.split(currentSeparator);
  Object.keys(value.split(currentSeparator)).some((val:any) => {
    Object.keys(datas).some((key:any) => {
      if (datas[key].dictValue == "" + temp[val]) {
        actions.push(datas[key].dictLabel + currentSeparator);
      }
    });
  });
  return actions.length === 0 ? '-' : actions.join("").substring(0, actions.join("").length - 1);
}