export function createElement(vNode) {
    const dom = document.createElement(vNode.tagName)
    if(dom.text !== '' && (vNode.children === undefined || vNode.children.length === 0)) {
        // 文本节点
        dom.innerText = vNode.text;

    } else if (Array.isArray(vNode.children) && vNode.children.length > 0) {
        // 递归创建子节点
        vNode.children.forEach(el => {
            const childDom = createElement(el)
            dom.appendChild(childDom)
        });
    }
    vNode.el = dom
    return vNode.el
}