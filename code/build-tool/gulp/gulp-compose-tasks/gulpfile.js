// gulp 组合任务
const { series, parallel } = require('gulp');

const log = console.log;

const task1 = (done) => {
	setTimeout(() => {
		log('task1 working');
		done();
	}, 1000);
};

const task2 = (done) => {
	setTimeout(() => {
		log('task2 working');
		done();
	}, 1000);
};

const task3 = (done) => {
	setTimeout(() => {
		log('task3 working');
		done();
	}, 1000);
};
// 创建串行任务
exports.foo = series(task1, task2, task3);

// 创建并行任务
exports.bar = parallel(task1, task2, task3);
