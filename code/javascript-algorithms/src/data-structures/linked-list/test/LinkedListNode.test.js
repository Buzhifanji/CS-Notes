import LinkedListNode from "../LinkedListNode";

// 测试链表节点
describe('LinkedListNode', () => {
    // 验证 节点value 是 基本类型
    it('should create list node with value', () => {
        const node = new LinkedListNode(1)

        expect(node.value).toBe(1)
        expect(node.next).toBeNull()
    })
    // 验证节点value 是 object
    it('should create list node width object as a value', () => {
        const nodeValue = { value: 1, key: 'test'}
        const node = new LinkedListNode(nodeValue)

        expect(node.value.value).toBe(1)
        expect(node.value.key).toBe('test')
        expect(node.next).toBeNull()
    })
    // 验证 节点value、next
    it('should link nodes together', () => {
        const node2 = new LinkedListNode(2)
        const node1 = new LinkedListNode(1, node2)

        expect(node1.next).toBeDefined()
        expect(node2.next).toBeNull()
        expect(node1.value).toBe(1)
        expect(node1.next.value).toBe(2)
    })

    // 验证 节点默认的toString 方法
    it('should convert node to string', () => {
        const node = new LinkedListNode(1)

        expect(node.toString()).toBe('1')
        node.value = 'string value'
        expect(node.toString()).toBe('string value')
    })

    // 验证 节点自定义的toString 方法
    it('should convert node to be string with custom stringifier', () => {
        const nodeValue = { value: 1, key: 'test'}
        const node = new LinkedListNode(nodeValue)
        const toStringCallback = value => `value: ${value.value}, key: ${value.key}`

        expect(node.toString(toStringCallback)).toBe('value: 1, key: test')
    })
})