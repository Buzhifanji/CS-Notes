import LinkedList from '../linked-list/LinkedList';

export default class Queue {
    constructor() {
        // 通过链表来实现队列
        // 出入队列的时间复杂度都是 O(1)
        this.linkedList = new LinkedList()
    }
    /**
     * 判断队列是否为空
     * @return {boolean}
     */
    isEmpty() {
        return !this.linkedList.head
    }
    /**
     * 读取队列中第一个元素.
     * @return {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null
        }

        return this.linkedList.head.value
    }
    /**
     * 向队列添加一个元素（链表末尾添加一个元素）
     * @param {*} value 
     */
    enqueue(value) {
        this.linkedList.append(value)
    }
    /**
     * 移除队列中的一个元素
     * @returns {*}
     */
    dequeue() {
        const removeHead = this.linkedList.deleteHead()
        return removeHead ? removeHead.value : null
    }
    /**
     * @param {function} [callback]
     * @return {string}
     */
    toString(callback) {
        return this.linkedList.toString(callback)
    }
}