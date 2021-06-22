- [类型系统](#类型系统)
- [ts 快速上手（编译指定文件）](#ts-快速上手编译指定文件)
- [ts配置文件（项目配置）](#ts配置文件项目配置)
- [ts 显示中中文的错误消息](#ts-显示中中文的错误消息)
- [ts 作用域问题](#ts-作用域问题)
- [ts 类型](#ts-类型)
  - [Object类型](#object类型)
  - [原始类型](#原始类型)
  - [数组类型](#数组类型)
  - [枚举类型](#枚举类型)
  - [ts函数类型](#ts函数类型)
  - [任意类型](#任意类型)
  - [类型断言](#类型断言)
  - [接口](#接口)
- [ts 类](#ts-类)
  - [基本使用](#基本使用)
  - [类的访问修饰符](#类的访问修饰符)
  - [类与接口](#类与接口)
  - [抽象类](#抽象类)
- [泛型](#泛型)

## 前置知识

### 类型系统

- 强类型与弱类型（类型安全）

  强类型：语言层面限制函数的实参类型必须与形参类型相同（不允许随意的隐式类型转换）

  弱类型：不限制（允许）


- 静态类型与动态类型（类型检查）

  静态类型：一个变量声明时它的类型就是明确的，声明过后，它的类型就不允许再修改

  动态类型：运行阶段才能够明确变量类型，而且变量的类型随时可以改变

### 字面量

​	在计算机科学中，字面量用于在源代码中表示某个固定值

​	在JavaScript程序中，字面量不是变量，它是直接给出的固定值

### 可计算属性名

​	可计算属性名是指在定义对象字面量属性时使用表达式作为属性名，适用于对象属性名需要动态计算的场景之中。

**例子**

```js
let obj = {
  ['h' + 'ello']() {
    return 'hi'
  }
}
obj.hello() // hi
```



​	详细说明参考[对象的扩展 - ECMAScript 6入门 (ruanyifeng.com)](https://es6.ruanyifeng.com/#docs/object#属性名表达式)属性名表达式方法二



## ts资料

- [网页版的TypeScript编辑器](https://www.typescriptlang.org/play)
- [官网](https://www.typescriptlang.org)

## ts的语言概述

### 注释

#### 单行注释

**语法**

​	使用双斜线“//”来表示，并且不允许换行

**例子**

```ty
// 变量
const a = 'a'
```

#### 多行注释

**语法**

​	以“/*”符号作为开始并以“*/”符号作为结束，可以换行

**例子**

```typescript
/*
*多行注释
*/

```

​	注意：*在Visual Studio Code中当将鼠标悬停在标识符上时，只有多行注释中的内容会显示在提示框中，单行注释中的内容不会显示在提示框中*

#### 区域注释

**语法**

```typescript
//#region 区域描述

let x = 0

//#endregion
```

​	用途： 折叠代码

​	注意：区域注释不是一种新的注释语法，它借助单行注释的语法实现了定义代码折叠区域的功能

### 数据类型

#### 原型数据类型

- Undefined

- Null

- Boolean

- String

  JavaScript使用UTF-16编码来表示一个字符。UTF-16编码以两个字节作为一个编码单元，每个字符使用**一个编码单元或者两个编码单元**来表示。

  在底层存储中，字符串是由零个或多个16位无符号整数构成的有序序列。

  ECMAScript 2015规定了字符串允许的最大长度为2^53 - 1:[js字符串最多存储多少字节？ - 贺师俊的回答 - 知乎](https://www.zhihu.com/question/61105131/answer/184466677)

  注意：*若字符串中包含需要使用两个编码单元表示的字符，那么获取字符串长度的结果可能不符合预期。*

- Number

  JavaScript使用双精度64位浮点数格式（IEEE 754）来表示数字，因此所有数字本质上都是[浮点数]([JavaScript中最大的数有多大 | yoko blog (pengrl.com)](https://pengrl.com/p/20040/))。在该格式中，符号部分占用1位（bit），指数部分占用11位，小数部分占用52位，一共占用64位

  JS最大数值：2^53 - 1，即9007199254740991。JS中定义了一个常量`Number.MAX_SAFE_INTEGER`，它的值就是`9007199254740991`。

  注意：*超过2^53 - 1这个数值就会丢失*

- Symbol

- BigInt

  BigInt类型能够表示任意精度的整数，尤其是大于253 - 1的整数

  **创建**

  ```typescript
  // 使用BigInt字面量
  const unit1 = 1n;
  
  // 使用BigInt()函数
  const unit2 = BigInt(1) // 1n
  ```

  注意：在进行严格相等比较时，BigInt类型的值与Number类型的值永远不相等。

  ​		   在进行非严格相等比较及大小关系比较时，BigInt类型的值与Number类型的值将进行数学意义上的比较。

  ​			BigInt类型的值不允许与Number类型的值一起进行混合数学运算

  

#### 非原始数据类型

- Object

  对象属性有两种形式

  - **数据属性**。可以为Undefined、Null、Boolean、String、Number、Symbol和Object类型的值
  - **存取器属性**。由一个或两个存取器方法构成，用于获取和设置Undefined、Null、Boolean、String、Number、Symbol和Object类型的值

### 对象

#### 对象字面量

​	对象字面量也叫作对象初始化器，是最常用的创建对象的方法

##### 数据属性

​	对象字面量的数据属性由属性名和属性值组成

**语法**

```typescript
{
  PropertyName: PropertypValue,
}
```

**例子**

```typescript
const obj = {
  name: 'hello'
}
```

##### 存取器属性

​	一个存取器属性由一个或两个存取器方法组成，存取器方法分为get方法和set方法两种

**语法**

```typescript
{
  get PropertyName() {
    return PropertyValue;
  }
  set PropertyName(value) {} 
}
```

**例子**

```js
const obj = {
  get name() {
    return 'hello'
  },
  set name(value) {
    return vavlue
  }
}
```



##### 可计算属性名

**语法**

```typescript
{
  [PropertyExpresssion]: PropertyValue,
    get [PropertyExpression]() {
    return PropertyValue
  },
    set [PropertyExpression](value) { }
}
```

**例子**

```typescript
const obj = {
  ['he' + 'llo']() {
    return 'hi'
  }
}
```



### 可选链运算符

**语法**

```typescript
// 可选的静态属性访问
obj?.prop

// 可选的计算属性访问
obj?.[expr]

// 可选的函数调用或方法调用
fn?.()
```







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

## ts 显示中中文的错误消息

    yarn tsc --locale zh_CN
    
    vscode编辑显示中文错误消息：在设置搜索 TypeScript: Locale, 更改设置为： zh_CN
    
    不建议这么做，不利于谷歌搜索错误信息

## ts 作用域问题

    在文件加上 export {}, 让文件中的代码变成模块

## ts 类型

### Object类型

Object 类型 并不单只 对象类型，而是除了原始类型外的其他类型

例如：

```ts
const foo: Object = function() {}
```

### 原始类型

```ts
/**
 * 原始类型
 */
const a: string = 'string'

const b: number = 100

const c: boolean = true

// 不是严格模式 以上三种类型可以设置为 null，反之不允许
// 关闭严格模式 tsconfig.json 中设置 strict：false

// 不是严格模式 const e: void = null，反之不允许
const e: void = undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol();

```

### 数组类型

```ts
// 数组类型

// 泛型
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]

// 元组 (数组长度固定)
// 使用场景：函数有多个返回值
const tuple: [number, string] = [12, 'zcw]
```

### 枚举类型

- 数字枚举

```ts
// 指定枚举值
enum DerectionStatus {
    Up = 1,
    Down = 2,
}

// 不指定枚举值
enum PostStatus {
    Darft,  // 0
    Published, // 1
}
```

- 字符枚举

```ts
// 指定枚举值
enum StringStatus {
    Up = 'up',
    Down = 'down',
}
```

- 常量枚举

```ts
const enum DerectionStatus {
    Up = 1,
    Down = 2,
} 
```

常量枚举与枚举的区别

枚举：是一个双向键值对（可以通过值获取值，也可以通过值获取建），会入侵编译后的js代码
常量枚举：只能通过建获取值

通过编译后的js进行对比

```js
// 枚举enum DerectionStatus {    Up = 1,    Down = 2,}// 编译后var DerectionStatus;(function (DerectionStatus) {    DerectionStatus[DerectionStatus["Up"] = 1] = "Up";    DerectionStatus[DerectionStatus["Down"] = 2] = "Down";})(DerectionStatus || (DerectionStatus = {}));// 常量枚举const enum constEnum {    Up = 1,    Down = 2,}const aa: number = constEnum.Up// 编译后const aa = 1 /* Up */;
```

**如果不需要通过索引获取键值，建议用常量枚举**

### ts函数类型

- 函数声明式

```ts
function sum(a: number, b: number, ...rest: number): string {    return 'ok'}
```

- 函数表达式

```ts
const fn: (a: number, b: number) => string = function(a: number, b: number): string {    return 'ok'}
```

### 任意类型

```ts
function stringify(value: any) {    return JSON.stringify(value)}let foo: any = 'string'
```

// 建立避免使用 any 类型，any类型是不安全

### 类型断言

告诉ts 这个类型我明确知道是什么类型

```ts
const num: number[] = [110, 90, 119, 112]const res = num.find(i => i > 0)const num1 = res as number  // 建议使用const num2 = <number>res  // JSX 下不兼容
```

### 接口

```ts
interface Post {    title: string;    content: string;    subtitle?: string; // 可选成员    readonly sumary: string; // 只读成员}const hello: Post = {    title: 'hello ts',    content: 'a js',    sumary: 'b js',}// 动态成员interface CacheType {    [key: string]: string}const cache: CacheType = {    foo: '1',    too: '2',}
```

## ts 类

### 基本使用

```ts
class Person {    name: string    age: number    constructor(name: string, age: number) {        this.name = name        this.age = age    }    sayHi(msg: string): void {        console.log(`I am ${msg}`)    }}
```

### 类的访问修饰符

```ts 
class Person {    public name: string // 公共的    private age: number // 私有的，只能类内部自己能访问    protected gender: boolean;  // 受保护的    private readonly show: boolean; // 只读成员    constructor(name: string, age: number) {        this.name = name        this.age = age        this.gender = true        this.show = true    }    sayHi(msg: string): void {        console.log(`I am ${msg}`)        console.log(this.age)        console.log(this.gender)    }}const tom = new Person('tom', 18)console.log(tom.name) // 访问成功// console.log(tom.age)  // 访问失败// console.log(tom.gender) // 访问失败// 子类继承父类class Student extends Person {    // 私有的构造函数，只能通过静态方法实例化    private constructor(name: string, age: number) {        super(name, age)        console.log(tom.gender) // 访问成功    }    static create(name: string, age: number) {        return new Student(name, age)    }}const jack = Student.create('jack', 19)
```

public, protected,private 的区别：访问范围不同

    public： 类自己，子类，实例都可以访问protected： 类自己，子类可以访问，实例不行private： 只能类自己访问

### 类与接口

```ts
// 接口对类进行抽象，不包含具体实现// 尽量让接口简单，一个接口约束一个能力interface Eat() {    eat(food: string): void}interface Run() {    run(distance: number): void}// 类实现接口class Person implements Eat, Run {    eat(foods: string): void {        console.log(`吃的美食：${foods}`)    }    run(distance: number): void {        console.log(`直立行走：${distance}`)    }}// 类实现接口class Animal implements Eat, Run {    eat(foods: string): void {        console.log(`大口大口的吃：${foods}`)    }    run(distance: number): void {        console.log(`爬行：${distance}`)    }}
```

### 抽象类 

与类的接口类似，都可以约束子类必须要有的成员，不同之处，**抽象类可以包含具体实现，但接口不行**

```ts
// 抽象类// 抽象不能实例，只能被子类继承abstract class Animal {    eat(foods: string): void {        console.log(`大口大口的吃：${foods}`)    }    // 抽象方法    abstract run(distance: number): void}class Dog extends Animal {    run(distance: number): void {        console.log(`爬行：${distance}`)    }}
```

## 泛型

声明的时候不指定类型，调用的时候传入指定类型

```ts
function createArray<T>(...args: T[]): T[] {  return args;}console.log(createArray<number>(1, 2, 3));console.log(createArray<string>('jack', 'tom'));
```