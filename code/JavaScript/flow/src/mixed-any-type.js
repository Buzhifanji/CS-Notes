/**
 * Mixed Any
 * @flow
 */

// string / number / boolean / ...
function passMixed(value: mixed) {
	// 需要添加类型判断，否则语法层面会直接报错
	if (typeof value === 'string') {
		value.substr(1);
	}
	if (typeof value === 'number') {
		value * value;
	}
}
passMixed('string');
passMixed(100);

function passAny(value: any) {
	// 语法层面不会报错，不需要添加类型判断
	value.substr(1);
	value * value;
}
passAny('string');
passAny(100);

// 区别：any是弱类型，mixed是强类型
// 建议：项目中尽量使用mixed, any存在的意义是兼容以前的老代码，比如一些使用js了弱类型的特性的代码
