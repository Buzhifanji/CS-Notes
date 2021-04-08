- [1. 函数式编程](#1-函数式编程)
  - [1.1. 纯函数](#11-纯函数)
    - [纯函数好处](#纯函数好处)
  - [1.2 副作用](#12-副作用)
  - [1.3 柯里化](#13-柯里化)

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