class Vue {
    constructor(options) {
        // 1. 通过属性保存选项的数据
        this.$options = options || {}   //
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 2. 把 data 中的成员转换成 getter/setter,注入到vue实例中
        this._proxyData(this.$data)
        // 3. 调用observer对象，监听数据的变化
        new Observer(this.$data)
        // 4. 调用 compiler 对象，解析指令和差值表达式
        new Compiler(this)
    }
    // 代理数据
    _proxyData(data) {
        Object.keys(data).forEach(key => {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get() {
                    return data[key]
                },
                set(newValue) {
                    if(newValue === data[key]) {
                        return
                    }
                    data[key] = newValue
                }
            })
        })
    }
}