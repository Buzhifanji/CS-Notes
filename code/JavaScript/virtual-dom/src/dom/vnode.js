export function vnode(tagName, data, children, text,el) {
    return {
        tagName,
        data,
        children,
        text,
        el
    }
}