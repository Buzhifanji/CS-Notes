## 脚手架

1.

2. 使用demo

2.1 创建自己的脚手架

2.2 在项目中创建特定类型的脚手架

3.原理

4.从零开始一个脚手架

## 脚手架的作用

    自动创建项目基础结构、提供项目规范和约定
-   相同的组装结构
-   相同的开发范式
-   相同的模块依赖
-   相同的工具配置
-   相同的基础代码

## 常用的架手架
vue => vue-cli 为自身服务
yeoman   通用型
plop  特定类型，例如创建一个组件/模块所需要的文件

## 通用架手架工具剖析

### yeoman
1. yarn globel add yo // 全局范围安装yo
2. yarn global add generator-node // 安装对应的generator
3. yo node // 通过 yo 运行generator

#### sub generator
1. yo node:cli
2. overwrite => yes
3. yarn link(链接到全局)
4. 尝试运行 yomam --help (注意 yoman 是项目名称)
5. 如果 报错 zsh: permission denied: yoman，则意味着文件权限不够
6. 找到 yoman/lib/cli.js 在终端打开这个文件，并运行 chmod 755 cli.js
7. 再次运行 yomam --help

### yeoman 使用步骤总结
1. 明确你的需求
2. 找到合适的generator (https://yeoman.io/generators/)
3. 在全局范围安装找到的 generator
4. 通过 yo 运行对应的 generator
5. 通过命令交互填写选项
6. 生成你所需要的项目结构

### 自定义 generator


## 开发一款教手架