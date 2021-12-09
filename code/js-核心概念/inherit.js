// function SuperType(name) {
//     this.name = name
// }


// SuperType.prototype.sayName = function() {
//     console.log(this.name)
// }

// function SubType(name, age) {
//     SuperType.call(this, name)
//     this.age = age
// }

// SubType.prototype = Object.create(SuperType.prototype)
// debugger
// const type = new SubType('hello', 18)
// type.sayName()

// 显式原型继承
// Object.setPropertyOf 给我两个对象，我把其中一个设置为另一个的原型
// Object.create，给我一个对象，它将作为我创建的新对象的原型
const obj_a = { a: 1 }
const obj_b = { b: 1 }
Object.setPrototypeOf(obj_b, obj_a)
console.dir(obj_b)

// 隐式原型继承

// create
const obj = {}

// linking
Object.setPrototypeOf(obj, Object.prototype)

// initlize
obj.firstname = 'li'
obj.lastname = 'ming'

console.dir(obj)

// 优化 无感知创建：不用手动去创建空对象了
function User(firstname, lastname) {
    this.firstname = firstname
    this.lastname = lastname
}

User.prototype = Object.create(Object.prototype)
User.prototype.sayFirstName = function() {
    console.log(this.firstname)
}
const user = new User('li', 'ming')
console.log('user', user)

console.dir(function test() {})

// 实现 new 操作
const createInstance = (Construtor, ...args) => {
    const instance = Object.create(Construtor.prototype)
    Construtor.call(instance, ...args)
    return instance
}
const userInstance = createInstance(User, 'li', 'lei')
console.log('userInstance', userInstance)
userInstance.sayFirstName()