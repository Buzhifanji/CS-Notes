// 进行打包 monerepo

const execa = require('execa') // 开启子进程

async function build(target) {
    // execa -c 执行 rollup 配置，环境变量 -env
    // 函数原型为 execa(exefile, [arguments], [options])，返回一个 Promise 对象。
    // 添加 -w 自动检测，并打包
    // 子进程的输出在父包中输出
    await execa('rollup', ['-cw', '--environment', `TARGET:${target}`], { stdio: 'inherit' })
}

build('reactivity')