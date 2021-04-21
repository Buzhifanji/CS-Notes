/**
 * 数组类型
 * @flow
 */

// 泛型
const arr1: Array<number> = [ 1, 2 ];

const arr2: number[] = [ 1, 2, 3 ];

// 元组 (数组长度固定)
// 使用场景：函数有多个返回值
const foo: [String, number] = [ 'foo', 100 ];
