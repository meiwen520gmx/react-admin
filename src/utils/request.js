import axios from "axios";

const service = axios.create({
  baseURL: process.env.REACT_APP_API,//读取环境变量中对应的请求地址
  timeout: 5000,
});

service.interceptors.request.use(
  function (config) {
    console.log(process)
    console.log(process.env.NODE_ENV)//development 读取环境变量
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default service;