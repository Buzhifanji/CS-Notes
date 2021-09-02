import { h } from './dom/h.js'
import { path } from './dom/patch.js'


// 生产虚拟节点
const vnode1 = h('div', {}, 'hello vnode')

console.log('vnode1',vnode1)

const vnode2 = h('ul', {}, [
    h('li', {}, [
        h('ul', {}, [
            h('li', {}, 'a-1'),
            h('li', {}, 'a-2'),
            h('li', {}, 'a-3'),
        ])
    ]),
    h('li', {}, 'b'),
    h('li', {}, 'c'),
    h('li', {}, 'd'),
    h('li', {}, 'e')
])
console.log('vnode2',vnode2)

const vnode3 = h('div', {}, h('span', {}, 'A'))
console.log('vnode3', vnode3)

const app = document.querySelector('#app')
path(app, vnode2)
//