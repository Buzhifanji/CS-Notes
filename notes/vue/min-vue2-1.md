# 手动模拟一个min-vue

通过手动实现一个min-vue，来掌握vue中数据响应式原理。

## 准备html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min-vue</title>
</head>
<body>
    <div id="app">
        <h1>差值表达式</h1>
        <h3>{{msg}}</h3>
        <h3>{{count}}</h3>
        <h1>v-text</h1>
        <div v-text="msg"></div>
        <h1>v-model</h1>
        <input type="text" v-model="msg">
        <input type="text" v-model="count">
    </div>
    <script src="./js/vue.js"></script>
    <script>
        const vue = new Vue({
            el: '#app',
            data: {
                msg: 'hello vue',
                count: 10
            }
        })
    </script>
</body>
</html>
```

写好html方便我们验证每次写的功能是否正确。

## vue

在index.html中我们引入了js文件中vue.js，我们要在这个vue.js实现vue初始化功能

首先vue是个类，这个类在实例化的时候会接收一个对象参数，这个参数里有el属性和data

```js
class Vue {
  constructor(options) {
    
  }
}
```

### 1.  保存选项数据

我们需要把传入的数据保存起来，以方便后续需要的使用。

```js
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
  }
}
```

this.$options和this.$data， 都做了异常处理，如果无值，就赋值空对象

this.$option缓存的是当前选项的数据，this.$data缓存的是当前选项中的data数据，而this.$el则是当前dom实例。

如果当前选项的数据中的el是个字符串，我们就会手动就获取dom对象。

### 2. 把 data 转换 getter/setter

我们把data缓存到当前vue实例上，但并没有转换成getter/setter。

```js
class Vue {
  constructor(options) {
    // 1. 通过属性保存选项的数据
    this.$options = options || {}
    this.$data = options.data || {}
    this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
    // 2. 把 data 中的成员转换成 getter/setter,注入到vue实例中
    this._proxyData(this.$data)
  }
  // 代理数据
  _proxyData(data) {
    Object.keys(data).forEach(key => {
      Object.defineProperty(this, key, {
        configurable: true,
        enumerable: true,
        get() {
          return data[key]
        },
        set(newValue) {
          if(newValue === data[key]) {
            return
          }
          data[key] = newValue
        }
      })
    })
  }
}
```

以_开头的方法，代表着当前类中的私有方法。

在vue类中，我们定义了_proxyData私有方法,它会通过Object.keys把data中的key属性转换成一个数组，然后用forEach进行遍历。在遍历中通过Object.defineProperty把对象从数据属性转变成访问器属性，访问器属性也就是getter/setter.。在这里需要注意的是，我们需要把getter/setter注入到vue实例中，而Vue类型中的this就是当前实例，所以Object.defineProperty的第一个参数是this。

#### 验证

运行代码，查看vue实例是否缓存选项数据，并且是否把data转换成了getter/setter,注入到vue实例中。

![image-20210816110447796](/Users/huangbin/Library/Application Support/typora-user-images/image-20210816110447796.png)

### 3. 监听数据变化Observer

上一步我们把 data 中的成员转换成 getter/setter，并且注入到vue实例中。但data自身并没有转换成getter/setter

![image-20210816185925431](/Users/huangbin/Library/Application Support/typora-user-images/image-20210816185925431.png)

我们会新建一个Observer类，把data中的所有成员转换成getter/setter，用于监听数据变化。

```js
class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(data, key, value) {
        // 递归处理 嵌套对象
        this.walk(value)
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
            }
        })
    }
}
```

Observer类中定义了walk方法，这个方法会对参数异常处理，只要当参数是objecjt并不为null 的时候，defineReactive方法才会被调用。

defineReactive负责把data转换成getter/setter。

#### 测验

##### html引入observer

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min-vue</title>
</head>
<body>
    <div id="app">
        <h1>差值表达式</h1>
        <h3>{{msg}}</h3>
        <h3>{{count}}</h3>
        <h1>v-text</h1>
        <div v-text="msg"></div>
        <h1>v-model</h1>
        <input type="text" v-model="msg">
        <input type="text" v-model="count">
    </div>
    <script src="./js/observer.js"></script>
    <script src="./js/vue.js"></script>
    <script>
        const vue = new Vue({
            el: '#app',
            data: {
                msg: 'hello vue',
                count: 10
            }
        })
    </script>
</body>
</html>
```

