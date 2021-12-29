import MinHeap from "../MinHeap";

describe('MinHeap', () => {
    // 验证 空的最小堆
    it('should create an empty min heap', () => {
        const minHeap = new MinHeap()

        expect(minHeap).toBeDefined()
        expect(minHeap.peek()).toBeNull()
        expect(minHeap.isEmpty()).toBe(true)
    })

    it('should add items to the heap and heapify it up', () => {
        const minHeap = new MinHeap()
        minHeap.add(5)
        expect(minHeap.isEmpty()).toBe(false)
        expect(minHeap.peek()).toBe(5)
        expect(minHeap.toString()).toBe('5')

        minHeap.add(3)
        expect(minHeap.peek()).toBe(3)
        expect(minHeap.toString()).toBe('3,5')

        minHeap.add(10)
        expect(minHeap.peek()).toBe(3)
        expect(minHeap.toString()).toBe('3,5,10')

        minHeap.add(1)
        expect(minHeap.peek()).toBe(1)
        expect(minHeap.toString()).toBe('1,3,10,5')

        minHeap.add(1)
        expect(minHeap.peek()).toBe(1)
        expect(minHeap.toString()).toBe('1,1,10,5,3')

        expect(minHeap.poll()).toBe(1)
        expect(minHeap.toString()).toBe('1,3,10,5')

        expect(minHeap.poll()).toBe(1)
        expect(minHeap.toString()).toBe('3,5,10')

        expect(minHeap.poll()).toBe(3)
        expect(minHeap.toString()).toBe('5,10')
    })
    it('should poll items from the heap and heapify it down', () => {
        const minHeap = new MinHeap()

        minHeap.add(5) // 5
        minHeap.add(3) // 3,5
        minHeap.add(10) // 3, 5, 10
        minHeap.add(11) // 3, 5, 10, 11
        minHeap.add(1) // 1,3,10,11,5


        expect(minHeap.toString()).toBe('1,3,10,11,5')

        expect(minHeap.poll()).toBe(1) // 5,3,10,11 => 3,5,10,11
        expect(minHeap.toString()).toBe('3,5,10,11')

        expect(minHeap.poll()).toBe(3) // 11,5,10
        // expect(minHeap.toString()).toBe('10,5,11')
    })
})