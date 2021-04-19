/**
 * 类型推断
 * @flow
 */

function square(n) {
    return n * n
}

// Cannot perform arithmetic operation because  string [1] is not a number.Flow(unsafe-addition)
square('100') 
