# 高阶函数

    函数是一等公民

    函数可以存储在变量中

    函数作为参数

    函数作为返回值

## 函数可以存储在变量中

 ```javascript
    let fn = function() {}

    fn()

    const obj = {
        getName() {
            return 'name'
        }
    }
```

## 函数作为参数(回调函数)

模拟filter

  ```javascript
        function filter(arr, fn) {

            const result = []
            for(let i=0 ; i<arr.length ;i++){
                if (fn(arr[i])) {
                    debugger
                    result.push(arr[i])
                }
            }
            return result
        }

        let ary = filter([1,2,34,5,6],function(item){
            return item%2 === 0;
        })
        console.log(ary)

  ```

## 函数作为返回值(闭包)

实现只能调用一次的函数

  ```javascript
    function once(fn) {
        let done = false
        debugger
        return function() {
            if(!done) {
                done = true
                return fn.apply(this, arguments)
            }
        }
    }
    const pay = once(function(money) {
        console.log('支付了'+ money)
    })
    pay(5)
    pay(5)
    pay(5)
  ```
浏览器环境中闭包

![闭包](https://github.com/Buzhifanji/CS-Notes/blob/main/assets/javascript/image/closure.png)

**闭包**可以在另一个作用域中调用一个函数的内部函数并访问到该函数的作用域中的成员(也就是延长了作用域)

**闭包本质**函数在执行的时候会放到一个执行栈上,当函数执行完毕之后会从执行栈上移除,但是堆上的作用域成员因为被外部引用不能被释放,
因此内部函数依然可以访问外部函数成员
