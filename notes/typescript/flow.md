# Flow

JavaScript的类型检查器

## 快速上手

1. 初始化项目：yarn init --yes 
2. 按照flow：yarn add flow-bin --dev
3. 关闭vscode JS验证：在设置中搜索 JavaScript Validate，然后设置为禁用
4. 添加flow配置文件： yarn flow init
5. 添加前提：在文件头部添加标记 // @flow 
6. 启动flow检测：yarn flow
7. 结束检测：yarn flow stop

```js
    // @flow

    // 前提：在文件头部添加标记 // @flow
    // :number 类型注解

    function sum(a: number, b: number) {
        return a + b;
    }

    sum(100, 100);
    sum('100', '100');
```

## 编译移除注解

- flow-remove-types 模块
  
  安装：yarn add flow-remove-types --dev
  使用命令： yarn flow-remove-types . -d dist

- babel

  安装：yarn add @babel/core @babel/cli @babel/preset-flow --dev
  新建 .babelrc 文件，并添加 {"presets": ["@babel/preset-flow"]}
  使用命令： yarn babel src -d dist