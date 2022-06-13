/*
 * @Author: Akun97 17759735780@163.com
 * @Date: 2022-06-13 11:57:21
 * @LastEditors: Akun97 17759735780@163.com
 * @LastEditTime: 2022-06-13 11:57:34
 * @FilePath: \uniapp_template\src\types\userInfo.d.ts
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/**
 * @Description: 用户信息
 */

/**
 * @description: admin: boolean;
 * @description: avatar: string; // 头像
 * @description: createBy: string;
 * @description: createTime: string;
 * @description: delFlag: string;
 * @description: email: string;
 * @description: loginIp: string;
 * @description: nickName: string; // 昵称
 * @description: params: any;
 * @description: phonenumber: string; // 手机号
 * @description: roles: any;
 * @description: sex: string;
 * @description: status: string;
 * @description: userId: number;
 * @description: userName: string;
 */
 interface userInfo {
  admin?: boolean;
  avatar?: string; // 头像
  createBy?: string;
  createTime?: string;
  delFlag?: string;
  email?: string;
  loginIp?: string;
  nickName?: string; // 昵称
  params?: any;
  phonenumber?: string; // 手机号
  roles?: any;
  sex?: string;
  status?: string;
  userId?: number;
  userName?: string;
}

interface userInfoResult {
  code: string | number;
  user: userInfo;
  msg: string;
  permissions: any;
  roles: any;
}