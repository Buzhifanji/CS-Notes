# 数据类型

- 基础类型: 存储在**栈内存**，被引用或拷贝时，会创建一个完全相等的变量
  - Undefined
  - Null
  - Boolean
  - String
  - Number
  - BigInt
- 引用类型: 存储在**堆内存**，存储的是地址，多个引用指向同一个地址，这里会涉及一个“共享”的概念
  - Object
  - Array
  - RegExp
  - Date
  - Math
  - Function

## 数据类型检测

- typeof
  
  检测基本数据类型，但 typeof null 为object

  引用数据类型只能检测 Function

- instanceof

  检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上

  可以准确地判断复杂引用数据类型，但是不能正确判断基础数据类型

  原理：
      先用typeof来判断基础数据类型，如果是，直接返回false
      通过Object.getPrototypeOf拿到参数的原型对象，如果参数的原型对象为null返回fasle，如果参数的原型对象全等与目标对象的原型返回true，否则，获取下一个参数的原型对象的哪一个原型，然后执行一样的判断
  
  手写实现 instanceof:

  ```javascript
    function myInstance(left, right) {
      // 过滤基本数据类型
      if (typeof left !== 'object' || left === null) {
        return false;
      }
      // getProtypeOf是Object对象自带的API，能够拿到参数的原型对象
      let proto = Object.getPrototypeOf(left);
      while (true) {
        //循环往下寻找，直到找到相同的原型对象
        if (proto === null) {
          return false;
        }
        if (proto === right.prototype) {
          //找到相同原型对象，返回true
          return true;
        }
        proto = Object.getPrototypeOf(proto);
      }
    }
  ```

- Object.prototype.toString.call()

  返回统一字符串格式为 "[object Xxx]" ，而这里字符串里面的 "Xxx" ，第一个首字母要大写

  ```javascript
    Object.prototype.toString({})       // "[object Object]"

    Object.prototype.toString.call({})  // 同上结果，加上call也ok

    Object.prototype.toString.call(1)    // "[object Number]"

    Object.prototype.toString.call('1')  // "[object String]"

    Object.prototype.toString.call(true)  // "[object Boolean]"

    Object.prototype.toString.call(function(){})  // "[object Function]"

    Object.prototype.toString.call(null)   //"[object Null]"

    Object.prototype.toString.call(undefined) //"[object Undefined]"

    Object.prototype.toString.call(/123/g)    //"[object RegExp]"

    Object.prototype.toString.call(new Date()) //"[object Date]"

    Object.prototype.toString.call([])       //"[object Array]"

    Object.prototype.toString.call(document)  //"[object HTMLDocument]"

    Object.prototype.toString.call(window)   //"[object Window]"

  ```
