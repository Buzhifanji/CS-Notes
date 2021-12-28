import Heap from "./Heap";

export default class MaxHeap extends Heap {
    pairIsInCorrectOrder(firstElement, secondeElement) {
        return this.compare.greaterThanOrEqual(firstElement, secondeElement)
    }
}