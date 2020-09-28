export const AdminToken = "adminToken";//用户token名称
export const openKey = 'openKey';//用户打开的menu
export function setValue(key,value){
  sessionStorage.setItem(key,value);//纯设置的东西不需要return
}

export function getValue(key){
  return sessionStorage.getItem(key);//如果获取东西就需要return
}
