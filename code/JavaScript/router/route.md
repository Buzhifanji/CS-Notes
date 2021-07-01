## 什么是前端路由

路由的概念来源于服务端，在服务端中路由描述的是 URL 与处理函数之间的映射关系。前端路由就是根据不同的URL地址展示不同的内容或页面。在现代SPA应用没有流行之前，前端页面是通过服务端根据不同URL返回不同的页面实现。现在每个前端框架都有对应的路由实现，例如vue-router、react-router、angular-router。

## 原始JS路由实现

### hash版

#### 原理

Hash模式是基于锚点，而这个锚点对应的是 URL 中#后面的地址。监听 URl 中的 hash的变化，然后渲染不同的内容。

#### 1.1 路由的存储

hash路由是根据URL 中#后面的地址，渲染不同的内容。那么我们需要把这些地址记录下来。

```js
       class Router {
         constructor() {
           this.routes = {} // 以键值对的形式储存路由，值是一个回调函数
           this.currentUrl = '' //  当前路由的URL
         }
       }
```

#### 1.2 路由的更新

我们现在有存储的地方，接下来我们就要考虑，如何存储，以及更新对应的内容。我们可以约定一个path，对应着一个回调函数，这样一对一的关系，当更新当前路径的时候，执行对应的回调函数就能更新对应的内容了。

```js
       class Router {
         constructor() {
           this.routes = {} // 以键值对的形式储存路由，值是一个回调函数
           this.currentUrl = '' //  当前路由的URL
         }
         /* 存储路由 */
         register(path, callback) {
            this.routes[path] = callback || (() => {}) // 注册路由和回调
         }
         /* 更新对应的内容：渲染视图 */
         render() {	
            // 更新当前路由
            this.currentUrl = location.hash.slice(1) || '/';
            this.routes[this.currentUrl]()
         }
       }
```

#### 1.3 监听事件

hash路由是通过监听 URl 中的 hash的变化，然后渲染不同的内容，那么我们在路由初始化的时候添加hashchange事件，当路由变更的时候，就会触发对应的回调函数

```js
       class Router {
         constructor() {
           this.routes = {} // 以键值对的形式储存路由，值是一个回调函数
           this.currentUrl = '' //  当前路由的URL
           window.addEventListener('DOMContentLoaded', this.render) // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
           window.addEventListener('hashchange', this.render)   // 监听路由变化
         }
         /* 存储路由 */
         register(path, callback) {
            this.routes[path] = callback || (() => {}) // 注册路由和回调
         }
         /* 更新对应的内容 */
         render() {	
            // 更新当前路由
            this.currentUrl = location.hash.slice(1) || '/';
            this.routes[this.currentUrl]()
         }
       }
```

#### 1.4 路由配置

现在我们把路由的存储、更新、已经路由变更的事件都好了，再加上一个路由配置，就可以跑demo了。

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>hash路由</title>
</head>
<body>
    <div>hash路由</div>
  
    <ul>
      <!-- 定义路由 -->
      <li><a href="#/vue">vue</a></li>
      <li><a href="#/react">react</a></li>
      <li><a href="#/angular">angular</a></li>
      <section>
          <div id="view"></div>
      </section>
  	</ul>
    <script>
       class Router {
        constructor() {
           this.routes = {} // 以键值对的形式储存路由，值是一个回调函数
           this.currentUrl = '' //  当前路由的URL
           this.render = this.render.bind(this);	// 处理 render 函数里的this问题
           window.addEventListener('DOMContentLoaded', this.render) // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
           window.addEventListener('hashchange', this.render)   // 监听路由变化
         }
         /* 存储路由 */
         register(path, callback) {
             console.log(this.routes);
            callback = callback || (() => {})
            this.routes[path] = callback    // 注册路由和回调
         }
         /* 更新对应的内容 */
         render() {	
            // 更新当前路由
            this.currentUrl = location.hash.slice(1) || '/';
            this.routes[this.currentUrl]()
         }
       }
       function changeView(value) {
           document.querySelector('#view').innerHTML = value
       }
       // 路由配置列表
       const routesList = [
           { path: '/', callback: () => changeView('home')},
           { path: '/vue', callback: () => changeView('vue')},
           { path: '/react', callback: () => changeView('react')},
           { path: '/angular', callback: () => changeView('angular')},
       ]
       const router  = new Router()
       // 注册 配置好的路由列表
       routesList.forEach(el => {
            router.register(el.path, el.callback)
       })
    </script>
</body>
</html>
```

#### 1.5 路由的优化——注册、存储

之前我们是以键值对的形式储存路由，其中这里的值是一个回调函数。在实际项目中，不同的路由需要去读取对应的组件，而这个组件经过打包工具（webpack）处理，其实就是一个js文件。现在我们面临优化点就是如何做到在切换路由的时候，加载一次多次使用。如果我们把第一次读取的结果缓存起来，就可以实现这个优化点了。

```js
       class Router {
         constructor() {
           this.routes = {} // 以键值对的形式储存路由，值是一个回调函数
           this.currentUrl = '' //  当前路由的URL
           window.addEventListener('DOMContentLoaded', this.render) // 页面加载完不会触发 hashchange，这里主动触发一次 hashchange 事件
           window.addEventListener('hashchange', this.render)   // 监听路由变化
         }
         /* 存储路由 */
         register(path, callback) {
            this.routes[path] = {
              callback: (value) => {
                
              },
              fn: null // 缓存
            }
         }
         /* 更新对应的内容 */
         render() {	
            // 更新当前路由
            this.currentUrl = location.hash.slice(1) || '/';
            this.routes[this.currentUrl]()
         }
         /* 路由异步懒加载js文件 */
         asyncLoad(file, value) {
           // 判断是否有缓存
           if(this.routes) {
              
              }
         }
       }
```





### history版

## Vue前端路由实现





