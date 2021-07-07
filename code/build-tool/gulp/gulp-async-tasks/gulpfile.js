// gulp 异步任务

const log = console.log;

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

const timeout = (time) => {
	return new Promise((resolve) => {
		setTimeout(resolve, time);
	});
};

// exports.async = async
