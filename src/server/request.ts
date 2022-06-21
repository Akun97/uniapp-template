export class RequestMethods {

  static init = (param: request = {}, need?:needToken) => {
    const success:((any: any) => void) | undefined = param?.success;
    const fail:((any: any) => void) | undefined = param?.fail;
    const complete:((any: any) => void) | undefined = param?.complete;
    param?.success && delete param.success;
    param?.fail && delete param.fail;
    param?.complete && delete param.complete;
    param.token = need?.token;
    return {
      param,
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

  static get = (url:string, something: request = {}, need?:needToken) => {
    const { param, success, fail, complete } = this.init(something, need);
    return requestFun('GET', url, param, success, fail, complete);
  }

  static post = (url:string, something: request = {}, need?:needToken) => {
    const { param, success, fail, complete } = this.init(something, need);
    if (!param.data) param.data = {};
    return requestFun('POST', url, param, success, fail, complete);
  }

  static delete = (url:string, something: request = {}, need?:needToken) => {
    const { param, success, fail, complete } = this.init(something, need);
    const str = this.querystring(param.data);
    param?.data && delete param.data;
    return requestFun('DELETE', `${url}?${str}`, param, success, fail, complete);
  }

}