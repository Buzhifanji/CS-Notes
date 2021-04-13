// MayBe 函子
class MayBe {
	static of(value) {
		return new MayBe(value);
	}
	constructor(value) {
		this._value = value;
	}
	map(fn) {
		return this.isNothing() ? MayBe.of(null) : MayBe.of(fn(this._value));
	}
	isNothing() {
		return this._value === null || this._value === undefined;
	}
}

// test

// let result = MayBe.of(null).map((x) => x.toUpperCase());
// 存在问题 不知道具体哪一步出现了null
let result = MayBe.of('Hello World').map((x) => x.toUpperCase()).map((x) => null).map((x) => x.split(' '));

console.log(result);
