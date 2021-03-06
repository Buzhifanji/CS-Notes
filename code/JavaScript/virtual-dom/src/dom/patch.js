import { createElement } from './createElement.js'
import { vnode } from './vnode.js'

export function path(oldVnode, newVnode) {
    // oldVnode 不是虚拟节点
    if(oldVnode.el === undefined) {
        const tag = oldVnode.tagName.toLowerCase()
        oldVnode = vnode(tag, {}, [], undefined, oldVnode)
    }
    // 新旧节点一样
    if(oldVnode.el === newVnode.el && oldVnode.key === newVnode.key) {
        // 判断新旧节点是否同一个对象
        if(oldVnode === newVnode) return
        // text
        if(newVnode.text !== undefined && (newVnode.children === undefined || newVnode.children.length === 0)) {
            
        }
    } else {
        debugger
        // 新旧节点不一样
        const newVnodeElement = createElement(newVnode)
        if(oldVnode.el !== undefined) {
            oldVnode.el.parentNode.insertBefore(newVnodeElement, oldVnode.el)
        }
    }
}