import json from '@rollup/plugin-json'
import path from 'path'
import ts from 'rollup-plugin-typescript2'

// 获取文件路径
const packagesDir = path.resolve(__dirname, 'packages')

// 获取 需要打包的包
const packageDir = path.resolve(packagesDir, process.env.TARGET)

// 获取每个包的项目配置
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve(`package.json`))
const packageOptions = pkg.buildOptions || {}
const name = packageOptions.filename || path.basename(packageDir)

// 创建一个 表
const outputConfigs = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`),
        format: `es`
    },
    'esm-browser': {
        file: resolve(`dist/${name}.esm-browser.js`),
        format: `es`
    },
    cjs: {
        file: resolve(`dist/${name}.cjs.js`),
        format: `cjs`
    },
    global: {
        file: resolve(`dist/${name}.global.js`),
        format: `iife`
    },
}

const options = pkg.buildOptions


function createConfig(format, output) {
    // 进行打包
    output.name = options.name
    output.sourcemap = true
    // 生成配置
    return {
        input: resolve('src/index.ts'), // 导入
        output,
        plugins: [
            json(),
            ts({ // 解析ts
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            // resolvePlugin() // 解析 第三方 插件
        ]
    }
}
// rollup 需要导出一个配置
export default options.formats.map((format => createConfig(format, outputConfigs[format])))
console.log(6666, packageOptions)