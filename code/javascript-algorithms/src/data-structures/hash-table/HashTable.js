import LinkedList from "../linked-list/LinkedList";

const defaultHashTableSize = 32

export default class HashTable {
    constructor(hashTableSize = defaultHashTableSize) {
        // 创建 哈希列表初始值，内容存储在数组中，默认长度是32的，每个元素是空链表
        this.buckets = Array(hashTableSize).fill(null).map(() => new LinkedList())

        this.keys = {}
    }
    /**
     * 字符串转换成hash值
     * @param {*} key
     * @returns
     */
    hash(key) {
        const hash = Array.from(key).reduce(
            // charCodeAt() 方法返回 0 到 65535 之间的整数，表示给定索引处的 UTF-16 代码单元
            (hashAccumulator, keySymbol) => (hashAccumulator + keySymbol.charCodeAt(0)), 0
        )
        // % 取余
        return hash % this.buckets.length
    }
    set(key, value) {
        const keyHash = this.hash(key)
        this.keys[key] = keyHash
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({ callback: nodeValue => nodeValue.key === key })

        if (!node) {
            bucketLinkedList.append({ key, value })
        } else {
            node.value.value = value
        }
    }
    delete(key) {
        const keyHash = this.hash(key)
        delete this.keys[key]
        const bucketLinkedList = this.buckets[keyHash]
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })

        if (node) {
            return bucketLinkedList.delete(node.value)
        }

        return null
    }

    get(key) {
        const bucketLinkedList = this.buckets[this.hash(key)]
        const node = bucketLinkedList.find({ callback: (nodeValue) => nodeValue.key === key })
        return node ? node.value.value : undefined
    }

    has(key) {
        return Object.hasOwnProperty.call(this.keys, key)
    }

    getKeys() {
        return Object.keys(this.keys)
    }
    getValues() {
        return this.buckets.reduce((values, bucket) => {
            const bucketValues = bucket.toArray().map(linkedListNode => linkedListNode.value.value)
            return values.concat(bucketValues)
        }, [])
    }
}