# JavaScript数据结构与算法——栈

栈存储数据的方式跟数组一样，都是将元素排成一行。只不过它还有以下3条约束。

- 只能在**末尾**插入数据
- 只能读取**末尾**的数据
- 只能移除**末尾**的数据

## 代码实现

```js
class Stack {
	constructor() {
		this.stack = []
	}
	// 入栈
	push(value) {
		this.stack.push(value)
	}
	// 出栈
	pop() {
		this.stack.pop()
	}
	// 获取栈顶元素
	peek() {
		this.stack[this.size() - 1]
	}
	// 获取栈容量
	size() {
		return this.stack.length
	}
	// 判断是否空栈
	isEmpty() {
		return this.size() === 0
	}
}
```

## [有效的括号](https://leetcode-cn.com/problems/valid-parentheses)

