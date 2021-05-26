# 手把手带你实现一个min版的vue2（1） 数据响应式核心原理



vue2数据响应式核心通过Object.defineProperty()这个API实现的，但这个API实际中开发运用不多，为了应付面试笔者，尝试过死记硬背，但过不了几天就会忘记。没有经过大脑理解的知识，终究就留不下来。这篇文章中，笔记以自己的思考，讲解这个API的用途，以及vue2利用这个API做了什么事情。

## 理解对象的属性类型

在讲述Object.defineProperty这个API之前，我们先来思考一下js 怎么知道对象中某个的属性是否可以更改？

比如我们声明一个变量对象 a，a有name属性，那么怎么知道 这个name属性是否可以更改呢

```js
const a = { name: 'a' }
```

我们可以通过Object.getOwnPropertyDescriptor()获取指定对象上一个自有属性对应的属性描述符

```js
const b = Object.getOwnPropertyDescriptor(a, 'name')
console.log(b) 
// {
// configurable: true
// enumerable: true
// value: "haha"
// writable: true
// __proto__: Object
//}

```

这些属性是内部的，我们并不能看到，也不能直接访问这些特性，因为这些属性是JS实现引擎的规范定义，它们是用来描述属性的特征。如何区分：内部特性会用两个中括号把特性的名称括起来，比如[[Enumerable]]。

其中 writable 就表示这个name属性是否可以修改。

JS对象属性分两种：**数据属性**和**访问器属性**。这两种属性都4个特性描述它们的行为。

- 数据属性

  数据属性是可以直接定义的，前面声明的对象a就是数据属性。我们不管是通过字面量还是new 操作符加上Object构造函数声明的对象都是数据属性。

  - [[Configurable]]： 表示是否可以通过delete删除并重新定义，是否可以修改它的特性，以及是否可以把它改为访问器属性。默认为true

  - [[Enumerable]]：表示是否可以通过for-in循环返回。默认为true

  - [[Writable]]：表示属性的值是否可以被修改。默认为true

  - [[Value]]：包含属性实际的值。默认为undefined

- 访问器属性

  访问器属性不可以直接定义，必须使用Object.defineProperty()

  - [[Configurable]]：与数据属性的一样
  - [[Enumerable]]：同上
  - [[Get]]：获取函数，在读取属性时调用。默认值为undefined。
  -  [[Set]]：设置函数，在写入属性时调用。默认值为undefined。

# Object.defineProperty() #

通过Object.defineProperty()我们可以改变对象的内部属性。

设置属性只读

```js
const c = {name: 'ccc'}
Object.defineProperty(c, 'name',{
  configurable: true,
  enumerable: true,
  writable: false,
})
c.name = 'ddd'
// test
console.log(c.name) // ccc 不可以更改
```

设置对象属性拦截

```js
const obj = { name: 'hh' }
const vm = {}
// 数据劫持
Object.defineProperty(vm, 'name', {
  configurable: true,
  enumerable: true,
  get: () => {	// 读取属性
    return obj.name
  },
  set: (val) => {	// 写入属性
    	if (val === obj.name) {
        return
      }
    	obj.name = val
  }
})
// test 
vm.name = 'a'
console.log(obj) // {name: "a"}
```

上述例子中，把对象vm数据属性设置成访问器属性，当vm的name发生更改时，obj的name也会随之更改。理解了这个后，我们就可以模拟vue中的响应式了。

多属性数据劫持

```js
// 模拟vue的 data选项
const data = {
  name: 'hello',
  count: 10
}
// 模拟 Vue 的实例
const vm = {}
// 把对象中的每个数据属性都改变成访问器属性
function proxyData(data) {
  // 遍历 data 对象的所有属性
  Object.keys(data).forEach(key => {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      // 当获取值的时候执行
      get: () => {
        console.log('get: ', key, data[key])
        return data[key]
      },
      // 当设置值的时候执行
      set: newVal => {
        console.log('set: ', key, newValue)
        if (newValue === data[key]) {
          return
        }
        data[key] = newValue
      }
    })
  })
}
proxyData(data)
  
// test
vm.msg = 'Hello World'
console.log(vm.msg) // Hello World
```



总结： 通过Object.getOwnPropertyDescriptors()获取读取属性的特性，通过Object.defineProperty()设置属性的特性属性特性分为数据属性和访问器属性。

​			数据属性包含configurable、enumerable、writable和value属性

​			访问器属性包含configurable、enumerable、get和set属性

​			vue中响应式核心就是把对象的数据属性设置成访问器属性。











