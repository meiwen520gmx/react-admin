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
 * 删除
 */
export function DelDepartment(data){
  return service.request({
      url: "/department/delete/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}


/**
 * 切换禁用启用
 */
export function SwitchStatus(data){
  return service.request({
      url: "/department/status/",
      method: "post",
      data,//请求类型为post时的参数形式
  })
}

/**
 * 详情
 */
export function CheckDetail(data){
  return service.request({
      url: "/department/detailed/",
      method: "post",
      data,
  })
}


/**
 * 编辑部门
 */
export function EditDepartment(data){
  return service.request({
      url: "/department/edit/",
      method: "post",
      data,
  })
}
