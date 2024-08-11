import request from "@/utils/request";

const AUTH_BASE_URL = "/auth";

class AuthAPI {
  /** 登录 接口*/
  static login(data: LoginData) {
    return request<any, LoginResult>({
      url: `${AUTH_BASE_URL}/login`,
      method: "post",
      data: data,
    });
  }

  /** 注销 接口*/
  static logout() {
    return request({
      url: `${AUTH_BASE_URL}/logout`,
      method: "delete",
    });
  }

  /** 获取验证码 接口*/
  static getCaptcha() {
    return request<any, CaptchaResult>({
      url: `${AUTH_BASE_URL}/captcha`,
      method: "get",
    });
  }

  static getRoleList() {
    return request<any, IRoleResult>({
      url: `${AUTH_BASE_URL}/role`,
      method: "get",
    });
  }
  static getManagerList() {
    return request<any, IManagerResult>({
      url: `${AUTH_BASE_URL}/manager`,
      method: "get",
    });
  }
}

export default AuthAPI;

/** 登录请求参数 */
export interface LoginData {
  /** 用户名 */
  username: string;
  /** 密码 */
  password: string;
  /** 验证码缓存key */
  // captchaKey: string;
  /** 验证码 */
  // captchaCode: string;
}

/** 登录响应 */
export interface LoginResult {
  /** 访问token */
  accessToken?: string;
  /** 过期时间(单位：毫秒) */
  expires?: number;
  /** 刷新token */
  refreshToken?: string;
  /** token 类型 */
  tokenType?: string;
}

/** 验证码响应 */
export interface CaptchaResult {
  /** 验证码缓存key */
  captchaKey: string;
  /** 验证码图片Base64字符串 */
  captchaBase64: string;
}

export interface IRole {
  name: string,
  remark: string,
  id?: number,
  createdAt?: string,
  updatedAt?: string,
}

export interface IRoleResult {
  /** 角色列表 */
  items: IRole[];
  total: number;
}

export interface IManager {
  realName: string,
  id?: number,
  roleId?: number,
  account?: number,
  status?: number,
  phone?: number,
  password?: string,
  createdAt?: string,
  updatedAt?: string,
}

export interface IManagerResult {
  /** 管理员列表 */
  items: IManager[];
  total: number;
}