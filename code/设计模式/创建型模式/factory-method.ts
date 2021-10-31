interface City {
    name: string
    food: string
    opration: Function
}

// 抽象类(只能用于继承)
abstract class CityCreator {
    constructor(        
        public name: string,
        public food: string) {  }
    public abstract factoryMethod() : City
    /**
     * name
     */
    public action() {
        const city = this.factoryMethod()
        return ``
    }
}

class BeiJingCreator extends CityCreator{
    constructor(
        public name: string,
        public food: string
    ) {
        super(super.name, super.food)
    }   
    public factoryMethod(): City {
        return new 
    }
}

class BeiJing implements City {
    constructor(
        public name: string,
        public food: string
    ) {
        
    }
    public action() {
        console.log(`${this.name}: ${this.food}`)
    }
}
// 子类 北京
class BeiJingCity extends CityCreator {
    public factoryMethod(): City {
        return new 
    }
 }

// 子类 天津
class TianJingCity extends City { }

// 子类 重启
class ChongQiCity extends City { }
