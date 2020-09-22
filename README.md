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
