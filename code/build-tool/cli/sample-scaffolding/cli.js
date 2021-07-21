#! /usr/bin/env node

// Node Cli 应用入口文件必须要有这样的文件头
// 如果是 Linux 或者 macos 系统还需要修改此文件的读写权限为 755
// 具体是通过 `chmod 755 cli.js `实现修改

// console.log('working');
// 脚手架的工作过程
// 1.通过命令交互询问用户问题
// 2.根据用户回答的结果生成文件

const inquirer = require('inquirer');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');

inquirer
	.prompt([
		{
			type: 'input',
			name: 'name',
			message: 'Project name'
		}
	])
	.then((ansers) => {
		// console.log(ansers);
		// 根据用户回答的结果生成文件

		// 模板目录
		const tempDir = path.join(__dirname, 'templates');
		// 目标目录
		const destDir = process.cwd();

		// 将模板下的文件全部转换到目标下目录
		fs.readdir(tempDir, (err, files) => {
			if (err) throw err;
			files.forEach((file) => {
				// 通过目标引擎渲染文件
				fs.access(path.join(destDir, 'indesx.html'), fs.constants.F_OK, (err) => {
					console.log(__dirname);
					console.log(`${file} ${err ? 'does not exist' : 'exists'}`);
				});
				// try {
				// 	fs.statSync(path.join(destDir, 'indesx.html'));
				// 	console.log('存在');
				// } catch (e) {
				// 	console.log('bu存在');
				// }
				// const stat = fs.statSync(path.join(destDir, './index.html'));
				// if (stat.isDirectory()) {
				// 	console.log('存在');
				// } else {
				// 	ejs.renderFile(path.join(tempDir, file), ansers, (err, result) => {
				// 		if (err) throw err;
				// 		console.log(result);
				// 		// 将结果写入目标文件路径
				// 		fs.writeFileSync(path.join(destDir, file), result);
				// 	});
				// }
			});
		});
	});
