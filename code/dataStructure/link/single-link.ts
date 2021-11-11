// 单链表
import { LinkNode } from './interface';

class Node<T> implements LinkNode<T> {
    value: T;
    next: null | Node<T>
    constructor(value: T) {
        this.value = value;
    }
}

class SingleLink<T> {
    head: null | Node<T> = null // 头部指针
    foot: null | Node<T> = null // 尾部指针
    count: number = 0
    push(value: T) {
        // 向链表尾部添加一个新元素
        // 用 foot 缓存尾部节点，降低时间复杂度，要不然只有遍历才能尾部节点
        const node = new Node<T>(value)
        if (this.head === null) {
            // 头部没有，表示第一次插入
            this.head = node
            this.foot = node
            this.count = 1
        } else {
            this.foot.next = node
            this.foot = node
            this.count++
        }
    }
    /**
     * 移除链表尾部一个元素
     *
     * =============== 删除头部节点 ==============
     * 在头部节点不为 null 的情况下，把 head = head.next 即可
     * 代码执行顺序就有意思了 => 每次插入的时候是在尾部添加，删除的是删除头部，这不就 队列数据结构 ！！！
     * 特点：先进先出
     * 插入时间复杂度： O(1)
     * 删除时间复杂度：O(1)
     *
     * =============== 删除尾部节点 ==============
     *
     *
     *
     * @returns
     */
    remove() {
        // 移除链表尾部一个元素
        // 删除头部节点 会简单许多，在头部节点不为 null 的情况下，把 head = head.next 即可

        let result: T | undefined = undefined
        if (this.count) {
            if (this.count === 1) {
                result = this.head.value
                this.head = null
            } else if (this.count === 2) {
                result = this.head.value
                this.foot = null
            } else {
                let preFoot = null // 尾部上一个节点

            }
            this.count--
        }
        return result
    }
    isEmpty() {
        // 如果链表中不包含任何元素，返回true，如果链表长度大于0则返回false
    }
    size() {
        // 返回链表包含的元素个数
    }
    toString(): string {
        // 返回链表包含的元素个数
        return ''
    }
    forEach() {
        // 遍历节点
    }
}