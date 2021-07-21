// gulp 异步任务

const log = console.log;
const fs = require('fs');

exports.callback = (done) => {
	log('callback task~');
	done();
};

// 错误优先（发生错误时，不会执行后续任务）
exports.callback_error = (done) => {
	log('callback task~');
	done(new Error('task failed'));
};

// 支持promise
exports.promise = () => {
	log('promise task');
	return Promise.resolve();
};

exports.promise_error = () => {
	log('promise task');
	return Promise.reject(new Error('task failed'));
};

// node 环境 8.0 以上即可使用 async await
const timeout = (time) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};

exports.async = async () => {
	await timeout(1000);
	log('async task');
};

// gulp 中注册监听读取字符事件
// exports.stream = () => {
// 	const readStream = fs.createReadStream('package.json');
// 	const writeSteam = fs.createWriteStream('temp.txt');
// 	readStream.pipe(writeSteam);
// 	return readStream;
// };

// gulp 模拟实现
exports.stream = (done) => {
	const readStream = fs.createReadStream('package.json');
	const writeSteam = fs.createWriteStream('temp.txt');
	readStream.pipe(writeSteam);
	readStream.on('end', () => {
		done();
	});
};
