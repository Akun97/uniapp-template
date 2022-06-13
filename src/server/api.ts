/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-06-13 13:37:55
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 13:48:02
 * @FilePath: \uniapp_template\src\server\api.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
import { Request } from './request';

const baseUrl = () => {
  return process.env.VITE_REQUEST_URL;
}

export class api {

  public static auth = {
    getInfo: (param?:request) => Request.get(`${baseUrl()}/getInfo`, param, { token: true }) // 用户信息
  }

  public static banner = {
    selectShowList: (param?:request) => Request.post(`${baseUrl()}/banner/selectShowList`, param) // 首页轮播
  }

}