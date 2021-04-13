// // functor 函子
// class Container {
// 	constructor(value) {
// 		this._value = value;
// 	}
// 	map(fn) {
// 		return new Container(fn(this._value));
// 	}
// }
// // test
// let result = new Container(5).map((x) => x + 1).map((x) => x * x);

// console.log(result);

// 优化 new
class Container {
	// 封装 实例化 Container
	static of(value) {
		return new Container(value);
	}
	constructor(value) {
		this._value = value;
	}
	// 契约对象
	map(fn) {
		/**
         * fn是个回调函数（纯函数）
         * 把fn处理的值，作为实例化 Container 的参数
         */
		return Container.of(fn(this._value));
	}
}

let result = Container.of(5).map((x) => x + 2).map((x) => x * x);
console.log(result);
