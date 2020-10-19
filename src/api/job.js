import service from "../utils/request";
/**
 * 新增部门
 */
export function AddJobwork(data){
  return service.request({
      url: "/job/add/",
      method: "post",
      data,
  })
}
