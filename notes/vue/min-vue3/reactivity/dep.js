// 用 set 数据结构 存储 effect

export const createDep = (effects) => {
    const dep = new Set(effects)
    return dep
}