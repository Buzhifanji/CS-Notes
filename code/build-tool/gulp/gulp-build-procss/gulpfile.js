const fs = require('fs');
const { Transform } = require('stream');
// gulp 构建核心过程原理
// 通过node API 模拟实现
// 输入（读取文件） => 加工（压缩文件） => 输出（写入文件）
exports.default = () => {
	// 文件读取流
	const read = fs.createReadStream('normalize.css');
	// 文件写入流
	const write = fs.createWriteStream('mornalize.min.css');

	// 文件转换
	const transform = new Transform({
		transform: (chunk, encoding, callback) => {
			// 核心转换过程
			// chunk => 读取流中读取到的内容 （Buffer）
			const input = chunk.toString();
			const output = input.replace(/\s+/g, '').replace(/\/\*.+?\*\//g, '');
			// callback 错误优先函数，第一个是错误参数
			callback(null, output);
		}
	});

	// 把读取出来的文件导入写入流
	read.pipe(transform).pipe(write);
	// gulp 根据流的状态判断是否完成
	return read;
};

// gulp 基于流的构建系统（读取流 => 转换流 => 写入流）
