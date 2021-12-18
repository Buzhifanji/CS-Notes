import LinkedList from '../linked-list/LinkedList';

export default class Stack {
    constructor() {
        // 基于列表实现 栈 
        // 出入栈的时间复杂度都是 O(1)
        this.linkedList = new LinkedList()
    }
    /**
     * 栈 是否为空
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head
    }
    /**
     * 栈 的第一个元素
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null
        }

        return this.linkedList.head.value
    }
    /**
     * 入栈
     * @param {*} value
     */
    push(value) {
        this.linkedList.prepend(value)
    }
    /**
     * 出栈
     * @return {*}
     */
    pop() {
        const removeHead = this.linkedList.deleteHead()
        return removeHead ? removeHead.value : null
    }
    /**
     * 栈 转换成数组
     * @return {*[]}
     */
    toArray() {
        return this.linkedList.toArray().map(linkedList => linkedList.value)
    }
    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.linkedList.toString(callback)
    }
}