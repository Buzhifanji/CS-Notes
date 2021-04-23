
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
// 枚举
enum DerectionStatus {
    Up = 1,
    Down = 2,
}

// 编译后
var DerectionStatus;
(function (DerectionStatus) {
    DerectionStatus[DerectionStatus["Up"] = 1] = "Up";
    DerectionStatus[DerectionStatus["Down"] = 2] = "Down";
})(DerectionStatus || (DerectionStatus = {}));

// 常量枚举
const enum constEnum {
    Up = 1,
    Down = 2,
}
const aa: number = constEnum.Up

// 编译后
const aa = 1 /* Up */;
```

**如果不需要通过索引获取键值，建议用常量枚举**

### ts函数类型

- 函数声明式

```ts
function sum(a: number, b: number, ...rest: number): string {
    return 'ok'
}
```
- 函数表达式

```ts
const fn: (a: number, b: number) => string = function(a: number, b: number): string {
    return 'ok'
}
```

### 任意类型
```ts
function stringify(value: any) {
    return JSON.stringify(value)
}
let foo: any = 'string'
```
// 建立避免使用 any 类型，any类型是不安全

### 类型断言

告诉ts 这个类型我明确知道是什么类型

```ts
const num: number[] = [110, 90, 119, 112]
const res = num.find(i => i > 0)

const num1 = res as number  // 建议使用
const num2 = <number>res  // JSX 下不兼容
```

### 接口
```ts
interface Post {
    title: string;
    content: string;
    subtitle?: string; // 可选成员
    readonly sumary: string; // 只读成员
}
const hello: Post = {
    title: 'hello ts',
    content: 'a js',
    sumary: 'b js',
}

// 动态成员
interface CacheType {
    [key: string]: string
}
const cache: CacheType = {
    foo: '1',
    too: '2',
}
```
## ts 类
### 基本使用
```ts
class Person {
    name: string
    age: number

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
    }
    sayHi(msg: string): void {
        console.log(`I am ${msg}`)
    }
}
```
### 类的访问修饰符
```ts 
class Person {
    public name: string // 公共的
    private age: number // 私有的，只能类内部自己能访问
    protected gender: boolean;  // 受保护的
    private readonly show: boolean; // 只读成员

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
        this.gender = true
        this.show = true
    }
    sayHi(msg: string): void {
        console.log(`I am ${msg}`)
        console.log(this.age)
        console.log(this.gender)
    }
}
const tom = new Person('tom', 18)
console.log(tom.name) // 访问成功
// console.log(tom.age)  // 访问失败
// console.log(tom.gender) // 访问失败

// 子类继承父类
class Student extends Person {
    // 私有的构造函数，只能通过静态方法实例化
    private constructor(name: string, age: number) {
        super(name, age)
        console.log(tom.gender) // 访问成功
    }
    static create(name: string, age: number) {
        return new Student(name, age)
    }
}

const jack = Student.create('jack', 19)
```
public, protected,private 的区别：访问范围不同

    public： 类自己，子类，实例都可以访问

    protected： 类自己，子类可以访问，实例不行

    private： 只能类自己访问

### 类与接口
```ts
// 接口对类进行抽象，不包含具体实现

// 尽量让接口简单，一个接口约束一个能力
interface Eat() {
    eat(food: string): void
}
interface Run() {
    run(distance: number): void
}

// 类实现接口
class Person implements Eat, Run {
    eat(foods: string): void {
        console.log(`吃的美食：${foods}`)
    }
    run(distance: number): void {
        console.log(`直立行走：${distance}`)
    }
}
// 类实现接口
class Animal implements Eat, Run {
    eat(foods: string): void {
        console.log(`大口大口的吃：${foods}`)
    }
    run(distance: number): void {
        console.log(`爬行：${distance}`)
    }
}
```

### 抽象类 

与类的接口类似，都可以约束子类必须要有的成员，不同之处，**抽象类可以包含具体实现，但接口不行**

```ts
// 抽象类
// 抽象不能实例，只能被子类继承
abstract class Animal {
    eat(foods: string): void {
        console.log(`大口大口的吃：${foods}`)
    }
    // 抽象方法
    abstract run(distance: number): void
}
class Dog extends Animal {
    run(distance: number): void {
        console.log(`爬行：${distance}`)
    }
}
```

## 泛型

声明的时候不指定类型，调用的时候传入指定类型

```ts
function createArray<T>(...args: T[]): T[] {
  return args;
}
console.log(createArray<number>(1, 2, 3));
console.log(createArray<string>('jack', 'tom'));

```