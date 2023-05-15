const baseUrl = () => {
  return process.env.VITE_REQUEST_URL;
}

const splicingParameters = (param?:request):string => {
  let paramsString = '';
  for (let attr in param?.data) {
      paramsString += `${attr}=${encodeURIComponent(param?.data[attr])}&`
  }        
  paramsString = `?${paramsString.substring(0, paramsString.length - 1)}`;
  return paramsString;
}

export class api {

  public static auth = {
    getInfo: (param?:request) => RequestMethods.get(`${baseUrl()}/getInfo`, param, { token: true }) // 用户信息
  }

  public static banner = {
    selectShowList: (param?:request) => RequestMethods.post(`${baseUrl()}/banner/selectShowList`, param) // 首页轮播
  }

}