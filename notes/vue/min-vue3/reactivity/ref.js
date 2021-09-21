import { reactive } from "./reactivity.js"
import { isObject } from "../shared/index.js"
import { createDep } from "./dep.js"
import { isTracking, track, trackEffects, triggerEffects } from "./effect"

class RefImpl {
    constructor(value) {
        this._rawValue = value
        // 如果 value 是个对象，那么需要 调用 reactive 转化成响应式对象
        this._value = convert(value)
        this.dep = createDep()
    }
    get value() {
        // 收集依赖
        trackRefValue(this)
        return this._value
    }

    set value(newValue) {
        // 当新值不等于旧值的时候
        if(hasChange(newValue, this._rawValue)) {
            // 更新值
            this._value = convert(newValue)
            this._rawValue = newValue;
            // 触发依赖
            triggerRefValue(this)
        }
    }
}
export function ref(value) {
    return createRef(value)
}

function createRef(value) {
    const refImpl = new RefImpl(value)
    return refImpl
}

function convert(value) {
    return isObject(value) ? reactive() : value
}

export function triggerRefValue(ref) {
    triggerEffects(ref.dep)
}

export function trackRefValue(ref) {
    if(isTracking()) {
        trackEffects(ref.dep)
    }
}