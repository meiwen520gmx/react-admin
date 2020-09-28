//自动化工程
const files = require.context("../../views/", true, /\.jsx$/);//动态引入文件
//声明组件对象
const configRouters = [];
//循环文件
files.keys().map(key => {
  //过滤 /index 和/login
  if(key.includes("./index/") || key.includes("./login/")) {return false}
  const splitFileName = key.split(".");
  const jsonObj = {};
  //拿到路径
  const path = `/index${splitFileName[1].toLowerCase()}`;
  //拿到组件，files(key).default就是读取文件中被暴露的default模块
  const component = files(key).default;
  //写入对象
  jsonObj.path = path;
  jsonObj.component = component;
  return configRouters.push(jsonObj);
})
// console.log(configRouters)
export default configRouters;
