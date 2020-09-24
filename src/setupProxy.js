const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware([process.env.REACT_APP_API], {
      target: process.env.REACT_APP_BASE_URL, //配置你要请求的服务器地址
      changeOrigin: true,
      pathRewrite: {
        [`^${process.env.REACT_APP_API}`]: ""
        // "^/devApi": ""
      }
    })
  )
  // app.use(proxy("/manage/api",{
  //   target: "http://admintest.happymmall.com:7000",
  //   changeOrigin: true
  // }))
};

/**
 * 1.匹配到devApi,开始做代理去替换这个地址： http://www.web-jshtml.cn/api/react，请求地址就会变成/devApi/login/
 * 2.pathRewrite 主要是把/devApi/login/ =>变成 /login/
 * 3.替换之后的地址： http://www.web-jshtml.cn/api/react/login
 */