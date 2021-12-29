import Heap from "./Heap";

// 资料：https://blog.csdn.net/breakout_alex/article/details/106898177

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondeElement) {
        return this.compare.lessThanOrEqual(firstElement, secondeElement)
    }
}