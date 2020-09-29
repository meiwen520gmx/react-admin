import cookies  from "react-cookies";


const AdminToken = "adminToken";//用户token名称
const userName = "username";//用户名称


export function setToken(value){
  cookies.save(AdminToken, value);
}
export function getToken(){
  return cookies.load(AdminToken);
}

export function setUserName(value){
  cookies.save(userName,value);
}
export function getUserName(){
  return cookies.load(userName);
}