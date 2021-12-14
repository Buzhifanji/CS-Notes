export default class Comparator {
    /**
     * Constructor
     * @param {*} {function(a: *, b: *)} [compareFunction]
     * 默认是 数字/字符串 对比函数，另外支持自定义对比函数
     *
     */
    constructor(compareFunction) {
        this.compare = compareFunction || Comparator.defaultCompareFunction
    }

    /**
     * 默认
     * @param {(string|number)} a
     * @param {(string|number)} b
     * @returns
     */
    static defaultCompareFunction(a, b) {
        if (a === b) {
            return 0
        }

        return a < b ? -1 : 1
    }

    /**
     * 相等
     * @param {*} a
     * @param {*} b
     * @returns {boolean}
     */
    equal(a, b) {
        return this.compare(a, b) === 0
    }

    /**
     * 小于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThan(a, b) {
        return this.compare(a, b) < 0
    }

    /**
     * 大于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThan(a, b) {
        return this.compare(a, b) > 0
    }

    /**
     * 小于等于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    lessThanOrEqual(a, b) {
        return this.lessThan(a, b) || this.equal(a, b)
    }

    /**
     * 大于等于
     * @param {*} a
     * @param {*} b
     * @return {boolean}
     */
    greaterThanOrEqual(a, b) {
        return this.greaterThan(a, b) || this.equal(a, b)
    }

    /**
     * 翻转对比函数
     */
    reverse() {
        const compareOriginal = this.compare
        this.compare = (a, b) => compareOriginal(b, a)
    }
}