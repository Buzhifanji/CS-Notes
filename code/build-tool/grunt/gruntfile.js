// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 此函数接收一个 grunt 形参，内部提供一些创建任务时可以用到的 API

function log() {
	console.log.apply(this, this.arguments);
}

module.exports = (grunt) => {
	// 注册任务
	// 执行命令：yarn grunt foo
	grunt.registerTask('foo', () => {
		log('hello grunt~');
	});
	// 添加任务描述
	grunt.registerTask('bar', '任务描述', () => {
		log('other task');
	});
	// 默认任务
	// 执行命令： yarn grunt
	// grunt.registerTask('default', () => {
	// 	log('default task');
	// });

	// 通过 默认任务 把多个任务串联执行
	grunt.registerTask('default', [ 'foo', 'bar' ]);

	// 异步任务
	// 不能使用箭头函数，因为要使用this
	grunt.registerTask('async-task', function() {
		const done = this.async();
		setTimeout(() => {
			console.log('async task working');
			// 标识异步任务已完成
			done();
		}, 1000);
	});
};
