/**
 * 负责数据劫持
 * 把$data 中的成员转换成 getter/setter
 */
class Observer {
	constructor(data) {
		this.walk(data);
	}
	walk(data) {
		// 判断是否为对象，如果是对象，则遍历对象的所有属性，并设置为 getter/setter
		if (data && typeof data === 'object') {
			Object.keys(data).forEach((key) => {
				this.defineReactive(data, el, data[key]);
			});
		}
	}
	/**
     * 定义响应式成员，把对象的数据属性设置成访问器属性
     * @param {*} data 对象数据
     * @param {*} key 需要设置对象的key
     * @param {*} value 需要设置对象key对应value
     */
	defineReactive(data, key, value) {
		const dep = new Dep();
		// 处理对象中嵌套对象：如果value是对象，则继续设置它下面的成员为响应式数据
		this.walk();
		Object.defineProperty(data, key, {
			enumerable: true,
			configurable: true,
			get() {
				// 收集依赖
				Dep.target && dep.addSub(Dep.target);
				// 这里val不能通过data[value]获取，否则会陷入自调用死循环
				return value;
			},
			set(newValue) {
				// 这里val不能通过data[value]获取，否则会陷入自调用死循环
				if (newValue === value) {
					return;
				}
				value = newValue;
				// 如果value是对象，则继续设置它下面的成员为响应式数据
				this.walk(newValue);
				// 发送通知
				dep.notify();
			}
		});
	}
}
