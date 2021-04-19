// @flow

// 前提：在文件头部添加标记 // @flow
// :number 类型注解

function sum(a: number, b: number) {
	return a + b;
}

sum(100, 100);
sum('100', '100');
