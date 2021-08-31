import { vnode } from './vnode.js'

function isH(el) {
    return typeof el === 'object' && el.hasOwnProperty('tagName')
}

export function h(tagName, data, param) {
    // 检查参数个数
    if(arguments.length !== 3) {
        throw new Error('简易虚拟dom，必须传入三个参数！')
    }

    if(typeof param === 'string' || typeof param === 'number') {
        // h('div', {}, 'hello') 类型
        return vnode(tagName, data, undefined, param, undefined)
    } else if(Array.isArray(param)) {
        // h('div', {}, []) 类型
        const children = []
        param.forEach(el => {
            if(!Array.isArray(el)) {
                if(!isH(el)) {
                    throw new Error('传入数组参数中有项不是h函数！')
                }
            }
            children.push(el)
        })
        return vnode(tagName, data, children, undefined, undefined)
    } else if(isH(param)) {
        // h('div', {}, h()) 类型
        const children = [param]
        return vnode(tagName, data, children, undefined, undefined)
    } else {
        throw new Error('参数错误')
    }
}