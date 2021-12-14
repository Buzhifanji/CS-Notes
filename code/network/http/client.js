// net 模块提供了异步的网络 API，用于创建基于流的 TCP 或 IPC 服务器 (net.createServer()) 和客户端 (net.createConnection())。
const net = require('net')

const client = net.connect(3000, () => {
    console.log("连接到服务器！")
})

let n = 3
const interval = setInterval(() => {
    const msg = 'Time ' + new Date().getTime()
    console.log("客户端发送：" + msg)
    client.write(msg)
    if (n-- === 0) {
        client.end()
        clearInterval(interval)
    }
}, 500)

client.on('end', () => {
    console.log("断开与服务器的连接");
})