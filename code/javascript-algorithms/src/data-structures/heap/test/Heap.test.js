import Heap from "../Heap";

describe('Heap', () => {
    it('should not allow to create instance of the Heap directle', () => {
        const instantianteHeap = () => {
            const heap = new Heap()
            heap.add(5)
        }

        expect(instantianteHeap).toThrow()
    })
})