// 开始标识符
const PACKET_START = 0x3;
// 结尾标识符
const PACKET_END = 0x4;
// 整个数据包长度
const TOTAL_LENGTH = 4;
// 序列号长度
const SEQ_LEN = 4;
// 数据包头部长度
const HEADER_LEN = TOTAL_LENGTH + SEQ_LEN;

/**
 *
 * @param {*} state 状态和处理函数的集合
 * @param {*} initState 初始化状态
 * @param {*} endState 结束状态
 */
function getMachine(state, initState, endState) {
    // 保存初始化状态
    let ret = initState
    let buffer
    return function(data) {
        if (ret === endState) {
            return
        }
        if (data) {
            buffer = buffer ? Buffer.concat([buffer, data]) : data
        }
        // 还没结束，继续执行
        while (ret !== endState) {
            if (!state[ret]) {
                return
            }
            // 执行状态执行函数, 返回[下一个状态，剩余数据]
            const result = state[ret](buffer)
            // 如果下一个状态是-1或者返回的数据是空说明需要更多的数据才能继续解析
            if (result[0] === -1) {
                return
            }
            // 记录下一个状态和数据
            [ret, buffer] = result
            if (!buffer.length) {
                return
            }
        }
    }
}
// 表示一个协议包
class Packet {
    constructor() {
        this.length = 0
        this.seq = 0
        this.data = null
    }
    set(field, value) {
        this[field] = value
    }
    get(field) {
        return this[this[field]]
    }
}

// 解析器状态
const PARSE_STATE = {
    PARSE_INIT: 0,
    PARSE_HEADER: 1,
    PARSE_DATA: 2,
    PARSE_END: 3,
};

// 保存当前正在解析的数据包