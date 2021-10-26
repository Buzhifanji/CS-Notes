// 进行打包 monerepo

const { log } = console
const fs = require('fs')
const execa = require('execa') // 开启子进程

// 获取打包目录
const dirs = fs.readdirSync('packages').filter(file => {
    // 过滤 文件
    if (!fs.statSync(`packages/${file}`).isDirectory()) {
        return false
    }
    return true
})

async function build(target) {
    log(target)
    // execa -c 执行 rollup 配置，环境变量 -env
    // 函数原型为 execa(exefile, [arguments], [options])，返回一个 Promise 对象。
    // 子进程的输出在父包中输出
    await execa('rollup', ['-c', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

// 并行 打包
async function runParaller(dirs, fn) {
    const result = []
    for (const item of dirs) {
        result.push(fn(item))
    }
    return Promise.all(result)
}
runParaller(dirs, build).then(() => {

})
log(dirs)