##### vue中调用observer

```js
class Vue {
	constructor(options) {
		// 1. 通过属性保存选项的数据
		this.$options = options || {}; //
		this.$data = options.data || {};
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
		// 2. 把 data 中的成员转换成 getter/setter,注入到vue实例中
		this._proxyData(this.$data);
		// 3. 调用observer对象，监听数据的变化
		new Observer(this.$data)
	}
	// 代理数据
	_proxyData(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				configurable: true,
				enumerable: true,
				get() {
					return data[key];
				},
				set(newValue) {
					if (newValue === data[key]) {
						return;
					}
					data[key] = newValue;
				}
			});
		});
	}
}

```

##### 查看实际运行效果

![image-20210818095212298](/Users/huangbin/Library/Application Support/typora-user-images/image-20210818095212298.png)

#### 解惑

##### 为什么value不是通过data[key]获取

在Vue中的_proxyy方法里，Object.defineProperty中get方法获取属性是通过data[key]获取的，而这里却需要直接传入值。

这是因为_proxyData里的Object.defineProperty的第一个参数this，它会把getter/setter注入到vue实例中，而defineReactive里的Object.defineProperty的第一个参数是data自身，它把自身从数据属性转换成访问性属性，如果get方法是通过data[key]获取属性，那么就一直循环调用get自身方法，直到抛出异常信息：**observer.js:21 Uncaught RangeError: Maximum call stack size exceeded**

##### 传入的value不会被清除么

并不会被清除，这是因为get方法保持对value存在引用，会产生闭包，延迟value的作用域。

![image-20210816195553510](/Users/huangbin/Library/Application Support/typora-user-images/image-20210816195553510.png)

#### 优化Observer

vue初始化的时候会遍历data中的属性，然后转换成getter/setter。如果我们在初始化之后把某个属性从原始数据类型修改成了对象，那么这个对象是数据属性，而不是访问性属性了。

我们需要在set方法里再一次调用walk方法就可以解决这个问题

```js
class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(data, key, value) {
        // 递归处理 嵌套对象
        this.walk(value)
        const _this = this
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
              // 处理修改的时候，是新增对象的情况
                _this.walk(value)
            }
        })
    }
}
```

**验证**

![image-20210816200925655](/Users/huangbin/Library/Application Support/typora-user-images/image-20210816200925655.png)

### 4. 编译模板 *compiler*

之前我们把数据缓存起来，并转换成了getter/setter。接下来我们就要处理dom相关的事情了。

新建一个Compiler类

```js
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile(el) {
      
    }
    // 编译元素节点，处理指令
    compileElement(node) {
      
    }

    // 编译文本节点，处理插值表达式
    compileText(node) {

    }
    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}
```

Compiler中vm是当前vue实例，el是当前vue实例对应的dom元素。

#### compile——编译模板，处理文本节点和元素节点

```js
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile(el) {
      	const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            // 处理文件节点
            if(this.isTextNode(node)) {
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素节点
                this.compileElement(node)
            }

            // 处理深层节点
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
		...
}
```

通过el.childNoedes获取子节点，因为childNodes是个伪类数组，所有需要通过Array.from转换成数组。如果是文本节点，则调用compileText方法；如果是元素节点，则调用compileElement方法；如果有深层节点，则递归调用自身。

#### compileText——    编译文本节点，处理差值表达式

```js
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
  	...
    // 编译文本节点，处理插值表达式
    compileText(node) {
        // {{ msg }}
        const reg = /{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)) {
          	// 清除空格
            const key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])
        }
    }
		...
}
```

先进行判断是否是插值表达式，如果是，则就行替换

#### compileElement——编译元素节点，处理指令

```js
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
  	...
    // 编译元素节点，处理指令
    compileElement(node) {
        // console.log(node.attributes)
        Array.from(node.attributes).forEach(attr => {
            // 判断是为是指令
            let attrName = attr.name
            if(this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                const key = attr.value
            }
        })
    }
		...
}
```

compileElement的参数node是元素节点，它是个伪数组，我们需要转换成数组，才可以进行遍历。

