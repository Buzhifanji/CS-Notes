import Comparator from "../../utils/comparator/Comparator";
import LinkedListNode from "./LinkedListNode";

export default class LinkedList {
    /**
     * @param {Function} [comparatorFunction] 可传入自定义对比函数
     */
    constructor(comparatorFunction) {
        this.head = null // 头部节点
        this.tail = null // 尾部节点
        this.compare = new Comparator(comparatorFunction) // 对比函数
    }

    /**
     * 头部插入节点
     * @param {*} value
     * @returns {LinkedList}
     */
    prepend(value) {
        // 创建一个新的节点
        const newNode = new LinkedListNode(value, this.head)
        this.head = newNode

        // 当没有尾部节点的时候，也就是此时是个空链表，需要设置尾节点
        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }

    /**
     * 尾部插入节点
     * @param {*} value
     * @returns {LinkedList}
     */
    append(value) {
        const newNode = new LinkedListNode(value)

        // 当没有头部节点的时候，也就是此时是个空链表，需要设置头尾节点
        if (!this.head) {
            this.head = newNode
            this.tail = newNode

            return this
        }

        // 把新节点链接到链表上
        this.tail.next = newNode
        this.tail = newNode

        return this
    }
    /**
     * 删除指定值
     * @param {*} value
     * @returns
     */
    delete(value) {
        if (!this.head) {
            return null
        }

        let deletedNode = null
        // 处理从头部节点开始有几个连续一样的值得情况
        // 删除 1
        // 1 -> 1 -> 2 -> 4 -> 5  ===>  2 -> 4 -> 5
        while (this.head && this.compare.equal(this.head.value, value)) {
            deletedNode = this.head
            this.head = this.head.next
        }

        let currentNode = this.head

        if (currentNode !== null) {
            while (currentNode.next) {
                if (this.compare.equal(currentNode.next.value, value)) {
                    deletedNode = currentNode.next
                    // 删除 节点
                    currentNode.next = currentNode.next.next
                } else {
                    // 继续 查询下一个节点
                    currentNode = currentNode.next
                }
            }
        }

        // 处理尾节点 被删除的时候 尾部指针
        if (this.compare.equal(this.tail.value), value) {
            this.tail = currentNode
        }

        return deletedNode
    }

    /**
     * 查找
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {LinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head

        while (currentNode) {
            // 通过 回调函数 查找value
            if (callback && callback(currentNode.value)) {
                return currentNode
            }

            if (value !== undefined && this.compare.equal(currentNode.value, value)) {
                return currentNode
            }

            currentNode = currentNode.next
        }

        return null
    }
    /**
     * 删除尾部节点
     * @return {LinkedListNode}
     */
    deleteTail() {
        if (!this.tail) {
            return null
        }

        const deleteTail = this.tail

        // 链表只有一个节点的特殊情况
        if (this.head === this.tail) {
            this.head = null
            this.tail = null

            return deleteTail
        }

        let currentNode = this.head
        // 遍历节点，直到找到尾部节点
        while (currentNode.next) {
            if (!currentNode.next.next) {
                currentNode.next = null
            } else {
                currentNode = currentNode.next
            }
        }

        this.tail = currentNode

        return deleteTail
    }
    /**
     * 删除头部节点
     * @return {LinkedListNode}
     */
    deleteHead() {
        if (!this.head) {
            return null
        }

        const deleteHead = this.head

        if (this.head.next) {
            this.head = this.head.next
        } else {
            // 链表只有一个节点的情况
            this.head = null
            this.tail = null
        }

        return deleteHead
    }
    /**
     * 数组转链表
     * @param {*[]} values
     * @returns {LinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value))

        return this
    }
    /**
     * 链表转数组
     * @return {LinkedListNode[]}
     */
    toArray() {
        const nodes = []

        let currentNode = this.head
        while (currentNode) {
            nodes.push(currentNode)
            currentNode = currentNode.next
        }

        return nodes
    }
    toString(callback) {
        return this.toArray().reduce((accur, node) => {
            // 第一个 是空字符串，不需要添加逗号
            const isComman = accur ? ',' : ''
            return accur + isComman + node.toString(callback).toString()
        }, '')
    }
    // https://zhuanlan.zhihu.com/p/106050123
    reverse() {
        let currentNode = this.head
        let prevNode = null
        let nextNode = null
        while (currentNode) {
            // 获取当前节点的下一个节点
            nextNode = currentNode.next
            // 当前节点的前一个节点指向上一个节点
            currentNode.next = prevNode
            // 上一个节点赋值给当前节点
            prevNode = currentNode
            // 当前节点赋值给下一个节点
            currentNode = nextNode
        }

        this.tail = this.head
        this.head = prevNode

        return this
    }
}