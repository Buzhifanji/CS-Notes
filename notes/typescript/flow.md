# Flow

JavaScript的类型检查器

## 快速上手
- [Flow](#flow)
  - [快速上手](#快速上手)
  - [编译移除注解](#编译移除注解)
  - [Flow 开发工具插件](#flow-开发工具插件)
  - [Flow 类型推断](#flow-类型推断)
  - [Flow 类型注解](#flow-类型注解)
  - [Flow 常用类型](#flow-常用类型)
    - [Flow 原始类型](#flow-原始类型)
    - [Flow 数组类型](#flow-数组类型)
    - [Flow 对象类型](#flow-对象类型)
    - [特殊类型](#特殊类型)

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

## Flow 开发工具插件

  vscode中安装插件: flow language support 
  官网插件地址：https://flow.org/en/docs/editors

## Flow 类型推断

```js
  /**
   * 类型推断
   * @flow
   */

  function square(n) {
      return n * n
  }

  // Cannot perform arithmetic operation because  string [1] is not a number.Flow(unsafe-addition)
  square('100') 

  // 代码层面会自动推导出 参数n 是number 类型
  // 不建议在实际代码层面使用，建议直接加上类型注解
```

## Flow 类型注解

```js
  /**
   * 类型注解
   * @flow
   */

  // 函数参数类型
  function square(n: number) {
      return n * n
  }

  // 变量类型
  let num: number = 100

  // 返回值类型
  function foo(): number {
      return 100
  }

  // 无返回值类型
  function bar(): void {
      console.log('bar')
  }
```

## Flow 常用类型
### Flow 原始类型

```js
  /**
   * 原始类型
   * @flow
   */

  const a: string = 'foo';

  const b: number = Infinity; // NaN // 100

  const c: boolean = false; // true

  const d: null = null;

  // void 表示 undefined
  const e: void = undefined;

  const f: symbol = Symbol();
```

### Flow 数组类型

```js
  /**
   * 数组类型
   * @flow
   */

  // 泛型
  const arr1: Array<number> = [ 1, 2 ];

  const arr2: number[] = [ 1, 2, 3 ];

  // 元组 (数组长度固定)
  // 使用场景：函数有多个返回值
  const foo: [String, number] = [ 'foo', 100 ];
```

### Flow 对象类型

```js
  /**
   * 数组类型
   * @flow
   */

  const obj = { foo: string, bar: number } = {foo: 'string', bar: 100}

  // 可选属性
  const obj = { foo?: string, bar: number } = { bar: 100 }

  // 键值对集合属性
  const obj3 = { [string]: string } = {}
  obj3.key1 = 'value1'
  obj3.key2 = 'value2'
```

### 特殊类型

```js
  /**
   * 特殊类型
   * @flow
   */

  // 字面量类型
  const a: 'foo' = 'foo';

  // 字面量类型不会直接使用，而是配合 联合用法 使用
  const type: 'success' | 'warning' | 'danger' = 'success';

  // 利用 type 关键词 声明别名
  type StringOrNumber = string | Number;
  const b: StringOrNumber = 'string'; // 100

  // maybe 类型
  const gender: ?number = undefined;
  // 相当于
  const gender: number | null | void = undefined;

```

```js
  /**
   * Mixed Any
   * @flow
   */

  // string / number / boolean / ...
  function passMixed(value: mixed) {
    // 需要添加类型判断，否则语法层面会直接报错
    if (typeof value === 'string') {
      value.substr(1);
    }
    if (typeof value === 'number') {
      value * value;
    }
  }
  passMixed('string');
  passMixed(100);

  function passAny(value: any) {
    // 语法层面不会报错，不需要添加类型判断
    value.substr(1);
    value * value;
  }
  passAny('string');
  passAny(100);

  // 区别：any是弱类型，mixed是强类型
  // 建议：项目中尽量使用mixed, any存在的意义是兼容以前的老代码，比如一些使用js了弱类型的特性的代码

```

flow类型 官方文档地址：https://flow.org/en/docs/types/

flow类型手册：https://www.saltycrane.com/cheat-sheets/flow-type/latest