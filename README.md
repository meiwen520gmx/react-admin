### 功能
1.登录、注册
2.登录保存token于session中
3.配置接口跨域，封装axios请求
4.配置环境变量
5.密码加密
6.根据路由表生成侧边栏


### 学习文档
* reactrouter:https://reactrouter.com/web/guides/quick-start
* redux: https://www.redux.org.cn/docs/advanced/UsageWithReactRouter.html
* react App中文文档：https://www.html.cn/create-react-app/docs/adding-custom-environment-variables/
### git 基础命令

- 拷贝项目：`git clone <仓库地址>`
- 创建分支： `git branch <name>`
- 切换分支： `git checkout <name>`
- 创建分支并进入分支： `git checkout -b <name>`
- 查看状态： `git status`
- 添加所有文件： `git add`
- 提交到暂存区： `git commit -m '当前提交的说明'`
- 拉取远程分支的代码： `git pull origin <name>`
- 推送代码到远程分支： `git push origin <name>`
- 查看分支： `git branch --list`
- 查看所有分支包括远程分支： `git branch -a`
- 合并其他分支到当前分支： `git merge --no-ff '描述' <name>`

### 配置 sass

安装 `yarn add sass-loader node-sass --save-dev`
sass 全局配置变量，项目中所有的 scss 文件均可使用变量和方法，无需再次单独引入:

- 安装：`yarn add sass-resources-loader -D`
- 在 webpack.config.js 中配置：

```
{
            test: sassRegex,
            exclude: sassModuleRegex,
            use: getStyleLoaders(
              {
                importLoaders: 3,
                sourceMap: isEnvProduction && shouldUseSourceMap,
              },
              'sass-loader'
            ).concat({
              loader: 'sass-resources-loader',
              options: {
                resources: [
                  path.resolve(__dirname, '../src/styles/main.scss')
                ]
              }
            }),
            // Don't consider CSS imports dead code even if the
            // containing package claims to have no side effects.
            // Remove this when webpack adds a warning or an error for this.
            // See https://github.com/webpack/webpack/issues/6571
            sideEffects: true,
          },
```

### antd 按需加载

安装 antd：`yarn add antd --save`
安装按需加载包：`yarn add babel-plugin-import --save-dev`
在 webpack.config.js 中进行配置：

```
loader: require.resolve('babel-loader'),
              options: {
                customize: require.resolve(
                  'babel-preset-react-app/webpack-overrides'
                ),

                plugins: [
                  [
                    require.resolve('babel-plugin-named-asset-import'),
                    {
                      loaderMap: {
                        svg: {
                          ReactComponent:
                            '@svgr/webpack?-svgo,+titleProp,+ref![path]',
                        },
                      },
                    },
									],
									[
										"import",
										{libraryName: "antd", style: "css"}
									]//antd按需加载
                ],
```
### react中函数定义方式
1、箭头函数
```
onFinish = () => {};
onClick={this.onFinish}
```
2、构造器内声明
```
this.onFinish = this.onFinish.bind(this);
onFinish(){this...}
```
3、bind()绑定
```
onFinish(){this...}
onClick={this.onFinish.bind(this)}
```
4、绑定时使用箭头函数
`onClick={() => {this.onFinish}}`
### 跨域配置
1.安装依赖：`yarn add http-proxy-middleware`
2.修改路径
  修改config/path.js
  proxySetup路径
3.新建文件夹
  src/目录新建setupProxy.js
  ```
  const { createProxyMiddleware } = require("http-proxy-middleware");
  module.export = function(app){
    app.use(createProxyMiddleware("/manage",{
      target: "http://admintest.happymmal.com",//配置你要请求的服务器地址
      changeOrigin: true,
      pathRewrite: {
        "^/devApi": ""
      }
    }))
    <!-- app.use(proxy("/manage/api",{
      target: "http://admintest.happymmall.com:7000",
      changeOrigin: true
    })) -->
  }
  ```
### 配置环境变量
在根目录新建文件：`.env.development`  `.env.production`  `.env.test`
在文件里面配置对应的环境变量存地址：变量名要以`REACT_APP_`开头
通过`process.env.NODE_ENV`来读取当前所处的环境
通过`process.env.REACT_APP_API`来读取当前所处环境所对应的地址
为了区分打包后的测试环境和生产环境，还需要借助dotenv来区分：
安装`yarn add dotenv-cli`
修改package.json文件中的scripts指定环境：
`"build:dev": "dotenv -e .env.development react-app-rewired build",`
`"build:pro": "dotenv -e .env.production react-app-rewired build",`
`"build:test": "dotenv -e .env.test react-app-rewired build",`

### 密码加密
安装：`yarn add crypto-js`
使用：
```
import CryptoJs from 'crypto-js';
// password = '123456';
// md5加密
const pwd = CryptoJs.MD5(password).toString();
// SHA1
let pwd = CryptoJS.SHA1(password).toString();
// AES加密 第一个参数为需要加密的内容，第二个参数为秘钥 
const secretKey = '_zefdsuh123';
let pwd = CryptoJS.AES.encrypt(password, secretKey).toString();
```
### 配置alias
在webpack.config.js中加上：
```
alias: {
        '@': path.resolve('src'),
```