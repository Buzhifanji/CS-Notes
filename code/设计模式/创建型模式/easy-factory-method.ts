// 抽象类(只能用于继承)
abstract class City {
    constructor(
        public name: string,
        public food: string,
    ) { }
}
// 子类 北京
class BeiJingCity extends City { }

// 子类 天津
class TianJingCity extends City { }

// 子类
class ChongQiCity extends City { }

// 建立 城市工厂 简单工厂：根据参数类型返回不同子类的实例
class CityFactory {
    static build(name: string) {
        switch (name) {
            case 'beijing':
                return new BeiJingCity('北京', '北京烤鸭')
            case 'tianjing':
                return new TianJingCity('天津', '天津麻花')
            case 'chongqi':
                return new TianJingCity('重庆', '重庆火锅')
            default:
                throw new Error('您这个城市待开发中......')
        }
    }
}

// 测试
const { log } = console
log(CityFactory.build('beijing'))
log(CityFactory.build('tianjing'))
log(CityFactory.build('chongqi'))
log(CityFactory.build('shanghai'))

// 优点：只需参数就可以得到实例，不关心实现细节
// 缺点：城市非常多的时候，switch case会变得臃肿，难以维护

// 不符合：开闭原则，增加或者删除一个城市，就需要修改判断逻辑代码。
// 开闭原则的含义是：当应用的需求改变时，在不修改软件实体的源代码或者二进制代码的前提下，可以扩展模块的功能，使其满足新的需求。