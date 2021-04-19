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

1. 