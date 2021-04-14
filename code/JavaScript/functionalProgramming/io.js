// 函数组合
function compose(...args) {
	return function(value) {
		// 先翻转数组，然后通过reduce依次执行函数
		return args.reverse().reduce(function(acc, fn) {
			return fn(acc);
		}, value);
	};
}

// IO 函子
class IO {
	static of(value) {
		return new IO(function() {
			return value;
		});
	}
	constructor(fn) {
		this._value = fn;
	}
	map(fn) {
		// 把当前的 value 和传入的 fn 组合成一个新的函数
		return new IO(compose(fn, this._value));
	}
}

// test
const result = IO.of(process).map((p) => p.execPath);
console.log(result._value());
