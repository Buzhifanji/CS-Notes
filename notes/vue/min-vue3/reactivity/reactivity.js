import { mutableHanlers, readonlyHandlers, shallowReaonlyHandlers } from './baseHandlers.js'

// 定义 reactivity 类型
const IS_REACTIVE = '__v_isReactive' // 响应式对象
const IS_READONLY = '__v_isReadonly' // 只读响应式对象
const RAW = '__v_raw' //
export const ReactiveFlags = { IS_REACTIVE, IS_READONLY, RAW }

export const reactiveMap = new WeakMap() // 存储 响应式对象
export const readonlyMap = new WeakMap() // 存储 只读响应式对象
export const shallowReaonlyMap = new WeakMap() // 存储 浅层的层只读响应式对象

// 定义 reactive 普通对象转换响应式对象 函数
export function reactive(target) {
    return createReactiveObject(target, reactiveMap, mutableHanlers)
}

// 定义 readonly 普通对象 转换 只读响应式对象 函数
export function readonly(target) {
    return createReactiveObject(target, readonlyMap, readonlyHandlers)
}


export function shallowReadonly(target) {
    return createReactiveObject(
        target,
        shallowReaonlyMap,
        shallowReaonlyHandlers,
    )
}

export function isProxy(value) {
    return isReactive(value) || isReadonly(value)
}

export function isReadonly(value) {
    return !!value[ReactiveFlags[IS_READONLY]]
}

export function isReactive(value) {
    // 如果 value 是 proxy 的话 => 会触发 get 操作，createGetter里面会判断 IS_REACTIVE
    // 如果 value 是普通对象的话
    // 那么会返回 undefined ，那么 !value 是 true, !!value 是false
    return !!value[ReactiveFlags.IS_REACTIVE]
}

// 将 proxy 转换 成普通对象
export function toRaw(observed) {
    // 这里 会先 observed 自身判断，当传入的不是 相应式对象时候就返回自身
    // 如果 是 proxy 的话，会触发 get 操作，createGetter里面会判断 RAW
    // 如果 不是 proxy 的话，则返回 自身；observed 有可是 null、undefined
    const raw = observed && observed[ReactiveFlags.RAW]
    return raw ? toRaw(raw) : observed
}

// 创建响应式对象
function createReactiveObject(target, proxyMap, baseHandlers) {
    // 核心就是 proxy
    // 目的是可以侦听到用户 get 或者 set 的动作
    const existingProxy = proxyMap.get(target)

    // 如果命中的话就直接返回就好了
    // 使用缓存做的优化点
    if (existingProxy) {
        return existingProxy;
    }

    const proxy = new Proxy(target, baseHandlers)

    // 缓存 proxy
    proxyMap.set(target, proxy)
    return proxy
}