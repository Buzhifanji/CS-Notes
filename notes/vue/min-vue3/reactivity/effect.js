import { extend } from '../shared/index.js'
import { createDep } from './dep.js'

let activeEffect = 0
let shoulTrack = false
const targetMap = new WeakMap()
const effectStack = []; // effect 执行拽

export class ReactiveEffect {
    active = true
    deps = []
    constructor(fn, scheduler) {
        this.fn = fn
        this.scheduler = scheduler
        console.log("创建 ReactiveEffect 对象");

        // ------ recordEffectScope 源码中 有记录当前作用域功能
    }
    run() {
        console.log('run')
        // 执行 fn  但是不收集依赖
        if (!this.active) {
            return this.fn()
        }

        // 把 this 赋值给 当前模块的 activeEffect
        activeEffect = this
        // 可以开始收集依赖了
        shoulTrack = true
        // 执行用户传入的 fn
        console.log("执行用户传入的 fn");
        const result = this.fn()

        // 重置
        shoulTrack = false
        activeEffect = undefined
        return result
        // if (!effectStack.includes(this)) {
        
            // 并存储 当前 this到 effectStack
            // effectStack.push(activeEffect)
            // 可以开始收集依赖了
            // enableTracking()

        // }
    }
    stop() {
        if (this.active) {
            cleanupEffect(this)
            if (this.onStop()) {
                this.onStop()
            }
            // 如果第一次执行 stop 后 active 就 false 了
            // 这是为了防止重复的调用，执行 stop 逻辑
            this.active = false
        }
    }
}

// 清除 effect
function cleanupEffect(effect) {
    const { deps } = effect
    if (deps.length) {
        deps.forEach(dep => {
            dep.delete()
        });
        // 执行 依赖 删除操作后，把存储依赖的长度设置0
        // 这是为了彻底清除依赖
        dep.length = 0
    }
}
/**
 * 1. 初始化 effect
 * 2. 合并 effect 属性
 * 3. 如果不是设置延迟属性，则立即执行 _effect.run
 * 4. 返回 runner 让用户自行选择调用时机
 * @param {*} fn
 * @param {*} options
 * @returns
 */
export function effect(fn, options) {
    const _effect = new ReactiveEffect(fn)
    // 把用户传过来的值合并到 _effect 对象上去
    if (options) {
        extend(_effect, options)
    }

    // 如果不是 延迟执行
    if (!options || !options.lazy) {
        _effect.run()
    }

    // 把 _effect.run 这个方法返回
    // 让用户可以自行选择调用的时机（调用 fn）
    const runner = _effect.run.bind(_effect)
    runner.effect = _effect
    return runner
}

export function stop(runner) {
    runner.effect.stop()
}

export function track(target, type, key) {
    if (!isTracking()) {
        return
    }

    console.log(`触发 track -> target: ${target} type:${type} key:${key}`);

    // WeakMap 存储依赖 key => target; value => Map
    let depsMap = targetMap.get(target)
    if (!depsMap) {
        depsMap = new Map()
        targetMap.set(target, depsMap)
    }

    // 接上面的逻辑
    // 整体数据结构
    // WeakMap: key => target;  value => Map
    // Map: key => key; value => Set
    let dep = depsMap.get(key)
    if (!dep) {
        dep = createDep()
        depsMap.set(key, dep)
    }

    // 追踪依赖 数据
    trackEffects(dep)
}

// 收集依赖
export function trackEffects(dep) {
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect)
        activeEffect.deps.push(dep)
    }
}

export function trigger(target, type, key) {
    // 确保依赖数据 在 targetMap 中
    const despMap = targetMap.get(target)
    if (!despMap) {
        return
    }

    //
    const dep = despMap.get(key)
    if (!dep) {
        return
    }
    // 源码中 存在 多种类型,例如 clear add set 等等
    // 不同类型 需要把他们都取出来，存放到数组中，然后通过 set 去重
    // 目前只实现了一个 中 get 类型，省略了存放数组，转为set操作，因为 通过despMap.get(key) 拿到的就是一个set
    triggerEffects(createDep(dep))
}

export function triggerEffects(dep) {
    // 执行收集到的所有的 effect 的 run 方法
    for (const effect of dep) {
        if (effect.scheduler) {
            // scheduler 可以让用户自己选择调用的时机
            effect.scheduler()
        } else {
            effect.run()
        }
    }
}

// 判断是否 在收集依赖中
export function isTracking() {
    return shoulTrack && activeEffect !== undefined
}

const trackStack = []; // 存储 track 栈
// 开始收集依赖
export function enableTracking() {
    trackStack.push(shoulTrack)
    shoulTrack = true
}

// 停止收集依赖
export function pauseTracking() {
    trackStack.push(shoulTrack)
    shoulTrack = false
}