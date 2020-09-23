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