import Heap from "./Heap";

export default class MinHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondeElement) {
        return this.compare.lessThanOrEqual(firstElement, secondeElement)
    }
}