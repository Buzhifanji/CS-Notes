const MyPromise = require('./myPromise');

// const promise = new MyPromise((resolve, reject) => {
// 	setTimeout(() => {
// 		// resolve('成功');
// 		reject('失败');
// 	}, 2000);
// 	// resolve('成功');
// 	// reject('失败');
// 	// throw new Error('executor error');
// });
// promise.then().then().then((value) => console.log(value), (reason) => console.log(reason));
// function other() {
// 	return new MyPromise((resolve, reject) => {
// 		resolve('other');
// 	});
// }

function p1() {
	return new MyPromise((resolve, reject) => {
		setTimeout(() => {
			resolve('p1');
		}, 2000);
	});
}

function p2() {
	return new MyPromise((resolve, reject) => {
		// resolve('p2 resolve');
		reject('p2 reject');
	});
}
p2().then((value) => console.log(value)).catch((reason) => console.log(reason));
// p2()
// 	.finally(() => {
// 		console.log('finally');
// 		return p1();
// 	})
// 	.then(
// 		(value) => {
// 			console.log(value);
// 		},
// 		(reason) => {
// 			console.log(reason);
// 		}
// 	);
// MyPromise.all([ 'a', 'b', p1(), p2() ]).then((result) => {
// 	console.log(result);
// });
// MyPromise.resolve(100).then((value) => console.log(value));

// let p1 = promise.then((value) => {
// 	console.log(value);
// 	return p1;
// });

// promise
// 	.then(
// 		(value) => {
// 			console.log(value);
// 			throw new Error('then error');
// 		},
// 		(reason) => {
// 			console.log(reason.message);
// 		}
// 	)
// 	.then(
// 		(value) => {
// 			console.log(value);
// 		},
// 		(reason) => {
// 			console.log('aaaa');
// 			console.log(reason.message);
// 		}
// 	);
// promise
// 	.then(
// 		(value) => {
// 			console.log(value);
// 			return 'aaa';
// 		},
// 		(reason) => {
// 			console.log(reason);
// 			return 10000;
// 		}
// 	)
// 	.then((value) => {
// 		console.log(value);
// 	});
// promise.then(
// 	(value) => {
// 		console.log(3);
// 		console.log(value);
// 	},
// 	(reason) => {
// 		console.log(reason);
// 	}
// );
