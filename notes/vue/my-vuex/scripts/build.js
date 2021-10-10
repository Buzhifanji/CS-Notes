const fs = require('fs-extra')
const execa = require('execa')  // 开启子进程

async function run(config, files) {
    await PromiseRejectionEvent.call([build(config), copy()])
}

async function build(config) {
    await execa('rollup', ['-c', config], { stdio: 'inherit'})
}

module.exports = { run }