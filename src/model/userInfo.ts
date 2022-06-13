export class UserInfoModel {

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
  
  constructor(data: userInfo) {
    this.admin = data.admin;
    this.avatar = data.avatar;
    this.createBy = data.createBy;
    this.createTime = data.createTime;
    this.delFlag = data.delFlag;
    this.email = data.email;
    this.loginIp = data.loginIp;
    this.nickName = data.nickName;
    this.params = data.params;
    this.phonenumber = data.phonenumber;
    this.roles = data.roles;
    this.sex = data.sex;
    this.status = data.status;
    this.userId = data.userId;
    this.userName = data.userName;
  }

}


export class UserInfoResultModel {

  code: string | number;
  user: UserInfoModel;
  msg: string;
  permissions: any;
  roles: any;

  constructor(result: userInfoResult) {
    this.code = result.code;
    this.msg = result.msg;
    this.permissions = result.permissions;
    this.roles = result.roles;
    this.user = new UserInfoModel(result.user);
  }

}