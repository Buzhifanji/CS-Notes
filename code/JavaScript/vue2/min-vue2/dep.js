class Dep {
	constructor() {
		// 存储观察者的数组
		this.subs = [];
	}
	/**
     * 添加观察者
     * @param {*} sub 
     */
	addSub(sub) {
		// 判断是否是观察者
		sub && sub.update && this.subs.push(sub);
	}
	/**
     * 通知所有观察者
     */
	notify() {
		this.subs.forEach((sub) => sub.update());
	}
}
