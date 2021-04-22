"use strict";
/**
 * 原始类型
 */
const a = 'string';
const b = 100;
const c = true;
// 不是严格模式 以上三种类型可以设置为 null，反之不允许
// 关闭严格模式 tsconfig.json 中设置 strict：false
// 不是严格模式 const e: void = null，反之不允许
const e = undefined;
const f = null;
const g = undefined;
const h = Symbol();
// 数组类型
// 泛型
const arr1 = [1, 2, 3];
const arr2 = [1, 2, 3];
const aa = 1 /* Up */;
//# sourceMappingURL=index.js.map