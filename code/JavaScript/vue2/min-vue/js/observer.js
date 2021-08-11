class Observer {
    constructor(data) {
        if(data && typeof data === 'object') {
            this.walk(data)
        }
    }
    walk(data) {
        if(data && typeof data === 'object') {
            Object.keys(data).forEach(key => {
                this.defineReactive(data, key, data[key])
            })
        }
    }
    defineReactive(data, key, value) {
        const _this = this
        this.walk(data.key)
        Object.defineProperty(data, key, {
            configurable: true,
            enumerable: true,
            get() {
                return value
            },
            set(newValue) {
                if(newValue === value) {
                    return
                }
                value = newValue
                _this.walk(value)
            }
        })
    }
}