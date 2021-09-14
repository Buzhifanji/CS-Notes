const isObject = (value) => value && typeof value === 'object'
const convert = (target) => isObject(target) ? reactive(target) : target
const isOwn = (target, key) => Reflect.getOwnPropertyDescriptor(target, key)

export function reactive(target) {
    if (!isObject(target)) return

    const hander = {
        get(target, key, receiver) {
            debugger
            // console.log('get', key)
            const result = convert(Reflect.get(target, key, receiver))
            if (result && activeEffect) {
                track(target, key)
            }
            return result
        },
        set(target, key, value, receiver) {
            const oldValue = Reflect.get(target, key, receiver)
            let result = true
            if (oldValue !== value) {
                // console.log('set', key, value)
                result = Reflect.set(target, key, value, receiver)
                trigger(target, key)
            }
            return result
        },
        deleteProperty(target, key) {
            const hasKey = isOwn(target, key)
            const result = Reflect.deleteProperty(target, key)
            if (hasKey && result) {
                console.log('delete', key)
            }
            return result
        }
    }
    return new Proxy(target, hander)
}

let activeEffect = null
export function effect(callback) {
    activeEffect = callback
    callback()
    activeEffect = null
}

let targetMap = new WeakMap()
export function track(target, key) {
    debugger
    if (!activeEffect) return

    let depsMap = targetMap.get(target)
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()))
    }

    let dep = depsMap.get(key)
    if (!dep) {
        depsMap.set(key, (dep = new Set()))
    }
    dep.add(activeEffect)
}

export function trigger(target, key) {
    debugger
    const depsMap = targetMap.get(target)

    if (!depsMap) return

    const dep = depsMap.get(key)
    if (!dep) return

    dep.forEach(effect => {
        effect()
    })
}