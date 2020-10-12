import service from "../utils/request";

/**
 * 公用请求列表（包括搜索）
 */
export function GetTableList(params){
  return service.request({
      url: params.url,
      method: params.method || "post",
      data: params.data,
  })
}