const net = require('net')

const server = net.createServer(socket => {
    console.log("client connected");
    socket.on('data', data => {
        console.log("Server接收: " + data.toString());
    })
    socket.on('end', () => {
        console.log("客户端关闭连接");
    })
    socket.end("Hello I am \r\n");
})

server.listen(3000, () => {
    console.log("server is listening at 3000");
})