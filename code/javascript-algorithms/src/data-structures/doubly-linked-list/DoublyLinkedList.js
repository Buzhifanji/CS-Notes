import Comparator from "../../utils/comparator/Comparator";
import DoublyLinkedListNode from "./DoublyLinkedListNode";

export default class DoublyLinkedList {
    /**
     * @param {Function} [comparatorFunction]
     */
    constructor(comparatorFunction) {
        /** 头部节点 @var DoublyLinkedListNode */
        this.head = null
        /** 尾部节点 @var DoublyLinkedListNode */
        this.tail = null
        this.compare = new Comparator(comparatorFunction)
    }
    /**
     * 头部插入节点
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    prepend(value) {
        const newNode = new DoublyLinkedListNode(value, this.head)

        // 如果有头部节点，因为是双链表，所以需要额外处理 previous 指针
        if (this.head) {
            this.head.previous = newNode
        }
        this.head = newNode

        // 没有尾部节点，也就是往空链表里添加节点，此时需要设置尾部节点的指针
        if (!this.tail) {
            this.tail = newNode
        }

        return this
    }
    /**
     * 尾部插入节点
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    append(value) {
        const newNode = new DoublyLinkedListNode(value)

        // 空链表里添加节点
        if (!this.head) {
            this.head = newNode
            this.tail = newNode

            return this
        }

        // 链表尾部插入节点
        this.tail.next = newNode
        // 链接 尾部节点 指向上一个节点的指针 的内容
        newNode.previous = this.tail
        // 更新尾部节点 指针
        this.tail = newNode

        return this
    }
    /**
     * 删除指定内容的节点
     * @param {*} value
     * @return {DoublyLinkedList}
     */
    delete(value) {
        if (!this.head) {
            return null
        }

        let deleteNode = null
        let currentNode = this.head

        while (currentNode) {
            if (this.compare.equal(currentNode.value, value)) {
                deleteNode = currentNode

                if (deleteNode === this.head) {
                    // 删除的节点是头部

                    this.head = deleteNode.next

                    // 设置 头部节点的上一个节点为null
                    if (this.head) {
                        this.head.previous = null
                    }

                    // 删除的节点 正好是尾部节点
                    if (deleteNode === this.tail) {
                        this.tail = null
                    }
                } else if (deleteNode === this.tail) {
                    // 删除的节点是尾部
                    this.tail = deleteNode.previous
                    this.tail.next = null
                } else {
                    // 删除中间节点
                    const previousNode = deleteNode.previous
                    const nextNode = deleteNode.next

                    previousNode.next = nextNode
                    nextNode.previous = previousNode
                }
            }
            currentNode = currentNode.next
        }

        return deleteNode
    }
    /**
     * 查找符合条件的节点
     * @param {Object} findParams
     * @param {*} findParams.value
     * @param {function} [findParams.callback]
     * @return {DoublyLinkedListNode}
     */
    find({ value = undefined, callback = undefined }) {
        if (!this.head) {
            return null
        }

        let currentNode = this.head
        while (currentNode) {
            // 自定义 查找值方法
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
     * @return {DoublyLinkedListNode}
     */
    deleteTail() {
        // 空链表
        if (!this.tail) {
            return null
        }

        // 只有一个节点的链表
        if (this.head === this.tail) {
            const deleteTail = this.tail
            this.tail = null
            this.head = null

            return deleteTail
        }

        // 两个和两个以上的节点的链表
        const deleteTail = this.tail
        this.tail = deleteTail.previous
        this.tail.next = null

        return deleteTail
    }
    /**
     * 删除头部节点
     * @return {DoublyLinkedListNode}
     */
    deleteHead() {
        // 空链表
        if (!this.head) {
            return
        }

        const deleteHead = this.head
        if (this.head.next) {
            // 两个或两个节点以上的链表
            this.head = deleteHead.next
            this.head.previous = null
        } else {
            // 一个节点的链表
            this.head = null
            this.tail = null
        }

        return deleteHead
    }
    /**
     * 链表转数组
     * @return {DoublyLinkedListNode[]}
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
    /**
     * 数组转链表
     * @param {*[]} values - Array of values that need to be converted to linked list.
     * @return {DoublyLinkedList}
     */
    fromArray(values) {
        values.forEach(value => this.append(value))

        return this
    }
    toString(callback) {
        return this.toArray().reduce((accur, node) => {
            // 第一个 是空字符串，不需要添加逗号
            const isComman = accur ? ',' : ''
            return accur + isComman + node.toString(callback)
        }, '')
    }
    reverse() {
        let currentNode = this.head
        let previousNode = null
        let nextNode = null

        while (currentNode) {
            // 缓存 当前节点 节点
            nextNode = currentNode.next
            previousNode = currentNode.previous

            currentNode.previous = nextNode
            currentNode.next = previousNode

            previousNode = currentNode
            currentNode = nextNode
        }

        this.tail = this.head
        this.head = previousNode

        return this.head
    }
}