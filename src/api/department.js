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

/**
 * 部门列表（包括搜索）
 */
export function GetDepartmentList(data){
  return service.request({
      url: "/department/list/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}


/**
 * 部门列表
 */
export function DelDepartment(data){
  return service.request({
      url: "/department/delete/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}


