- [1. 函数式编程](#1-函数式编程)
  - [1.1. 纯函数](#11-纯函数)
    - [纯函数好处](#纯函数好处)
  - [1.2 副作用](#12-副作用)
    - [1.2.1 函子(Functor)](#121-函子functor)
      - [MayBe 函子](#maybe-函子)
      - [Either 函子](#either-函子)
  - [1.3 柯里化](#13-柯里化)
  - [1.4 函数组合](#14-函数组合)

# 1. 函数式编程

## 1.1. 纯函数

    相同的输入得到相同的输出，而且没有任何可观察的副作用

  纯函数例子
  
```javascript
  const array = [1, 2, 3, 4, 5]
  console.log(array.slice(0, 3))
  console.log(array.slice(0, 3))
  console.log(array.slice(0, 3))
  // 执行三次得到相同结果
```
  不纯函数例子

```javascript
  const array = [1, 2, 3, 4, 5]
  console.log(array.splice(0, 3))
  console.log(array.splice(0, 3))
  console.log(array.splice(0, 3))
  // 执行三次得到不同结果
```

### 纯函数好处

- **可缓存**:因为纯函数对相同的输入始终都有相同的输出,所以它的结果可以通过闭包被缓存下来(记忆函数)

  实现一个记忆函数
  ```javascript
    function getArea (r) {
      console.log(r);
      return Math.PI * r * r
    }
    function memoize(fn) {
      // 记忆对象
      const cache = {}
      // 闭包函数
      return function() {
        const key = JSON.stringify(arguments)
        //是否有缓存,有就直接取缓存,没有就重新计算.
        cache[key] = cache[key] || fn.apply(fn, arguments)
        return cache[key]
      }
    }
    // 测试
    let memoizeFun = memoize(getArea)
    console.log(memoizeFun(4));
    console.log(memoizeFun(4));
  ```
- **可测试** 纯函数让测试更方便(因为纯函数始终有输入和输出,而单元测试就是在断言这个结果
- **并行处理** (web worker):在多线程环境下并行操作共享的内存数据很可能会出现意外情况. 纯函数不需要访问共享的内存数据,所以在并行环境下可以任意运行纯函数
  
## 1.2 副作用

```javascript
  // 不纯的
  let mini = 18
  function checkAge(age) {
    // 依赖于外部变量 mini，当mini发生变化时候，相同输入不一定会得到相同输出
    return age >= mini
  }
```
如果函数依赖于外部的状态就无法保证输出相同，就会带来副作用，副作用会让函数不纯

副作用来源:配置文件、数据库、获取用户输入。。。（所有与外部交互都有可能带来副作用）

副作用不可能完全禁止，尽可能控制它们在可控范围内发生

### 1.2.1 函子(Functor)

容器：包含值和值得变形关系（这个变形关系就是函数）

函子：是一个特殊的容器，通过一个普通的对象来实现，该对象具有map方法，map方法可以运行一个函数对值进行处理（变形关系）

```javascript
  // Functor 函子
  class Container {
      // 封装 实例化 Container
    static of(value) {
      return new Container(value);
    }
    constructor(value) {
      this._value = value;
    }
      // 契约对象
    map(fn) {
          /**
           * fn是个回调函数（纯函数）
           * 把fn处理的值，作为实例化 Container 的参数
           */
      return Container.of(fn(this._value));
    }
  }

  let result = Container.of(5).map((x) => x + 2).map((x) => x * x);
  console.log(result);
```
#### MayBe 函子

作用：对外部的空值情况做处理（空值副作用在允许范围内）

```javascript
  // MayBe 函子
  class MayBe {
    static of(value) {
      return new MayBe(value);
    }
    constructor(value) {
      this._value = value;
    }
    map(fn) {
      return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
    }
    isNothing() {
      return this._value === null || this._value === undefined;
    }
  }

  let result = MayBe.of(null).map((x) => x.toUpperCase());
  console.log(result);
```
#### Either 函子

Either 两者中的任何一个，类似于if...else...的处理

异常会让函数变得不纯，Either函子可以用来做异常处理

```javascript
  // Either 函子
  class Left {
    static of(value) {
      return new Left(value);
    }
    constructor(value) {
      this._value = value;
    }
    map(fn) {
      return this;
    }
  }

  class Right {
    static of(value) {
      return new Right(value);
    }
    constructor(value) {
      this._value = value;
    }
    map(fn) {
      return Right.of(fn(this._value));
    }
  }
  // test
  function parseJSON(str) {
    try {
      return Right.of(JSON.parse(str));
    } catch (e) {
      // 存错错误信息
      return Left.of({ error: e.message });
    }
  }

  let result3 = parseJSON('{name: zs}');
  let result4 = parseJSON('{ "name": "zs" }');
  console.log(result3);
  console.log(result4);
```


## 1.3 柯里化

调用一个函数只传递部分参数(**这部分参数永远不变**),然后返回一个新的函数并接收剩余的参数并返回结果

```javascript
  // 柯里化简单例子
  function checkAge(min) {
    return function(age) {
      return age >= min
    }
  }
  // 只传部分参数
  const age18 = checkAge(18);
  //接收剩余的参数
  console.log(age18(22));
  console.log(age18(55));
  console.log(age18(17));
```
 模拟lodash中的柯里化

    关键点：实参等于形参的个数时，才执行函数，否则缓存参数

 ```javascript
  function curry(fn) {
    return function curriedFn(...args) {
      // 判断实参和形参的个数
      // Function.length length 属性指明函数的形参个数
      if (args.length < fn.length) {
        return function() {
          // 缓存参数
          curriedFn(...args.concat(Array.from(arguments)))
        }
      }
      return fn(...args)
    }
  }

  // 测试
  function getSum(a, b, c) {
    rerturn a + b + c
  }

  const curried = curry(getSum)
  console.log(curryFun(1,2,3));
  console.log(curryFun(1,2)(3));
  console.log(curryFun(1)(2,3));
```

## 1.4 函数组合

    如果一个函数要经过对个函数处理才能得到最终的值,这个时候可以把中间过程的函数合并成一个函数

    函数就是数据的管道,把多个管道连接起来,让数据穿过形成最终的结果

    函数组合默认是从右到左执行,每一个函数接收一个参数并且返回相应的结果
  
```javascript
  function compose(...args) {
    return function(value) {
      // 先翻转数组，然后通过reduce依次执行函数
      return args.reverse().reduce(function(acc, fn) {
        return fn(acc)
      }, value)
    }
  }
  // 箭头函数写法
  const compose_arrow = (...args) => value => args.reverse().reduce((acc, fn) => fn(acc), value)

  // 测试
  const reverse = (arr)=>arr.reverse();
  const first = (arr)=>arr[0];
  const test1 = compose(first,reverse)
  const test2 = compose_arrow(first,reverse)
  console.log(test1([1,5,6,4,8,6,'dsadasdsd']));
  console.log(test2([1,5,6,4,8,6,'dsadasdsd']));
```