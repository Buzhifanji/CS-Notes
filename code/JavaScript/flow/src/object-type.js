/**
 * 数组类型
 * @flow
 */

const obj = { foo: string, bar: number } = {foo: 'string', bar: 100}

// 可选属性
const obj = { foo?: string, bar: number } = { bar: 100 }

// 键值对集合属性
const obj3 = { [string]: string } = {}
obj3.key1 = 'value1'
obj3.key2 = 'value2'