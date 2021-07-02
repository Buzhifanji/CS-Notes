import babel from 'rollup-plugin-babel';
import resolve from 'rollup-plugin-node-resolve';
export default {
	entry: 'src/index.js', //入口
	format: 'umd', //兼容 规范 script导入 amd commonjs
	plugins: [
		resolve(),
		babel({
			exclude: 'node_modules/**'
		})
	],
	dest: 'build/bundle.js'
};
