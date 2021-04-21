/**
 * 特殊类型
 * @flow
 */

// 字面量类型
const a: 'foo' = 'foo';

// 字面量类型不会直接使用，而是配合 联合用法 使用
const type: 'success' | 'warning' | 'danger' = 'success';

// 利用 type 关键词 声明别名
type StringOrNumber = string | Number;
const b: StringOrNumber = 'string'; // 100

// maybe 类型
const gender: ?number = undefined;
// 相当于
const gender: number | null | void = undefined;
