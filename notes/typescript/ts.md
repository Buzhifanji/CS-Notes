
- [类型系统](#类型系统)
- [ts 快速上手（编译指定文件）](#ts-快速上手编译指定文件)
- [ts配置文件（项目配置）](#ts配置文件项目配置)
## 类型系统

- 强类型与弱类型（类型安全）

    强类型：语言层面限制函数的实参类型必须与形参类型相同（不允许随意的隐式类型转换）

    弱类型：不限制（允许）


- 静态类型与动态类型（类型检查）

    静态类型：一个变量声明时它的类型就是明确的，声明过后，它的类型就不允许再修改

    动态类型：运行阶段才能够明确变量类型，而且变量的类型随时可以改变

## ts 快速上手（编译指定文件）

1. 初始化项目：yarn init --yes
2. 按照ts到本地：yarn add typescript --dev
   
   成功后就可以使用tsc命令编译ts代码了

   ![tsc](https://github.com/Buzhifanji/CS-Notes/blob/main/assets/typescript/image/tsc.png)

3. 编译ts代码：yarn tsc ./src/start.ts

   ![tsc](https://github.com/Buzhifanji/CS-Notes/blob/main/assets/typescript/image/ts-start.png)

   编译成功后同级目录下会得到一个同名的js文件：start.js    

tsc 编译ts代码：检查类型是否异常 => 移除类型扩展的语法，并且自动转换ESAMScript新特性
## ts配置文件（项目配置）

执行目录：yarn tsc --init

然后会生成tsconfig.json, 更改配置

![tsconfig](https://github.com/Buzhifanji/CS-Notes/blob/main/assets/typescript/image/ts-config-json.png)

执行编译命令：yarn tsc ，编译后的代码都统一放到dist目录下了
![tsconfig](https://github.com/Buzhifanji/CS-Notes/blob/main/assets/typescript/image/tsc-success-start.png)