对于每个指令，我们都会定义一个方法处理，这样尽可能保持函数的单一性。但我们需要处理的指令比较多，如果compileElement里我们是通过枚举方法一一去判断，那么后续需要添加指令的时候需要修改两个地方。我们现在来优化一下，让代码只需要修改一处就能实现功能。

```js
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
  	...
    // 编译元素节点，处理指令
    compileElement(node) {
        // console.log(node.attributes)
        Array.from(node.attributes).forEach(attr => {
            // 判断是为是指令
            let attrName = attr.name
            if(this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                const key = attr.value
                this.updader(node, key, attrName)
            }
        })
    }
		/**
		*/
		updader(node, key, attrName) {
        const updateFn = this[attrName + 'Updater']
        updateFn && updateFn(node, this.vm[key])
    }
    // 处理 v-text 指令
    textUpdater(node, value) {
        node.textContent = value
    }
    // 处理 v-model 指令
    modelUpdater(node, value) {
        node.value = value
    }
		...
}
```

updader方法会接收三个参数，

第一个是参数是当前节；

第二个参数当前指令对应data数据里的key；

第三个参数是删除 v- 后的指令名，例如：v-text => text, v-model => model。

在updader方法里，通过attrName + 'Updater' 拼接就是出我们定义好的处理指令方法，例如textUpdater 就等于 text + 'Updater'

#### 验证

##### html引入Comlier

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Min-vue</title>
</head>
<body>
    <div id="app">
        <h1>差值表达式</h1>
        <h3>{{msg}}</h3>
        <h3>{{count}}</h3>
        <h1>v-text</h1>
        <div v-text="msg"></div>
        <h1>v-model</h1>
        <input type="text" v-model="msg">
        <input type="text" v-model="count">
    </div>
    <script src="./js/compiler.js"></script>
    <script src="./js/observer.js"></script>
    <script src="./js/vue.js"></script>
    <script>
        const vue = new Vue({
            el: '#app',
            data: {
                msg: 'hello vue',
                count: 10
            }
        })
    </script>
</body>
</html>
```

##### vue中调用Comlier

```js
class Vue {
	constructor(options) {
		// 1. 通过属性保存选项的数据
		this.$options = options || {}; //
		this.$data = options.data || {};
		this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el;
		// 2. 把 data 中的成员转换成 getter/setter,注入到vue实例中
		this._proxyData(this.$data);
		// 3. 调用observer对象，监听数据的变化
		new Observer(this.$data)
		// 4. 调用 compiler 对象，解析指令和差值表达式
		new Compiler(this)
	}
	// 代理数据
	_proxyData(data) {
		Object.keys(data).forEach((key) => {
			Object.defineProperty(this, key, {
				configurable: true,
				enumerable: true,
				get() {
					return data[key];
				},
				set(newValue) {
					if (newValue === data[key]) {
						return;
					}
					data[key] = newValue;
				}
			});
		});
	}
}

