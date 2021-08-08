## 模块化
先如今模块化在前端已经标准化，在浏览器中采用ES Module，而在Node环境中会采用CommonJS。所以我们掌握这两种标准，就能掌握前端的模块化



通过 script 添加 type = module 的属性，就可以 ES Module 的标准执行其中的 JS 代码

特性

1.ESM 自动采用严格模式，忽略 'use stict'，模块化中的this是undefined

2.每个 ES Module 都是运行在单独的私有作用域中（解决了使用变量会造成全局污染问题）

3.ESM 是通过 CORS 的方式请求外部 JS 模块的,如果请求的地址不在同源

4.ESM 的script 标签会延迟执行,相当于给script标签添加了defer属性