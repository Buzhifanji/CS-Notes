## [is-sorted](https://github.com/dcousens/is-sorted)

这个npm包用于判断是数组是否有序的，我们都知道顺序分为正序（升序）和倒序（降序），这个包默认判断是否为正序。

**使用例子**

```js
const sorted = require('is-sorted')

// 正序例子
console.log(sorted([1, 2, 3]))  // true
console.log(sorted([3, 1, 2]))  // false

// 降序例子
console.log(sorted([3, 2, 1], function (a, b) { return b - a })) // true
```



**代码实现**

```js
// 默认正序函数
function defaultComparetor(a, b) {
  return a - b
}
function checksort(array, comparator) {
  // 先判断第一个参数传入的是否为数组，如果不是，则抛出异常
  if (!Array.isArray(array)) throw new ('Expected Array, got ' + (typeof array))
  // 处理排序升序，默认是正序
  comparator = comparator || defaultComparetor
  for(let i = 1; i < arr.length; i++) {
    // 注意循环是从 1 开始
    // 遍历数组，数组中的前一个元素与自身对比，如果大于 0 则返回 false，否则继续循环
    if (comparator(array[i - 1], array[i]) > 0) return false
  }
  
  return true
}
```

**总结**

