const PENGDING = 'pengding'; // 等待
const FULFILLED = 'fulfilled'; // 成功
const REJECTED = 'rejected'; // 失败

// 模拟实现 promise
class MyPromise {
	constructor(executor) {
		try {
			// 立即执行
			executor(this.resolve, this.reject);
		} catch (e) {
			this.reject(e);
		}
	}
	status = PENGDING;
	value = undefined;
	reason = undefined;
	// 回调
	successCallback = [];
	failCallback = [];

	resolve = (value) => {
		// 状态不可逆
		if (this.status !== PENGDING) return;
		// 更改状态
		this.status = FULFILLED;
		this.value = value;
		while (this.successCallback.length) {
			this.successCallback.shift()();
		}
	};
	reject = (reason) => {
		// 状态不可逆
		if (this.status !== PENGDING) return;
		this.status = REJECTED;
		this.reason = reason;
		while (this.failCallback.length) {
			this.failCallback.shift()();
		}
	};
	then(successCallback, failCallback) {
		successCallback = successCallback ? successCallback : (value) => value;
		failCallback = failCallback
			? failCallback
			: (reason) => {
					throw reason;
				};
		const promise2 = new MyPromise((resolve, reject) => {
			if (this.status === FULFILLED) {
				setTimeout(() => {
					try {
						const result = successCallback(this.value);
						// resolve(result);
						resolvePromise(promise2, result, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			} else if (this.status === REJECTED) {
				setTimeout(() => {
					try {
						const result = failCallback(this.reason);
						// resolve(result);
						resolvePromise(promise2, result, resolve, reject);
					} catch (e) {
						reject(e);
					}
				}, 0);
			} else {
				// 等待状态
				// 立即执行中可以存在异步，需要缓存起来
				this.successCallback.push(() => {
					setTimeout(() => {
						try {
							const result = successCallback(this.value);
							// resolve(result);
							resolvePromise(promise2, result, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
				this.failCallback.push(() => {
					setTimeout(() => {
						try {
							const result = failCallback(this.reason);
							// resolve(result);
							resolvePromise(promise2, result, resolve, reject);
						} catch (e) {
							reject(e);
						}
					}, 0);
				});
			}
		});
		return promise2;
	}
	finally(callback) {
		return this.then(
			(value) => {
				return MyPromise.resolve(callback()).then(() => value);
			},
			(reason) => {
				return MyPromise.resolve(callback()).then(() => {
					throw reason;
				});
			}
		);
	}
	catch(failCallback) {
		return this.then(undefined, failCallback);
	}
	static all(array) {
		return new MyPromise((resolve, reject) => {
			const result = [];
			let index = 0;
			function addData(key, value) {
				result[key] = value;
				index++;
				if (index === array.length) {
					resolve(result);
				}
			}
			for (let i = 0; i < array.length; i++) {
				const item = array[i];
				if (item instanceof MyPromise) {
					item.then((value) => addData(i, value), (reason) => reject(reason));
				} else {
					addData(i, item);
				}
			}
		});
	}
	static resolve(value) {
		return value instanceof MyPromise ? value : new MyPromise((resolve) => resolve(value));
	}
}

function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		return reject(new TypeError('Chaining cycle detected for promise #<Promise>'));
	}
	if (x instanceof MyPromise) {
		x.then(resolve, reject);
	} else {
		resolve(x);
	}
}

module.exports = MyPromise;
