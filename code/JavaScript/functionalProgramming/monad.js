const fs = require('fs');

// 函数组合
function compose(...args) {
	return function(value) {
		return args.reverse().reduce(function(acc, fn) {
			return fn(acc);
		}, value);
	};
}

// monad 函子
// 解决 io函子 嵌套问题
class Monad {
	static of(value) {
		return new Monad(value);
	}
	constructor(value) {
		this._value = value;
	}
	map(fn) {
		return Monad.of(compose(fn, this._value));
	}
	join() {
		return this._value();
	}
	flatMap(fn) {
		return this.map(fn).join();
	}
}

const readFile = function(fileName) {
	return new Monad(function() {
		return fs.readFileSync(fileName, 'utf-8');
	});
};

const print = function(x) {
	return new Monad(function() {
		console.log(x);
		return x;
	});
};
// 合并函数，并且返回函子，用flatMap
// 合并函数，并且返回一个值，用 map

const result = readFile('package.json').map((x) => x.toUpperCase()).flatMap(print).join();
console.log(result);
