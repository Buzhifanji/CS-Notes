const net = require('net')

const req = {
    methods: 'GET',
    ulr: '/',
    version: 'HTTP/1.1',
    header: {
        'user-agent': 'curl/7.71.1',
        accept: '*/*',
    },
    body: ''
}

const client = net.connect(80, 'www.baidu.com', (data) => {

    console.log("连接到服务器！");
    console.log('req', data)
})

client.on('data', data => {
    console.log(data.toString())
    client.end()
})

client.on('end', () => {
    console.log("断开与服务器的连接");
})