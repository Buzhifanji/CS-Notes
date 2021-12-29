import Comparator from "../../utils/comparator/Comparator";

/**** ================= 堆 =================== */
/**
 * 基础知识：堆是一个完全的二叉树
 * 若设二叉树的高度为h，除第 h 层外，其它各层 (1～h-1) 的结点数都达到最大个数，第h层有叶子结点，并且叶子结点都是从左到右依次排布，这就是完全二叉树
 *
 * 一维数组可以作为完全二叉树的存储结构，堆排序使用的数据结构就是完全二叉树
 */
export default class Heap {
    constructor(comparatorFunction) {
        if (new.target === Heap) {
            throw new TypeError('Cannot construct Heap instance diretly')
        }

        this.heapContainer = []
        this.compare = new Comparator(comparatorFunction)
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {number}
     */
    getLeftChildIndex(parentIndex) {
        return (2 * parentIndex) + 1
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {number}
     */
    getRightChildIndex(parentIndex) {
        return (2 * parentIndex) + 2
    }
    /**
     * 获取父节点的索引
     * 此处需要重点理解
     * 依据：二叉树里的每个节点最多有两个子节点
     * @param {number} childIndex
     * @returns {number}
     */
    getParentIndex(childIndex) {
        // Math.floor(4.5)  => 4
        // Math.floor(0)    => 0
        // Math.floor(-1.1) => -2
        return Math.floor((childIndex - 1) / 2)
    }
    /**
     *
     * @param {number} childIndex
     * @returns {number}
     */
    hasParent(childIndex) {
        return this.getParentIndex(childIndex) >= 0
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {number}
     */
    hasLeftChild(parentIndex) {
        return this.getLeftChildIndex(parentIndex) < this.heapContainer.length
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {number}
     */
    hasRightChild(parentIndex) {
        return this.getRightChildIndex(parentIndex) < this.heapContainer.length
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {*}
     */
    leftChild(parentIndex) {
        return this.heapContainer[this.getLeftChildIndex(parentIndex)]
    }
    /**
     *
     * @param {number} parentIndex
     * @returns {*}
     */
    rightChild(parentIndex) {
        return this.heapContainer[this.getRightChildIndex(parentIndex)]
    }
    /**
     *
     * @param {number} childIndex
     * @returns {*}
     */
    parent(childIndex) {
        return this.heapContainer[this.getParentIndex(childIndex)]
    }
    /**
     * 兑换indexOne indexTwo 索引对应的值
     * @param {number} indexOne
     * @param {number} indexTwo
     */
    swap(indexOne, indexTwo) {
        const temp = this.heapContainer[indexTwo]
        this.heapContainer[indexTwo] = this.heapContainer[indexOne]
        this.heapContainer[indexOne] = temp
    }
    /**
     *
     * @returns {*}
     */
    peek() {
        if (this.isEmpty()) {
            return null
        }

        return this.heapContainer[0]
    }
    /**
     *
     * @returns {*}
     */
    poll() {
        if (this.isEmpty()) {
            return null
        }

        if (this.heapContainer.length === 1) {
            return this.heapContainer.pop()
        }

        const item = this.heapContainer[0]
        // 把数组中的最后一个元素移动到第一位
        this.heapContainer[0] = this.heapContainer.pop()
        this.heapifyDown()

        return item
    }
    /**
     *
     * @param {*} item
     * @returns {Heap}
     */
    add(item) {
        this.heapContainer.push(item)
        // 调整父子节点顺序
        this.heapifyUp()
        return this
    }
    /**
     *
     * @param {*} item
     * @param {Comparator} comparator
     * @returns {Heap}
     */
    remove(item, comparator = this.compare) {
        const numberOfItemsToRemove = this.find(item, comparator).length

        for (let iteration = 0; iteration < numberOfItemsToRemove; iteration += 1) {
            const indexToRemove = this.find(item, comparator).pop()

            if (indexToRemove === (this.heapContainer.length - 1)) {
                this.heapContainer.pop()
            } else {
                this.heapContainer[indexToRemove] = this.heapContainer.pop()

                const parentItem = this.parent(indexToRemove)

                if (this.hasLeftChild(indexToRemove) && !parentItem || this.pairIsInCorrectOrder(parentItem, this.heapContainer[indexToRemove])) {
                    this.heapifyDown(indexToRemove)
                } else {
                    // 调整父子节点顺序
                    this.heapifyUp(indexToRemove)
                }
            }
        }

        return this
    }
    /**
     *
     * @param {*} item
     * @param {Comparator} comparator
     * @returns {Number[]}
     */
    find(item, comparator = this.compare) {
        const foundItemIndices = []

        for (let itemIndex = 0; itemIndex < this.heapContainer.length; itemIndex += 1) {
            if (comparator.equal(item, this.heapContainer[itemIndex])) {
                foundItemIndices.push(itemIndex)
            }
        }

        return foundItemIndices
    }
    /**
     *
     * @returns {boolean}
     */
    isEmpty() {
        return !this.heapContainer.length
    }
    /**
     *
     * @returns {string}
     */
    toString() {
        return this.heapContainer.toString()
    }
    /**
     * 调整父子大小排序
     * 时间复杂度：O(N log N)
     * @param {number} [customStartIndex]
     */
    heapifyUp(customStartIndex) {
        // 数据大小不知，所以从尾部开始处理
        let currentIndex = customStartIndex || this.heapContainer.length - 1
        // 有父节点，并且满足对比条件
        while (this.hasParent(currentIndex) && !this.pairIsInCorrectOrder(this.parent(currentIndex), this.heapContainer[currentIndex])) {
            // 调换位置里的内容
            this.swap(currentIndex, this.getParentIndex(currentIndex))
            // 把父节点的索引赋值给currentIndex，继续处理父节点的排序，直到没有父节点停止
            currentIndex = this.getParentIndex(currentIndex)
        }
    }
    /**
     *
     * @param {number} [customStartIndex]
     */
    heapifyDown(customStartIndex = 0) {
        let currentIndex = customStartIndex
        let nextIndex = null

        while (this.hasLeftChild(currentIndex)) {
            if (this.hasRightChild(currentIndex) && this.pairIsInCorrectOrder(this.rightChild(currentIndex), this.leftChild(currentIndex))) {
                nextIndex = this.getRightChildIndex(currentIndex)
            } else {
                nextIndex = this.getLeftChildIndex(currentIndex)
            }

            if (this.pairIsInCorrectOrder(
                    this.heapContainer[currentIndex],
                    this.heapContainer[nextIndex]
                )) {
                break
            }

            this.swap(currentIndex, nextIndex)
            currentIndex = nextIndex
        }
    }
    /**
     *
     * @param {*} firstElement
     * @param {*} secondeElement
     */
    pairIsInCorrectOrder(firstElement, secondeElement) {
        throw new Error(`
            You have to implement heap pair comparision method for ${firstElement} and ${secondeElement} values.
        `)
    }
}