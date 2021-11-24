// 单链表
import { LinkNode } from './interface';

// 链表是为了解决什么问题而发明的

class Node<T> implements LinkNode<T> {
    value: T;
    next: null | Node<T>
    constructor(value: T) {
        this.value = value;
    }
}

// 添加一个记录尾部节点 => 插入数据的时候，插入在尾部；删除的时候，从尾部删除 => 可实现 O(1) 的 栈数据结构
// 添加一个记录头部节点和尾部节点 => 插入数据的时候，插入在头部；删除的时候，从尾部删除 => 可实现 O(1) 的 队列数据结构

class SingleLink<T> {
    head: null | Node<T> = null // 头部指针
    foot: null | Node<T> = null // 尾部指针（用于高效删除尾部节点）
    count: number = 0
    /***
     * 优化点 缓存尾部节点， 每次更新尾部节点即可
     * 时间复杂度: 从O(n) => O(1)
     *
     * ===================== 与数组对比 ====================
     * 与数组对比：当数组空间不够的时候，需要重新申请内存，然后移动元素。
     * 时间最坏复杂度：O(n)
     *
     * 链表适合海量数据，频繁删除和插入
     *
     */
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
     * 代码执行顺序就有意思了 => 每次插入的时候是在尾部添加，删除的是删除头部，这不就 ！！！栈数据结构 ！！！
     * 特点：先进先出
     * 插入时间复杂度： O(1)
     * 删除时间复杂度：O(1)
     *
     * =============== 删除尾部节点 ==============
     * 要从尾部删除节点
     * 直接遍历 时间复杂度 O(n)
     *
     * 与插入的想法类似，缓存指向上一个节点 => 双向链表
     * 用小小的额外空间，换时间 删除的时候时间复杂度为 O(1)
     *
     * 双向链表 实现 栈数据结构
     * 特点：后进先出
     * 插入时间复杂度： O(1)
     * 删除时间复杂度：O(1)
     *
     * ===================== 与数组对比 ====================
     * 删除头部 时间复杂度 O(n)
     * 删除尾部 时间复杂度 O(1) （存在内存浪费的情况）
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
    /**
     * 查找元素
     *
     * 只能遍历查找，和数组一样 时间复杂度 O(n)
     *
     * 有没有既能继承链表的优化，又能降低 查找的时间复杂度 => 二叉树
     * 双向链表的 变形一下就变成了 二叉树: 把向前指针变成向后指针
     *
     */
    find(value: T) {

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