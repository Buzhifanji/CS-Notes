/**
 * 原始类型
 */
const a: string = 'string'

const b: number = 100

const c: boolean = true

// 不是严格模式 以上三种类型可以设置为 null，反之不允许
// 关闭严格模式 tsconfig.json 中设置 strict：false

// 不是严格模式 const e: void = null，反之不允许
const e: void = undefined

const f: null = null

const g: undefined = undefined

const h: symbol = Symbol();

// 数组类型

// 泛型
const arr1: Array<number> = [1, 2, 3]

const arr2: number[] = [1, 2, 3]


// 枚举 【Enum】
const enum constEnum {
    Up = 1,
    Down = 2,
}

const aa: number = constEnum.Up

const fn: (a: number, b: number) => string = function (a: number, b: number): string {
    return 'ok'
}
interface Post {
    title: string;
    content: string;
    subtitle?: string; // 可选成员
    readonly sumary: string; // 只读成员
}
const hello: Post = {
    title: 'hello ts',
    content: 'a js',
    sumary: 'b js',
}

// 动态成员
interface CacheType {
    [key: string]: string
}
const cache: CacheType = {
    foo: '1',
    too: '2',
}
class Person {
    public name: string // 公共的
    private age: number // 私有的，只能类内部自己能访问
    protected gender: boolean;  // 受保护的

    constructor(name: string, age: number) {
        this.name = name
        this.age = age
        this.gender = true
    }
    sayHi(msg: string): void {
        console.log(`I am ${msg}`)
        console.log(this.age)
    }
}
const tom = new Person('tom', 18)
console.log(tom.name) // 访问成功
// console.log(tom.age)  // 访问失败
// console.log(tom.gender) // 访问失败

class Student extends Person {
    // 私有的构造函数，只能通过静态方法实例化
    private constructor(name: string, age: number) {
        super(name, age)
        console.log(tom.gender) // 访问成功
    }
    static create(name: string, age: number) {
        return new Student(name, age)
    }
}

const jack = Student.create('jack', 19)