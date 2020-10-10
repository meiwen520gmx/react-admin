import axios from "axios";

import { getToken, getUserName } from "./cookies";//用户信息存储在cookie中

import { message } from "antd";

const service = axios.create({
  baseURL: process.env.REACT_APP_API, //读取环境变量中对应的请求地址
  timeout: 5000,
});

service.interceptors.request.use(
  function (config) {
    // console.log(process.env.NODE_ENV)//development 读取环境变量
    config.headers["Token"] = getToken();
    config.headers["Username"] = getUserName();
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

service.interceptors.response.use(
  function (response) {
    const data = response.data;
    if(data.resCode !== 0){//resCode不成功 做全局的处理
      message.warning(data.message);
      return Promise.reject(data);
    }else{//resCode成功
      return data;
    }
  },
  function (error) {
    console.log(error.data);
    return Promise.reject(error);
  }
);
export default service;
