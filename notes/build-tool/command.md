前端扩展知识系列自动构建工具之——命令行程序

所谓命令程序，我们并不陌生。当我们启动前端项目，在终端输入 npm run serve 就是输入一个命令程序；在终端输入 npm run build 也是一个命令程序。

但终端接收到命令后，接下来会做什么事情呢？这就是本文目的，带你了解node命令程序，已经如何构建自己的命令程序。

## 构建一个可执行的脚步

首先新建一个 hello文件，并在这个文件写入一下内容

```js
#!/usr/bin/env node
console.log('hello node shell demo')
```

然后执行 node ./hello

```js
$ node ./hello
hello node shell demo
```

如果直接执行 ./hello，会被告知没有文件执行权限

```js
$ ./hello
zsh: permission denied: ./hello
```

修改hello的权限

```js
$ chmod 755 hello
```

执行 ./ hello

```js
$ ./hello
hello node shell demo
```

**在文件授权之后，执行的 ./hello 本质上执行的还是 node ./hello**

这种做法

这种做法，每次执行都有找到路径，接下来换种不用写路径的写法。

在当前目录下创建一个package.json

```json
{
    "name": "hello",
    "bin": {
        "hello": "hello"
    }
}
```

然后执行 npm link命令

```js
$ npm link
```

最后执行 hello

```js
$ hello
hello world
```

解释：

**#!/usr/bin/env node**：约定写在脚本的第一行，用于指明该脚本文件要使用 node 来执行

**Chomd 755**: **chmod**是Linux下设置文件权限的命令,**chmod 755** 设置用户的权限为文件所有者可读可写可执行

**npm link**：把项目连接到全局，这样可以在其它项目一样可以使用这个命令了。

## 可执行脚本参数

命令行参数可以用系统变量 process.argv 获取。

```js
#!/usr/bin/env node
console.log('hello ', process.argv[2]);
```



