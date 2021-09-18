import { isObject } from '../shared/index';
import { reactive, ReactiveFlags, reactiveMap, readonly, readonlyMap, shallowReaonlyMap } from './reactivity.js';

const get = createGetter(); // 定义getter
const set = createSetter(); // 定义setter

function createGetter(isReadonly = false, shallow = false) {
    return function get(target, key, receiver) {
        // 判断 reactiveMap 是否存储了 响应式对象
        const isExistInReactiveMap = () => key === ReactiveFlags.RAW && receiver === reactiveMap.get(target);
        // 判断 readonlyMap 是否存储了 只读响应式对象
        const isExistInReadonlyMap = () => key === ReactiveFlags.RAW && receiver === readonlyMap.get(target);
        // 判断 shallowReaonlyMap 是否存储了 只读浅层的响应式对象
        const isExistInShallowReadonyMap = () => key === ReactiveFlags.RAW && receiver === shallowReaonlyMap.get(target);


        if (key === ReactiveFlags.IS_REACTIVE) { // 已经被转换成了 响应式对象
            return !isReadonly
        } else if (key === ReactiveFlags.IS_READONLY) { // 是只读 响应式对象
            return isReadonly
        } else if (
            isExistInReactiveMap() ||
            isExistInReadonlyMap() ||
            isExistInShallowReadonyMap()
        ) {
            return target
        }

        const res = Reflect.get(target, key, receiver)

        // 浅层的响应式
        if (shallow) {
            return res
        }

        if (isObject(res)) {
            // 如果说这个 res 值是一个对象的话，那么我们需要把获取到的 res 也转换成 reactive
            // res 等于 target[key]
            return isReadonly ? readonly(res) : reactive(res)
        }
        // ????????? 问题：为什么是 readonly 的时候不做依赖收集呢
        // readonly 的话，是不可以被 set 的， 那不可以被 set 就意味着不会触发 trigger
        // 所有就没有收集依赖的必要了
        if (!isReadonly) {
            // 在触发 get 的时候进行依赖收集
            track(target, 'get', key)
        }
        return res
    }
}

function createSetter() {
    return function set(target, key, value, receiver) {
        const result = Relect.get(target, key, value, receiver)

        // 在触发 set 的时候进行触发依赖
        trigger(target, 'set', key)

        return result
    }
}

export const mutableHanlers = {
    get,
    set,
}