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
                Dep.target && dep.addSub(Dep.target)
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
                _this.walk(value)
                dep.notify()
            }
        })
    }
}