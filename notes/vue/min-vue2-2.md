# 手把手带你实现一个min版的vue2（1） 观察者模式

**观察者模式**是一种行为设计模式， 允许你定义一种订阅机制， 可在对象事件发生时通知多个 “观察” 该对象的其他对象。这种模式使用例子有很多，例如：订阅邮件、微信公众号与微信用户、气象局的天气预报与听众。

## 定义与特点

定义：指多个对象间存在一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

优点：

- *开闭原则*：无需修改发布者代码就能引入新的订阅者类 
- 目标与观察者之间建立了一套触发机制

缺点：

- 目标与观察者之间的依赖关系并没有完全解除，而且有可能出现循环引用
- 当观察者对象很多时，通知的发布会花费很多时间，影响程序的效率。

## 结构和实现

- 目标(发布者) —publisher 将自身的状态改变通知给其他对象
- 观察者(订阅者) – subscribers 所有希望关注发布者状态变化的其他对象

订阅机制：

1. 一个用于存储订阅者对象引用的列表成员变量
2. 几个用于添加或删除该列表中订阅者的公有方法



![image-20210525111321806](/Users/huangbin/Library/Application Support/typora-user-images/image-20210525111321806.png)



无论何时发生了重要的发布者事件， 它都要遍历订阅者并调用其对象的特定通知方法

![image-20210525111451300](/Users/huangbin/Library/Application Support/typora-user-images/image-20210525111451300.png)



实现代码：

```js
//发布者
class Publisher {
    constructor () {
      this.subs = []
    }
  // 添加观察者
  addSub(sub) {
    if (sub && sub.update) {
      this.subs.push(sub)
    }
  }
  // 通知所有观察者
  notify () {
    this.subs.forEach((element)=>{
      element.update()
    })
  }
}

// 观察者
class Subscriber {
    update() { // 接收发布者的通知
      console.log('观察者')
    }
}

// 目标
const publisher = new Publisher()
// 添加观察者
publisher.addSub (new Subscriber())
// 通知
publisher.notify()

```

总结：观察者模式是由具体目标调度，比如当事件触发，publisher 就会去调用观察者的方法,降低了目标与观察者之间的耦合关系，两者之间是抽象耦合关系。符合依赖倒置原则

