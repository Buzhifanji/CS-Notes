export function toOptions(params) {
	return Object.entries(params).reduce((acc, cur) => {
		acc[cur[0]] = new cur[1]();
		return acc;
	}, {});
}

export function mix(...mixins) {
	class Mix {
		constructor() {
			for (const mixin of mixins) {
				copyProperties((this, new mixin())); // 拷贝实例属性
			}
		}
	}
	for (let mixin of mixins) {
		copyProperties(Mix, mixin); // 拷贝静态属性
		copyProperties(Mix.prototype, mixin.prototype); // 拷贝原型属性
	}
	return Mix;
}

function copyProperties(target, source) {
	if (source) {
		for (let key of Reflect.ownKeys(source)) {
			if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
				const desc = Object.getOwnPropertyDescriptor(source, key);
				Object.defineProperty(target, key, desc);
			}
		}
	}
}
