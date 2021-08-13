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
        const dep = new Dep()
        const _this = this
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
                // 处理修改的时候，是新增对象的情况
                _this.walk(value)
                // 发送通知
                dep.notify()
            }
        })
    }
}