import service from "../utils/request";
/**
 * 登录接口
 */
export function Login(data){
  return service.request({
      url: "/login/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}

/**
 * 获取验证码
 */
export function GetCode(data){
  return service.request({
      url: "/getSms/",
      method: "post",
      data,
  })
}