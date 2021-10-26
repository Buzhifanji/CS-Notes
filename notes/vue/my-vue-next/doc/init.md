linux 命令

mkdir example 新建文件夹
touche index.js 新建文件

package.json

"private": true, // 私有属性，打包时忽略该包
"workspaces" : [
    // npm 多包管理，使用 packages 下的工作目录(工作范围)
    "packages/*"
]
"buildOPtions": { // 自定义属性
    "formats":[ // 打包格式

    ]
}
