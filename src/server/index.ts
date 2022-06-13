/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-06-13 13:38:57
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 15:01:11
 * @FilePath: \uniapp_template\src\server\index.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
const toast = (msg:string):void => {
  uni.showToast({
    title: msg,
    icon: 'none'
  });
}

const successFunc = (res:any, callback:(result:result) => void) => {
  if (res.statusCode !== 200) {
    toast('请求出错');
    return;
  }
  let result:result;
  if (typeof res.data === 'string') {
    result = JSON.parse(res.data as string);
  } else {
    result = res.data as result;
  }
  switch (result.code) {
    case 200:
    case 'C00000':
      callback && callback(result);
      break;
    case 401:
      if (uni.getStorageSync('token')) {
        uni.removeStorageSync('token');
        uni.navigateTo({
          url: '/member/pages/login/index',
          success: () => {
            uni.showToast({
              title: '暂未登录或登录过期，请重新登录',
              icon: 'none'
            });
          }
        });
      }
      break;
    default:
      toast(result.msg??'请求出错');
      break;
  }
}

export const requestFun = (
  method:'OPTIONS' | 'GET' | 'HEAD' | 'POST' | 'PUT' | 'DELETE' | 'TRACE' | 'CONNECT', 
  url:string,
  param:requestConfig,
  success?:(any: any) => void, 
  fail?:(any: any) => void, 
  complete?:(any: any) => void
) => {

  if (param.header) {
    param.header = Object.assign(param.header, {
      "Accept": "application/json,text/x-json,application/jsonrequest,text/json"
    });
  } else {
    param.header = {
      "Accept": "application/json,text/x-json,application/jsonrequest,text/json"
    };
  }

  if (!param.dataType) param.dataType = 'JSON';
  if (param.token) {
    if (uni.getStorageSync('token')) {
      param.header['Authorization'] = uni.getStorageSync('token');
    } else {
      uni.navigateTo({
        url: '/member/pages/login/index'
      });
    }
  }

  if (!success && !fail && !complete) {
    return new Promise((resolve, reject) => {
      uni.request({
        method: method,
        url: url,
        ...param,
        success: res => {
          successFunc(res, (result:result) => resolve(result));
        },
        fail: res => {
          toast('请求出错');
          reject(res);
        }
      });
    });
  } else {    
    return uni.request({
      method: method,
      url: url,
      ...param,
      success: res => {
        successFunc(res, (result:result) => success && success(result));
      },
      fail: res => {
        toast('请求出错');
        fail && fail(res);
      },
      complete: res => {
        complete && complete(res);
      }
    });
  }

}