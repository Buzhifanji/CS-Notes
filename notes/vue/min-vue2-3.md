# 手把手带你实现一个min版的vue2（3）编译模板

提到模板，我们最熟悉的就是es6新增的字符串模板了。例如：

```js
let msg = 'hello'
let a = `${msg} world`
console.log(a) // hello world
```

模板是一个**模式**,在字符串模板里，

当msg是 hello时，a中的msg就会替换成hello，所有a是 hello world;

当msg是 hi 时，a中的msg就会替换成hi ，a是hi world。

模板类似于生活中的模具，往里套就能生成想要的东西。

在vue中，v-for ，v-if, v-show,也是一种模板，只不过它们有更明确的叫法—指令。{{}}也是一种模板，它也有更明确的叫法—插值。在底层的实现上，Vue 将模板编译成虚拟 DOM 渲染函数。结合响应系统，Vue 能够智能地计算出最少需要重新渲染多少组件，并把 DOM 操作次数减到最少

# 模板编译 {{}} #

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>compile</title>
</head>
<body>
    <div id="app" >{{name}}</div>
    <script>
        const data = { name: 'hello 编译模板'}
        // 把 {{name}} 替换成 data.name
    </script>
</body>
</html>
```



接下来我们要做的就是把 {{name}} 替换成 data.name

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>compile</title>
</head>
<body>
    <div id="app" >{{name}}</div>
    <script>

    </script>
    <script>
        // 正则 （匹配{{}}）
        const defaultRE = /\{\{(.+?)\}\}/g;
        // 把 数据
        const data = {name: 'hello 编译模板'}
        const element = document.querySelector('#app')
        // 替换
        const textContxt = element.textContent.replace(defaultRE, (...rest) => {
            // 把 {{name}} 替换成 data.name
            element.textContent = data[rest[1]]
        })       
    </script>
</body>
</html>
```

实现思路：获取对应的{{name}}, 然后用正则去匹配获取{{}}里的name，并替换。

理解这个思路后就会好理解vue的编译模板是做对应的 {{}}、v-if、v-show、v-model....,然后进行内容替换。只不过，寻找的时候需要费力，因为DOM是树形数据结构，并且需要对DOM的文本不同的节点单独处理。