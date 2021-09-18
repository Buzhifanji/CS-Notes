import { createDep } from './dep.js'
import { extend } from '../shared/index.js'

let activeEffect = 0
let shoulTrack = false
const targetMap = new WeakMap()

export class ReactiveEffect {
    active = true
    deps = []
    constructor(fn, scheduler) {
        this.fn = fn
        this.scheduler = scheduler
        console.log("创建 ReactiveEffect 对象");
    }
    run() {

    },
    stop() {
        
    }
}