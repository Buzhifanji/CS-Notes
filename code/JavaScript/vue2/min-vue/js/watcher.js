class Watcher {
    constructor(vm, key, cb, ) {
        this.vm = vm
        this.key = key
        this.cb = cb
        // 把 watcher 对象记录到Dep类静态属性target
        Dep.target = this
        // 触发getf方法，在get方法中调用addSub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update() {
        const newValue = this.vm[this.key]
        if(this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}