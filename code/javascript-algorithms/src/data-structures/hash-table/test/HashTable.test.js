import HashTable from "../HashTable";

describe('HashTable', () => {
    // 验证存储 hash 数组的长度
    it('should create hash table of certain size', () => {
        const defaultHashTable = new HashTable()
        expect(defaultHashTable.buckets.length).toBe(32)

        const biggerHashTable = new HashTable(64)
        expect(biggerHashTable.buckets.length).toBe(64)
    })

    // 验证 字符串 转换成 hash值得编码规则
    it('should generate proper hash for specified keys', () => {
        const hashTable = new HashTable()

        expect(hashTable.hash('a')).toBe(1)
        expect(hashTable.hash('b')).toBe(2)
        expect(hashTable.hash('abc')).toBe(6)
    })

    it('should set, read and delete data with collisions', () => {
        const hashTable = new HashTable(3)

        // 验证 hash 值
        expect(hashTable.hash('a')).toBe(1)
        expect(hashTable.hash('b')).toBe(2)
        expect(hashTable.hash('c')).toBe(0)
        expect(hashTable.hash('d')).toBe(1)

        hashTable.set('a', 'sky-old')
        hashTable.set('a', 'sky')
        hashTable.set('b', 'sea')
        hashTable.set('c', 'earth')
        hashTable.set('d', 'ocean')

        // 验证 has
        expect(hashTable.has('x')).toBe(false)
        expect(hashTable.has('b')).toBe(true)
        expect(hashTable.has('c')).toBe(true)

        const stringifier = value => `${value.key}:${value.value}`

        // 验证 set
        expect(hashTable.buckets[0].toString(stringifier)).toBe('c:earth')
        expect(hashTable.buckets[1].toString(stringifier)).toBe('a:sky,d:ocean')
        expect(hashTable.buckets[2].toString(stringifier)).toBe('b:sea')

        // 验证 get
        expect(hashTable.get('a')).toBe('sky')
        expect(hashTable.get('d')).toBe('ocean')
        expect(hashTable.get('x')).not.toBeDefined()

        // 验证delete
        hashTable.delete('a')
        expect(hashTable.delete('not-existing')).toBeNull()

        expect(hashTable.get('a')).not.toBeDefined()
        expect(hashTable.get('d')).toBe('ocean')

        hashTable.set('d', 'ocean-new')
        expect(hashTable.get('d')).toBe('ocean-new')

    })

    // 验证 hash 列表里添加对象元素
    it('should be possible to add objects to hash table', () => {
        const hashTable = new HashTable()

        hashTable.set('objectKey', { prop1: 'a', prop2: 'b' })

        const object = hashTable.get('objectKey')
        expect(object).toBeDefined()
        expect(object.prop1).toBe('a')
        expect(object.prop2).toBe('b')
    })

    it('shoud track actual keys', () => {
        const hashTable = new HashTable(3)

        hashTable.set('a', 'sky-old');
        hashTable.set('a', 'sky');
        hashTable.set('b', 'sea');
        hashTable.set('c', 'earth');
        hashTable.set('d', 'ocean');

        expect(hashTable.getKeys()).toEqual(['a', 'b', 'c', 'd'])
        expect(hashTable.has('a')).toBe(true)
        expect(hashTable.has('x')).toBe(false)

        hashTable.delete('a')

        expect(hashTable.has('a')).toBe(false)
        expect(hashTable.has('b')).toBe(true)
        expect(hashTable.has('x')).toBe(false)
    })

    it('should get all the values', () => {
        const hashTable = new HashTable(3)

        hashTable.set('a', 'alpha');
        hashTable.set('b', 'beta');
        hashTable.set('c', 'gamma');

        expect(hashTable.getValues()).toEqual(['gamma', 'alpha', 'beta']);
    })

    it('should get all the values from empty hash table', () => {
        const hashTable = new HashTable()
        expect(hashTable.getValues()).toEqual([])
    })

    it('should get all the values in case of hash collision', () => {
        const hashTable = new HashTable(3)
        // Keys 'ab' 和 'ba' 的hash值是一样的
        hashTable.set('ab', 'one')
        hashTable.set('ba', 'two')

        hashTable.set('ac', 'three')

        expect(hashTable.getValues()).toEqual(['one', 'two', 'three'])

    })
})