```

##### 查看comlier结果

![image-20210818100534853](/Users/huangbin/Library/Application Support/typora-user-images/image-20210818100534853.png)

#### 5. 建立observer与comlier通信桥梁

现在data中的数据转换成getter/setter，并且通过compiler把data里的数据绑定到html上了。接下来就要实现当data里的数据修改的时候，html自动进行修改的功能。

##### Dep收集依赖

```js
class Dep {
    constructor() {
       // 存储依赖
        this.subs = []
    }
  	// 添加依赖，约定：每个依赖都有一个update方法
    addSub(sub) {
        if(sub && sub.update) {
            this.subs.push(sub)
        }
    }
  	// 触发通知，调用每个依赖中的update方法
    notify() {
        this.subs.forEach(sub => {
            sub.update()
        })
    }
}
```

Dep类中，需要注意的是，添加依赖的时候，这个依赖需要有一个update方法。当触发通知的时候，通过调用update 方法更新数据。

##### Watcher 更新数据

```js
class Watcher {
    constructor(vm, key, cb) {
        this.vm = vm
        this.key = key
        this.cb = cb
      	this.oldValue = vm[key]
    }
    update() {
			const newValue = this.vm[this.key]
      if(this.oldValue === newValue) {
        return
      }
      this.cb(newValue)
    }
}
```

Watch会接收三个参数:

第一个是当前vue实例

第二个参数是data中的key，例如我们现在data的msg、count

第三个是个回调函数，用于更新视图。

update方法会做两件事情：

1. 对比新旧数据，旧数据是在实例化Watch的时候获取得到的；新数据是在update被调用的时候获取得到的
2. 如果新旧数据不相等，则调用回调函数，并传入新数据

##### 整合Dep和Watch

接下是最难理解的地方了。

我们通过Obsever把data转换成了getter/setter，当获取data的某个值得时候，会调用get方法，当更新data中的某个值的时候，会调用set方法。

```js
class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(data, key, value) {
        // 递归处理 嵌套对象
        this.walk(value)
        const _this = this // 缓存this
        const dep = new Dep() // 实例收集者
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
              	// 收集依赖
              	// Dep.target 当前key对应的观察者，也就是 Watcher 的实例
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
                _this.walk(value)
              	// 通知依赖更新
                dep.notify()
            }
        })
    }
}
```

这里Dep.target 的是啥？target是Dep类中的静态属性。

它在什么时候被赋值的？接下来就要实现把target赋值到Dep类中

##### 修改Watcher

```js
class Watcher {
    constructor(vm, key, cb, ) {
        this.vm = vm
        this.key = key
        this.cb = cb
        // 把 watcher 对象记录到Dep类静态属性target
        Dep.target = this
        // 触发get方法，在get方法中调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update() {
        const newValue = this.vm[this.key]
        if(this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}
```

##### 修改comoiler

```js	
class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
		...
    // 编译元素节点，处理指令
    compileElement(node) {
        // console.log(node.attributes)
        Array.from(node.attributes).forEach(attr => {
            // 判断是为是指令
            let attrName = attr.name
            if(this.isDirective(attrName)) {
                // v-text --> text
                attrName = attrName.substr(2)
                const key = attr.value
                // v-text 调用 textUpdater 方法
                // v-vmodel 调用 modelUpdater 方法
                this.updader(node, key, attrName)
            }
        })
    }
  	// 通用 指令 处理方法，方便扩展
    updader(node, key, attrName) {
        const updateFn = this[attrName + 'Updater']
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
    // 处理 v-text 指令
    textUpdater(node, value, key) {
        node.textContent = value
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // v-model
    modelUpdater(node, value, key) {
        node.value = value
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
    }


    // 编译文本节点，处理插值表达式
    compileText(node) {
        // {{ msg }}
        const reg = /{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)) {
            const key = RegExp.$1.trim()
            node.textContent = value.replace(reg, this.vm[key])

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
  ...
}
```

编译模板在处理文本节点的时候，调用compileText方法，实例一个Watcher；Watcher实例的时候，会把对 实例（watcher） 对象记录到*Dep类静态属性target*上，然后然后访问通过文本的key访问的data中对应的value，在访问的时候会触发getter方法，getter里会调用dep.addSub(),收集watcher实例，也就是依赖，收集之后，代码继续回到实例wather函数调用栈中，把Dep类的target属性清空，因为已经收集依赖，建立了通信渠道。这样做是为了，防止内存泄漏。这就是**依赖收集**的过程。

当数据更新发生变化的时候，会触发setter方法，然后会调用dep.notify方法，此方法里遍历subs数组，并且触发water的update方法，而每一个watcher都存着更新视图的回到函数，当update方法触发的时候，视图也会随之更新。这就是**更新依赖**的过程

遍历模板在处理指令的时候，需要先调用updader方法，找到指令与之对应的方法，然后执行与compiler一样的逻辑。

#### 6.双向数据绑定

双向数据绑定是通过v-model这个指令实现，我已经实现了，当数据更新了，v-model对应的视图会随之更新。我们只要实现，当视图更新了，更新data上的值就能实现双向数据绑定了。

```js
class Compiler {
  ...
  // v-model
  modelUpdater(node, value, key) {
    node.value = value
    // data变更 通知视图更新
    new Watcher(this.vm, key, (newValue) => {
      node.value = newValue
    })
    // 视图更新，更新data上数据
    node.addEventListener('input', () => {
        this.vm[key] = node.value
    })
  }
  ...
}
```

通过监听input的事情即可实现。

完整源码地址:[CS-Notes/code/JavaScript/vue2/min-vue at main · Buzhifanji/CS-Notes (github.com)](https://github.com/Buzhifanji/CS-Notes/tree/main/code/JavaScript/vue2/min-vue)

