export class RequestMethods {

  static init = (param: request = {}, need?:need) => {
    const success:((any: any) => void) | undefined = param?.success;
    const fail:((any: any) => void) | undefined = param?.fail;
    const complete:((any: any) => void) | undefined = param?.complete;
    param?.success && delete param.success;
    param?.fail && delete param.fail;
    param?.complete && delete param.complete;
    const paramRes = {
      ...param,
      ...need
    }
    return {
      paramRes,
      success,
      fail,
      complete
    }
  }

  static cleanArray = (actual: any[]) => {
    let newArray = [];
    for (let i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }
  
  static querystring = (json: any) => {
    if (!json) return '';
    return this.cleanArray(Object.keys(json).map(key => {
      if (json[key] === undefined)
        return ''
      return encodeURIComponent(key) +
      '=' + encodeURIComponent(json[key])
    })).join('&');
  }

  static get = (url:string, something: request = {}, need?:need) => {
    const { paramRes, success, fail, complete } = this.init(something, need);
    return requestFun('GET', url, paramRes, success, fail, complete);
  }

  static post = (url:string, something: request = {}, need?:need) => {
    const { paramRes, success, fail, complete } = this.init(something, need);
    if (!paramRes.data) paramRes.data = {};
    return requestFun('POST', url, paramRes, success, fail, complete);
  }

  static delete = (url:string, something: request = {}, need?:need) => {
    const { paramRes, success, fail, complete } = this.init(something, need);
    const str = this.querystring(paramRes.data);
    paramRes?.data && delete paramRes.data;
    return requestFun('DELETE', `${url}?${str}`, paramRes, success, fail, complete);
  }

}