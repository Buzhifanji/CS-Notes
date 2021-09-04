class Compiler {
    constructor(vm) {
        this.el = vm.$el
        this.vm = vm
        this.compile(this.el)
    }
    // 编译模板，处理文本节点和元素节点
    compile(el) {
        const childNodes = el.childNodes
        Array.from(childNodes).forEach(node => {
            if(this.isTextNode(node)) {
                // 处理文件节点
                this.compileText(node)
            } else if (this.isElementNode(node)) {
                // 处理元素节点
                this.compileElement(node)
            }

            // 处理深层节点
            if(node.childNodes && node.childNodes.length) {
                this.compile(node)
            }
        })
    }
    // 编译元素节点，处理指令
    compileElement(node) {
        // console.log(node.attributes)
        // 遍历元素节点中的所有属性，找到指令
        Array.from(node.attributes).forEach(attr => {
            // 获取元素属性的名称
            let attrName = attr.name

			// 判断当前的属性名称是否是指令
            if(this.isDirective(attrName)) {
                // v-text --> text
                // attrName 的形式 v-text v-model
		        // 截取属性的名称，获取 text model
                attrName = attrName.substr(2)
                const key = attr.value
                this.updader(node, key, attrName)
            }
        })
    }
    // 负责更新 DOM
	// 创建 Watcher
    updader(node, key, attrName) {
        // 处理不同的指令
        const updateFn = this[attrName + 'Updater']
        // 因为在 textUpdater等中要使用 this
        updateFn && updateFn.call(this, node, this.vm[key], key)
    }
    // 处理 v-text 指令
    textUpdater(node, value, key) {
        node.textContent = value
        // 每一个指令中创建一个 watcher，观察数据的变化
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue
        })
    }
    // v-model
    modelUpdater(node, value, key) {
        node.value = value
        // 每一个指令中创建一个 watcher，观察数据的变化
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue
        })
        // 监听视图的变化
        node.addEventListener('input', () => {
            this.vm[key] = node.value
        })
    }


    // 编译文本节点，处理插值表达式
    compileText(node) {
        // {{ msg }}
        const reg = /{\{(.+?)\}\}/
        const value = node.textContent
        if(reg.test(value)) {
            const key = RegExp.$1.trim()
            // 插值表达式中的值就是我们要的属性名称
            node.textContent = value.replace(reg, this.vm[key])

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue
            })
        }
    }
    // 判断元素属性是否是指令
    isDirective(attrName) {
        return attrName.startsWith('v-')
    }
    // 判断节点是否是文本节点
    isTextNode(node) {
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node) {
        return node.nodeType === 1
    }
}