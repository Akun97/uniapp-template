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