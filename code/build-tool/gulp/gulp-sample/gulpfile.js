// gulp 基本使用

// gulp 入口文件
const log = console.log;

exports.foo = (done) => {
	log('foo task working~');
	done(); // 标识任务完成
};

// 默认任务
exports.default = (done) => {
	log('default task working');
	done();
};

// 4.0 以前使用例子
// 4.0后的版本不推荐使用这种方式
const gulp = require('gulp');
gulp.task('bar', (done) => {
	log('bar working!');
	done();
});
