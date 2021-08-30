import { vnode } from './vnode.js'

export function path(oldVnode, newVnode) {

    if(oldVnode.el === undefined) {
        const tag = oldVnode.tagName.toLowerCase()
        oldVnode = vnode(tag, {}, [], undefined, oldVnode)
    }

    if(oldVnode.el === newVnode.el) {

    }
}