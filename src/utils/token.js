const AdminToken = "admintoken";

export function setToken(value){
  sessionStorage.setItem(AdminToken,value);//纯设置的东西不需要return
}

export function getToken(){
  return sessionStorage.getItem(AdminToken);//如果获取东西就需要return
}