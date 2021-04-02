# 数据拷贝

## 浅拷贝

> 自己创建一个新的对象，来接受你要重新复制或引用的对象值。如果对象属性是基本的数据类型，复制的就是基本类型的值给新对象；
> 但如果属性是引用数据类型，复制的就是内存中的地址，如果其中一个对象改变了这个内存中的地址，肯定会影响到另一个对象。

### oject浅拷贝

- object.assign (用于 JS 对象的合并)

  > object.assign 的语法为：Object.assign(target, ...sources)

  注意点：

  - 它不会拷贝对象的**继承**属性；

  - 它不会拷贝对象的**不可枚举**的属性；

  - 可以拷贝 Symbol 类型的属性。

 理解： **循环遍历原对象的属性，通过复制的方式将其赋值给目标对象的相应属性**

- 扩展运算符方式
  
  > 扩展运算符的语法为：let cloneObj = { ...obj };

  扩展运算符 和 object.assign 有同样的缺陷

### array浅拷贝

- concat (用于合并两个或多个数组)

- slice (用于数组截取)

### 手写浅拷贝

思路：1.对基础类型做一个最基本的一个拷贝。2.对引用类型开辟一个新的存储，并且拷贝一层对象属性。

```javascript
  // 此方法不建议用于生产环境，for in 循环数组效率低
  function shallowClone(target) {
    if (typeof target === 'object' && target !== null) {
      // 引用数据类型
      const cloneTarget = Array.isArray(target) ? [] : {};
      for(let prop in target) {
        cloneTarget[prop] = target[prop]
      }
      return cloneTarget
    } else {
      return target
    }
  }
```

## 深拷贝

> 将一个对象从内存中完整地拷贝出来一份给目标对象，并从堆内存中开辟一个全新的空间存放新对象，且新对象的修改并不会改变原对象，二者实现真正的分离。

实现关键点

1. 针对能够遍历对象的不可枚举属性以及 Symbol 类型，我们可以使用 Reflect.ownKeys 方法；

2. 当参数为 Date、RegExp 类型，则直接生成一个新的实例返回；

3. 利用 Object 的 getOwnPropertyDescriptors 方法可以获得对象的所有属性，以及对应的特性，顺便结合 Object 的 create 方法创建一个新对象，并继承传入原对象的原型链；

4. 利用 WeakMap 类型作为 Hash 表，因为 WeakMap 是弱引用类型，可以有效防止内存泄漏，作为检测循环引用很有帮助，如果存在循环，则引用直接返回 WeakMap 存储的值。

```javascript
  const isComplexDataType = obj => (typeof obj === 'object' || typeof obj === 'function') && (obj !== null)
  function deepClone(obj, hash = new WeakMap()) {
    if (obj.constructor === Date) {
      // 日期对象直接返回一个新的日期对象
      return new Date(obj)
    }
    if (ojb.constructor === RegExp) {
      //正则对象直接返回一个新的正则对象
      return new RegExp(obj)
    }
     //如果循环引用了就用 weakMap 来解决
    if（hash.has(obj)) {
      return has.get(obj)
    }
    //遍历传入参数所有键的特性
    const allDesc = Object.getOwnPropertyDescriptors(obj)
    //继承原型链
    let cloneObj = Object.create(Object.getPrototypeOf(obj), allDesc)
    hash.set(obj, cloneObj)
    for (let key of Reflect.ownKeys(obj)) { 
      cloneObj[key] = (isComplexDataType(obj[key]) && typeof obj[key] !== 'function') ? deepClone(obj[key], hash) : obj[key]
    }
    return cloneObj
  }
```
