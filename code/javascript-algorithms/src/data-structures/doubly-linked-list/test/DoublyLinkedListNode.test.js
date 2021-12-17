import DoublyLinkedListNode from "../DoublyLinkedListNode";

describe('DoublyLinkedListNode', () => {
    // 验证 基本类型节点
    it('DoublyLinkedListNode', () => {
        const node = new DoublyLinkedListNode(1)

        expect(node.value).toBe(1)
        expect(node.next).toBeNull()
        expect(node.previous).toBeNull()
    })

    // 验证 对象类型 节点
    it('should create list node with object as a value', () => {
        const nodeValue = { value: 1, key: 'test' }
        const node = new DoublyLinkedListNode(nodeValue)

        expect(node.value.value).toBe(1)
        expect(node.value.key).toBe('test')
        expect(node.next).toBeNull()
        expect(node.previous).toBeNull()
    })

    // 验证 关联节点
    it('should link nodes together', () => {
        const node2 = new DoublyLinkedListNode(2)
        const node1 = new DoublyLinkedListNode(1, node2)
        const node3 = new DoublyLinkedListNode(10, node1, node2)

        expect(node1.next).toBeDefined()
        expect(node1.previous).toBeNull()
        expect(node2.next).toBeNull()
        expect(node2.previous).toBeNull()
        expect(node3.next).toBeDefined()
        expect(node3.previous).toBeDefined()

        expect(node1.value).toBe(1)
        expect(node1.next.value).toBe(2)
        expect(node3.next.value).toBe(1)
        expect(node3.previous.value).toBe(2)
    })

    // 验证 节点默认的 toString 方法
    it('should convert node to string', () => {
        const node = new DoublyLinkedListNode(1)

        expect(node.toString()).toBe('1')

        node.value = 'string value'
        expect(node.toString()).toBe('string value')
    })

    // 验证 自定义 toString 方法
    it('should convert node to string with custom stringifier', () => {
        const nodeValue = { value: 1, key: 'test' }
        const node = new DoublyLinkedListNode(nodeValue)
        const toStringCallback = value => `value: ${value.value}, key: ${value.key}`

        expect(node.toString(toStringCallback)).toBe('value: 1, key: test')
    })
})