/**
 * 类型注解
 * @flow
 */

// 函数参数类型
function square(n: number) {
    return n * n
}

// 变量类型
let num: number = 100

// 返回值类型
function foo(): number {
    return 100
}

// 无返回值类型
function bar(): void {
    console.log('bar')
}