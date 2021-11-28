export function add(a: number, b: number): number {
    return a + b
}

/**   ================= 分析: object  ======================= */


// 1. { → whitespace → } => { }
// 2. { → whitespace → string → whitespace → : → value → } => { string : value }
// 3. { → whitespace → string ... , → whitespace → string ... , ... } => { string1 : value1 , ....,  stringN : valueN, }


const enum TokenType {
    Open_object = '{',
    Close_object = '}'
}


// {a: 'd'} => {'a': 'd'}
function parseJSON(str: string) {
    let i: number = 0;
    function parseObject() {
        if (str[i] === TokenType.Open_object) {
            i++

            skipWhitespace()

            // 不是 } 的时候
            // 处理 string => whitespace -> ':' -> value -> ...
            while (str[i] !== TokenType.Close_object) {
                const key = parseString()
                // 匹配 并跳过空格
                skipWhitespace()
                // 吃掉逗号
                eatColon()

                // 匹配 value
                const value = parseValue()
            }
            i++
        }
    }
    // 跳过 空格
    function skipWhitespace() {
        while (
            str[i] === ' ' ||
            str[i] === '\n' ||
            str[i] === '\t' ||
            str[i] === '\r'
        ) {
            i++
        }
    }

    function parseString() {
        if (str[i] === '"') {
            i++
            let result = ''
            while (i < str.length && str[i] !== "") {
                const char = str[i + 1]
                if (
                    char === '"' ||
                    char === "\\" ||
                    char === "/" ||
                    char === "b" ||
                    char === "f" ||
                    char === "n" ||
                    char === "r" ||
                    char === "t"
                ) {
                    result += char
                    i++
                } else if (char === 'u') {
                    // 十六进制
                } else {
                    i += 2
                }
            }
        }
    }

    function parseValue() {

    }

    // 吃掉 冒号
    function eatColon() {
        if (str[i] !== ':') {
            throw new Error('Expected ":".')
        }
        i++
    }
    // 吃掉逗号
    function eatComma() {
        if (str[i] !== ',') {
            throw new Error('Expected ",".')
        }
        i++
    }
    function expectEscapeCharacter(strSoFar: string) {

    }

    // 打印代码片段信息
    function printCodeSnippet(message: string) {
        const from = Math.max(0, i - 10)
        const trimmed = from > 0
        const padding = (trimmed ? 4 : 0) + (i - from)
        const snippet = [
            (trimmed ? "... " : "") + str.slice(from, i + 1),
            " ".repeat(padding) + "^",
            " ".repeat(padding) + message
        ]
    }
}

