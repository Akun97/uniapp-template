const baseUrl = () => {
  return process.env.VITE_REQUEST_URL;
}

export class api {

  public static auth = {
    getInfo: (param?:request) => RequestMethods.get(`${baseUrl()}/getInfo`, param, { token: true }) // 用户信息
  }

  public static banner = {
    selectShowList: (param?:request) => RequestMethods.post(`${baseUrl()}/banner/selectShowList`, param) // 首页轮播
  }

}