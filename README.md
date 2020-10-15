### 功能

1.登录、注册 2.登录保存 token 于 session 中 3.配置接口跨域，封装 axios 请求 4.配置环境变量 5.密码加密 6.根据路由表生成侧边栏

### 学习文档

- reactrouter:https://reactrouter.com/web/guides/quick-start
- redux: https://www.redux.org.cn/docs/advanced/UsageWithReactRouter.html
- react App 中文文档：https://www.html.cn/create-react-app/docs/adding-custom-environment-variables/

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

### react 中函数定义方式

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

1.安装依赖：`yarn add http-proxy-middleware` 2.修改路径
修改 config/path.js
proxySetup 路径 3.新建文件夹
src/目录新建 setupProxy.js

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

在根目录新建文件：`.env.development` `.env.production` `.env.test`
在文件里面配置对应的环境变量存地址：变量名要以`REACT_APP_`开头
通过`process.env.NODE_ENV`来读取当前所处的环境
通过`process.env.REACT_APP_API`来读取当前所处环境所对应的地址
为了区分打包后的测试环境和生产环境，还需要借助 dotenv 来区分：
安装`yarn add dotenv-cli`
修改 package.json 文件中的 scripts 指定环境：
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

### 配置 alias

在 webpack.config.js 中加上：

```
alias: {
        '@': path.resolve('src'),
```

### 组件封装

#### 封装 form 组件：

- form 组件只做 ui 展示，不做任何请求操作
- 需要向 form 组件传参：
- `formItem`（必传）用于构造表单元素，目前只有`Input Select InputNumber Radio TextArea`几种类型，如有需要，请自行添加
- `formLayout`（可传可不传）用于表单的布局，主要是标签和内容框的宽度布局
- `formConfig`（可传可不传）里面包含一些表单的配置，比如表单最终的提交按钮上面的文字，有些是编辑，有些是搜索，默认情况是确认；还有表单整体布局，是`Horizontal或Vertical还是Inline`
- 可以根据自己的需要来扩展
- 封装组件的原则就是可复用性，避免重复（主要还是按照自己的需求来设计，每个人设计的都不同，不一定非要一样）

### redux

- redux 是一个独立专门用于做状态管理的 JS 库，不是 react 插件库，redux 默认是不能进行异步处理的，作用：管理 react 应用中多个组件共享的状态
- （1）英文文档：https://redux.js.org
- （2）中文文档：http://www.redux.org.cn/

#### redux 的 4 大核心

- `Store`：类似于数据存储仓库，存储 State 应用的所有状态数据,整个应用只能有一个 Store,redux 提供 createStore 这个函数，用来生成 Store
  -----`import { createStore } from 'redux';const store = createStore();`；
- `State`:`可以通过store.getState()拿到`state 是只读的，唯一改变 state 的方法就是触发 action；
- `Action`：是事件，应用某个模块请求动作或操作，通过分发 Action 事件（带 type 属性的对象）执行 Reducer 来修改 Store 里的 state,Action 可以携带数据对象，就是告诉 Reducer 要更新 store 里面的 state----`const action = {type: 'ADD_TODO',payload: 'Learn Redux'};`；
- `Reducer`：是在收到分发的 Action 事件后，经过 reducer 处理后，会返回新的状态数据，Reducer 接收两个参数：原始的 state 和 Action,返回一个新的 state
- Store 提供了三个方法:`store.getState()`,`store.dispatch()`,`store.subscribe()`

#### redux 的使用

- （1）安装：`npm i --save redux`
- （2）使用：src/新建 store 文件夹/新建 index.js：

```
import { createStore,combineReducers } from "redux";

//Reducer,reducer可以根据模块来切分，然后使用combineReducers合并为一个reducer对象
const counter = function(state=0,action){
  switch(action.type){
    case "INCREMENT":
      return state+1;//Reducer 函数里面不能改变 State，必须返回一个全新的对象
    case "DECREMENT":
      return state -1;
    default:
      return state
  }
}

const store = createStore(counter);//所有的东西都拿给store进行统一管理，以后每当store.dispatch发送过来一个新的 Action，就会自动调用 Reducer，得到新的 State

export default store;
```

- （3）在 src/index.js 下引入：`import store from "./store";`

### react-redux

- 安装：`npm i --save react-redux`
- 一个 react 插件库，专门用来简化 react 应用中使用 redux,react-redux 将所有组件分成两大类：UI 组件和容器组件
  - UI 组件
    （1）只负责 UI 的呈现，不带有任何业务逻辑
    （2）通过 props 接收数据（一般数据和函数）
    （3）不使用任何 redux 的 API
    （4）一般保存在 components 文件夹下
    （5）没有状态（即不使用 this.state 这个变量）
  - 容器组件
    （1）负责管理数据和业务逻辑，不负责 UI 的呈现
    （2）使用 Redux 的 API
    （3）一般保存在 containers 文件夹下
    （4）容器组件仅仅做数据提取，然后渲染对应的子组件
    （5）带有内部状态
- `Provider`：让所有组件都可以得到 state 数据，是顶层组件的作用，将 store 作为上下文提供给全局共享

```

  <Provider store={store}>
    <App />
  </Provider>
```

- `connect`:连接组件和 redux,用于包装 UI 组件生成容器组件
  ```
  import {connect} from "react-redux"

  const mapStateToProps = (state) => {
     return {username:state.userReducer.username};//需要什么就取什么，不能多取，对性能不好，一定要返回对象形式
  };
  const mapDispatchToProps = (dispatch) => {
    return {//一定要返回对象形式
      onClick: (argument) => {
        dispatch({type: "SAVE_USERINFO",payload: argument})
      },
    };
  };
  connect(
    mapStateToProps,//如果不需要redux中的state映射到本页面，这里可以直接传null
    mapDispatchToProps//如果不需要redux中的action映射到本页面，这里可以直接传null
  )(Counter)
  ```
  然后在本页面直接调用：`this.props.username,  this.props.onClick(arguments)`
- `mapStateToProps()`
  尽量取最小范围的值，不要取不需要的属性，对性能有一定的消耗
  将外部的数据（即 state 对象）转换为 UI 组件的标签属性

```
const mapStateToProps = function(state){
  return {
    value:state
  }
}
```

- `mapDispatchToProps`:
  将分发 action 的函数转换为 UI 组件的标签属性
  简洁的语法可以直接指定为 actions 对象或包含多个 action 方法的对象
  在组件内可以用 this.props 解构

### redux 和 react-redux

- react-redux 不能单独使用 需要配合 redux 一起使用
- react-redux 主要由 2 部分组成 `Provider` `connect`
- Provider 中必须有一个属性 store 值为 store 原理是用了 context 跨组件传值
- connect:高阶组件 第一个函数中有 2 个参数(函数必须返回一个对象) mapStateToProps mapDispatchToProps

### 使用 chrome redux 调试插件

- 项目中安装:`npm install redux-devtools-extension --save-dev`
- 浏览器下载安装扩展程序：`redux-devtools`
- 安装成功后，还需要 redux-devtools 在项目中的配置，实际上就是在创建 store 的时候把 redux-devtools 安装即可。
```
import { composeWithDevTools } from "redux-devtools-extension";
const store = createStore(allReducer, composeWithDevTools());
```
这样就可以打开控制台调试查看redux