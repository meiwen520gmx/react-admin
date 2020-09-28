import service from "../utils/request";
/**
 * 新增部门
 */
export function AddDepartment(data){
  return service.request({
      url: "/department/add/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}
