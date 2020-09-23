const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/devApi", {
      target: "http://www.web-jshtml.cn/api/react", //配置你要请求的服务器地址
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": ""
      }
    })
  )
  // app.use(proxy("/manage/api",{
  //   target: "http://admintest.happymmall.com:7000",
  //   changeOrigin: true
  // }))
};
