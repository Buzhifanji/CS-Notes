class Observer {
    constructor(data) {
        this.walk(data)
    }
    walk(data) {
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(data, key, value) {
        // 递归处理 嵌套对象
        this.walk(value)
        const _this = this
        const dep = new Dep()
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
				// 收集依赖
				Dep.target && dep.addSub(Dep.target);
				// 这里val不能通过data[value]获取，否则会陷入自调用死循环
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
				value = newValue;
				// 如果value是对象，则继续设置它下面的成员为响应式数据
				_this.walk(newValue);
				// 发送通知
				dep.notify();
            }
        })
    }
}