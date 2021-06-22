/**
 * 负责编译模板，解析指令、插值表达式
 * 
 */
class Compiler {
	constructor(el, vm) {
		this.el = el;
		this.vm = vm;
		this.compile(this.el);
	}
	/**
     * 编译模板，处理文本节点和元素节点
     * @param {*} el 
     */
	compile(el) {
		// el.childNodes是一个伪数组
		const childNodes = Array.from(el.childNode);
		childNodes.forEach((node) => {
			if (this.isTextNode(node)) {
				// 处理文本节点
				this.compileText(node);
			} else if (this.isElementNode(node)) {
				// 处理元素节点
				this.compileElement(node);
			}
			// 判断当前节点是否存在子节点，并且子节点个数大于0，需递归调用compile
			if (node.childNodes && node.childNodes.length) {
				this.compile(node);
			}
		});
	}
	/**
     * 编程元素节点，处理指令
     * @param {*} node 
     */
	compileElement(node) {
		// attributes是一个伪数组
		// 遍历元素节点中的所有属性，找到指令
		Array.from(node.attributes).forEach((attr) => {
			// 获取元素属性的名称
			// 判断当前的属性名称是否是指令
			if (this.isDirective(attr.name)) {
				this.update(node, attr);
			}
		});
	}
	/**
     * 判断是否属性是指令
     * @param {*} attrName 
     */
	isDirective(attrName) {
		return attrName.startsWith('v-');
	}
	/**
     * 判断是否是文本节点
     * @param {*} node 
     */
	isTextNode(node) {
		return node.nodeType === 3;
	}
	/**
     * 判断是否是元素节点
     * @param {*} node 
     */
	isElementNode(node) {
		return node.nodeType === 1;
	}
	// 负责更新 DOM
	// 创建 Watcher
	update(node, attr) {
		// attrName 的形式 v-text v-model
		// 截取属性的名称，获取 text model
		const attrName = attr.name.substr(2);
		// 处理不同的指令
		const fn = this[attrName + 'Update'];
		// 因为在 textUpdater等中要使用 this
		fn && fn.call(this, node, attr.value);
	}
	/**
     * 处理 v-text 指令
     * @param {*} node 
     * @param {*} key 
     */
	textUpdate(node, key) {
		node.textContent = this.vm[key];
		// 每一个指令中创建一个 watcher，观察数据的变化
		new Watcher(this.vm, key, (newValue) => {
			node.textContent = newValue;
		});
	}
	/**
     * 处理 v-model 指令
     * @param {*} node 
     * @param {*} key 
     */
	modelUpdate(node, key) {
		node.value = this.vm[key];
		// 监听视图的变化
		node.addEventLister('input', () => (this.vm[key] = node.value));
		// 每一个指令中创建一个 watcher，观察数据的变化
		new Watcher(this.vm, key, (newValue) => (node.value = newValue));
	}
	/**
     * 编译文本节点
     * @param {*} node 
     */
	compileText(node) {
		const reg = /\{\{(.+?)\}\}/;
		// 获取文本节点的内容
		const textContent = node.textContent;
		if (reg.test(textContent)) {
			// 插值表达式中的值就是我们要的属性名称
			const key = RegExp.$1.trim();
			node.textContent = this.vm.$data[key];
			new Watcher(this.vm, key, (newValue) => {
				node.textContent = newValue;
			});
		}
	}
}
