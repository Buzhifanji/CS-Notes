前端扩展知识系列自动构建工具之——npm script

npm script 是实现自动化构建工作流的最简单方式

本文以sass为例子，带你实现一个简单npm script自动构建工具



首先们按照如图建立文件

![image-20210720201950995](/Users/huangbin/Library/Application Support/typora-user-images/image-20210720201950995.png)

修改index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="css/style.css">	// 此处引入编译后的css代码
</head>
<body>
   <h1>hello</h1>
   <p>npm script</p>
</body>
</html>
```

修改main.scss

```scss
$body-bg: #f8f9fb;
$body-color: rgb(79, 77, 77);

body {
    margin: 0 auto;
    padding: 20px;
    max-width: 80px;
    background-color: $body-bg;
    color: $body-color;
}
```

安装sass： yarn add sass --dev

建立依赖后，我们在终端执行：**node node_modules/.bin/sass scss/main.scss css/style.css**

这时我们手动把scss代码编译成css代码

![image-20210720203400225](/Users/huangbin/Library/Application Support/typora-user-images/image-20210720203400225.png)

这种方式很粗暴，每次编译需要敲的命令太长了，接下来我们对此进行修改

```json
{
  "name": "npm-script-demo",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "build": "node node_modules/.bin/sass scss/main.scss css/style.css" // 添加这个命令
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "sass": "^1.35.2"
  }
}

```

在终端执行 yarn build 我们也可以编译scss代码了。



  *<!-- node node_modules/.bin/sass scss/main.scss css/style.css -->*

​    *<!-- npm script 实现自动化构建工作流的最简单方式 -->*

