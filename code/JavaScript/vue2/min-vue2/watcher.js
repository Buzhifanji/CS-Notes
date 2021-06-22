class Watcher {
	constructor(vm, key, callback) {
		this.vm = vm;
		this.key = key;
		this.callback = callback;

		// 在 Dep 的静态属性上记录当前 watcher 对象，当访问数据的时候把 watcher 添加到 dep 的 subs 中
		Dep.target = this;
		// 这里通过vm取值时，会调用到observer中的defineReactive中的get方法
		this.oldValue = vm[key];
		// 赋值后，将缓存清空，防止污染
		Dep.target = null;
	}
	update() {
		const { vm, key, oldValue, callback } = this;
		const newValue = vm[key];
		oldValue !== newValue && callback(newValue);
	}
}
