// Grunt 的入口文件
// 用于定义一些需要 Grunt 自动执行的任务
// 此函数接收一个 grunt 形参，内部提供一些创建任务时可以用到的 API

const sass = require('sass');
const loadGruntTasks = require('load-grunt-tasks');

const log = console.log;

module.exports = (grunt) => {
	/******* ============  基本使用 ============*******/
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
	// grunt.registerTask('default', [ 'foo', 'bar' ]);

	// 异步任务
	// 不能使用箭头函数，因为要使用this
	grunt.registerTask('async-task', function() {
		const done = this.async();
		setTimeout(() => {
			log('async task working');
			// 标识异步任务已完成
			done();
		}, 1000);
	});

	/******* ============  标记任务失败 ============*******/
	// 标记任务失败
	grunt.registerTask('bad', () => {
		log('bad working~');
		return false;
	});
	// 标记任务失败会影响后续任务的执行
	// 执行 yarn grunt bad-effect
	grunt.registerTask('bad-effect', [ 'foo', 'bad', 'bar' ]);

	// 处理：让失败后续的任务继续执行：加 --force
	// 执行 yarn grunt bad-effect --force

	// 异步任务 标记失败
	grunt.registerTask('bad-async', function() {
		const done = this.async();
		setTimeout(() => {
			log('bad-async');
			done(false);
		}, 1000);
	});

	/******* ============  配置方法 ============*******/
	// 用途例子：配置文件读取路径

	grunt.initConfig({
		foo: 'bar', //
		bar: {
			// 支持对象形式
			value: 123
		}
	});
	grunt.registerTask('config-foo', () => {
		log(grunt.config('foo'));
		log(grunt.config('bar.value'));
	});

	/******* ============  多目标任务 ============*******/
	// 多目标任务，可以让任务根据配置形成多个子任务

	// key: 目标名称, value: 必须是个对象
	// 对象里每个key都会成为目标，除了options（配置选项）以外
	grunt.initConfig({
		build: {
			options: {
				// 任务的配置选项
				foo: 'bar'
			},
			css: {
				options: {
					// 会覆盖 对象上的options
					foo: 'baz'
				}
			},
			js: '2'
		}
	});

	// 执行：yarn grunt build
	grunt.registerMultiTask('build', function() {
		log('build task');
		log(`options: ${this.options().foo}`);
		log(`target: ${this.target}, data: ${this.data}`);
	});
	// 如果只想执行对应的目标： yarn grunt build:css

	/******* ============ 插件 ============*******/
	// yarn add grunt-contrib-clean 清除文件插件
	// yarn add grunt-sass sass --dev  sass 插件
	// yarn add grunt-babel @babel/core @babel/preset-env --dev
	// yarn add load-grunt-tasks --dev  处理一次导入多个模块
	// yarn add grunt-contrib-watch --dev 保存修改后的文件自动编译

	/**
     * 1.yarn add grunt-contrib-clean 清除文件插件
     */

	// 3.添加配置选项
	grunt.initConfig({
		clean: {
			temp: 'temp/app.js', // 删除具体某一个文件
			a: 'temp/*.txt', // 通配符 * ，删除temp下面所有的 .txt 文件
			all: 'all/**' // 删除all 整个文件
		},
		sass: {
			options: {
				implementation: sass
			},
			main: {
				files: {
					'dist/css/main.css': 'src/scss/main.scss'
				}
			}
		},
		babel: {
			options: {
				presets: [ '@babel/preset-env' ]
			},
			main: {
				files: {
					'dist/js/app.js': 'src/js/app.js'
				}
			}
		},
		watch: {
			js: {
				files: [ 'src/js*.js' ],
				tasks: [ 'babel' ]
			},
			css: {
				files: [ 'src/scss/*.scss' ],
				tasks: [ 'sass' ]
			}
		}
	});
	// 第二步：加载插件
	// grunt.loadNpmTasks('grunt-contrib-clean');  // 导入一个插件
	// grunt.loadNpmTasks('grunt-sass');
	loadGruntTasks(grunt); // 自动加载所有 grunt 插件的任务

	grunt.registerTask('default', [ 'sass', 'babel', 'watch' ]);
};
