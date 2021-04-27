# 路由

## Hash模式

前置知识：

- [Location.hash](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/hash)：当前 URL 的片段字符串部分，从`#`开始
- [onhashchange](https://developer.mozilla.org/zh-CN/docs/Web/API/WindowEventHandlers/onhashchange): 当前 URL 中 # 后面的部分改变时就会触发 **hashchange** 事件

通过修改**window.location.hash**的值来更改浏览器中的 URL # 后面的字符串

通过**hashchange** 事件, 监听 URL 中 # 后面的部分更改

例如代码如下：

```htm	
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <div>hash路由</div>
    <div>
        <button id="btn1">page1</button>
        <button id="btn2">page2</button>
    </div>
    <script>
        // 获取dom
        function getDom(id) {
            return document.querySelector(id)
        }
        // 监听 btn1 点击事情
        getDom('#btn1').addEventListener('click', event => {
            window.location.hash = 'one'
        }, false)
        // 监听 btn2 点击事情
        getDom('#btn2').addEventListener('click', event => {
            window.location.hash = 'two'
        }, false)
        // 监听 hash 事件
        window.addEventListener('hashchange', event => {
            const { oldURL, newURL } = event
            console.log('newURL: ', newURL);
            console.log('oldURL: ', oldURL);
        }, false)
    </script>
</body>
</html>
```

当我们点击 page1 的时候，浏览器中的URL会发生改变，同时触发 hashchange 事件，但页面并没有发生变化。我们在控制台可以看到打印出来的 newURL、oldURL，然后我们可以在浏览器里点击后退键，再点击前进键，又会回到之前的URl，说明浏览器会记录location.hash更改的历史记录。

**总结**

- Hash模式是基于锚点，而这个锚点对应的是 URL 中#后面的内容。监听 URl 中的 hash的变化，然后渲染不同的内容。

- Hash模式不向服务发送请求，不需要服务端的支持

## History模式

History模式是HTML5新增的API，这些API可以分为切换和修改两大部分。

**切换历史状态**

- [History.back()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/back)：移动到上一个网址，等同于点击浏览器的后退键

- [History.forward()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/forward)：移动到下一个网址，等同于点击浏览器的前进键

- [History.go()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/go)：接受一个整数作为参数，以当前网址为基准，移动到参数指定的网址

  `history.go(0)  // 相当于刷新当前页面；`

   `history.go(-2) //后退两次；`

   `history.go(2)  //前进两次`

注意，移动到以前访问过的页面时，**页面通常是从浏览器缓存之中加载，而不是重新要求服务器发送新的网页**

**修改历史状态**



1. [History.pushState()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState)
2. [History.replaceState()](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)



1. vue-router 原理

## vue-router 基本使用

```js
// 1.注册插件
// Vue.use() 内部调用传入对象的 install 方法
Vue.use(VueRouter);

// 2.创建路由对象规则
const router = new VueRouter({
  routes: [{ name: 'home', path: '/', component: homeComponent }],
});

// 3.创建 Vue 实例，注册 router 对象
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// 4.创建路由占位符
<router-view />
  
 // 5. 创建链接
 <router-link to="/home">home</router-link>
```

## History模式

**原理**

- 正常路径，但需要服务配置
- 监听 popstate 事件

##### [pushState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/pushState) #####

浏览器不会向服务端请求数据，直接改变url地址，可以类似的理解为变相版的hash；但不像hash一样，浏览器会记录pushState的历史记录，可以使用浏览器的前进、后退功能作用

IE10以后才支持

[replaceState](https://developer.mozilla.org/zh-CN/docs/Web/API/History/replaceState)



