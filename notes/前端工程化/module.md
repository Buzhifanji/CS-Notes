## ES Module 模块化完整知识
## ES Modules 特性

通过 script 添加 type = module 的属性，就可以 ES Module 的标准执行其中的 JS 代码

```html
    <script type="module">
        console.log('this is es module')
    </script>
```

四个特性

- ESM 自动采用严格模式，忽略 '**use stric**t'，模块化中的this是**undefined**

```html
    <script type="module">
        console.log(this) // undefined
    </script>
```

- 每个 ES Module 都是运行在单独的私有作用域中（解决了使用变量会造成全局污染问题）

```html
    <script type="module">
        var foo = 100
        console.log(foo)
    </script>
    <script type="module">
         console.log(foo) // Uncaught ReferenceError: foo is not defined
    </script>
```

- ESM 是通过 CORS 的方式请求外部 JS 模块的

```html
// Access to script at 'https://libs.baidu.com/jquery/2.0.0/jquery.min.js' from origin 'http://127.0.0.1:5501' has been blocked by CORS // policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.
<script type="module" src="https://libs.baidu.com/jquery/2.0.0/jquery.min.js"></script>	

<script type="module" src="https://unpkg.com/jquery@3.4.1/dist/jquery.min.js"></script> // 正常运行
```

- ESM 的script 标签会延迟执行,相当于给script标签添加了defer属性

## ES Modules 导出

- 默认导出

```js
// 默认导出
const name = 'hello module'
export default name

// 导入
import name from '...'
```

- 单独导出

```js
// 导出
export const name = 'hello module'

// 导入
import { name } from '...'
```

- 多个一起导入导出

```js
const name = 'name'
function say() {}
class Person {}

// 导出
export { name, say, Person }

// 导入
import { name, say, Person  } from '...'
```

- 重命名导出

```js
// 重命名导出
const name = 'name'
export { name as fooName }

// 导入
import { fooName } from '...'
```

- 重命名导出特殊情况: 重命名为default

```js
// 重命名导出为默认导出
const name = 'name'
export { name as default }

// 导入(导入时也必须重命名)
import { defalut as fooName } from '...'
```

## ES Modules 导入

- 相对路径导入

```js
import { name } from './module.js' // 完整路径，不能省略文件后缀名 .js
```

- 绝对路径

```js
import { name } from '/module.js' // 从当前项目的跟目录开始
```

- 完整的URL

```js
import { name } from 'http://localhost:3000/module.js' // 可以直接引用cdn模块文件
```

- 只加载不提取

```js
import {} from './module.js'  //  用于加载不需要控制的 子功能模块
import './module.js' // 简洁写法
```

- 提取到同一个对象上

```js
import as mod from './module.js'
```

- 动态导入模块

```js
import('./module.js').then((module) => {
 	console.log(module)   
})
```

## ES Modules 导入导出注意事项

- 导出是固定用法，不是解构。看起来相似，但实际上没有这两个没有任何关系

```js
const name = 'li'
const age = 18
export { name, age }

// 导入
import { name, age } from '...'

// 解构
const { foo, bar } = { foo: "aaa", bar: "bbb" };
```

- 导出的是引用地址（js中模块就一个单例）

```js
// module.js
let name = 'li'
setTimeout(() => {
    name = 'ban'
}, 1000)

export { name }

// app.js
import { name } from './module.js'
console.log(name)	// li
setTimeout(() => {
    console.log(name) // ban
}, 1500)
```

- 导出的成员是只读，不能修改

```js
// a.js
export let name = 'li'

// b.js
import { name } from './a.js'
name = 'ban' // Uncaught TypeError: Assignment to constant variable.
```

## 统一导入导出成员

```js
// index.js
// 常规写法 统一导入导出
import age, { name } from 'a.j'
import { sex } from 'b.js'
export { age, name, sex }

// 简洁写法
// 注意采用当前写法时，获取不到导入导出的变量
export {deault as age, name } from 'a.js'
export { sex } from 'b.js'
```

