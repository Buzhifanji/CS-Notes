import { mutableHanlers } from './baseHandlers.js'

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
    return createReactiveObject(target, readonlyMap, )
}

function createReactiveObject() {

}