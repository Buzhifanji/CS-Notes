// Either 函子
class Left {
	static of(value) {
		return new Left(value);
	}
	constructor(value) {
		this._value = value;
	}
	map(fn) {
		return this;
	}
}

class Right {
	static of(value) {
		return new Right(value);
	}
	constructor(value) {
		this._value = value;
	}
	map(fn) {
		return Right.of(fn(this._value));
	}
}

// let result1 = Right.of(12).map((x) => x + 2);
// let result2 = Left.of(12).map((x) => x + 2);
// console.log(result1);
// console.log(result2);

function parseJSON(str) {
	try {
		return Right.of(JSON.parse(str));
	} catch (e) {
		// 存错错误信息
		return Left.of({ error: e.message });
	}
}

let result3 = parseJSON('{name: zs}');
let result4 = parseJSON('{ "name": "zs" }');
console.log(result3);
console.log(result4);
