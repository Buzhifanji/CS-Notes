TypeScript笔记——枚举

枚举是一种**有穷序列**的集合，在TypeScript中，枚举类型是一种原始类型，它通过enum关键字来定义。枚举类型由零个或多个枚举成员构成，每个枚举成员都是一个命名的常量。

## 数值型枚举

数值型枚举是最常用的枚举类型，每个数值型枚举成员都表示一个具体的数字。

```typescript
enum Color {
  red = 1,
  blue = 2,
  yellow = 4,
  black = 7
}
```

### 数值型枚举语法糖

*如果在定义枚举时没有设置枚举成员的值，那么TypeScript将自动计算枚举成员的值*

第一个枚举成员的值为0，其后每个枚举成员的值等于前一个枚举成员的值加1

```typescript
enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}
```

可以为一个或多个枚举成员设置初始值

```typescript
enum Color {
  red = 1,	// 1
  blue,	// 2
  yellow = 4,	// 4
  black, // 5
}
```

### 数值型枚举与number类型

数值型枚举是number类型的**子类型**，因此允许将数值型枚举类型赋值给number类型

```typescript
enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}
const color: number = Color.red
```

注意：*number类型也能够赋值给枚举类型，即使number类型的值不在枚举成员值的列表中也不会产生错误*

```typescript
enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}

const color1: Color = 0 // Color.red
const color2: Color = 10; // 不会产生错误
```

### 枚举成员映射

对于数值型枚举，不但可以通过枚举成员名来获取枚举成员值，也可以反过来通过枚举成员值去获取枚举成员名

```typescript
enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}

Color.red // 1
Color[Color.red] // 'red'
Color[0] // 'red'
```



## 字符串枚举

在字符串枚举中，枚举成员的值为字符串，**成员必须初始化**，且没有自增长的行为。

```typescript
  enum Color {
    red = 'red',
    blue = 'blue',
    yellow = 'yellow',
    black = 'black'
  }
```

### 字符串枚举与string类型

字符串枚举是string类型的**子类型**，因此允许将字符串枚举类型赋值给string类型

```typescript
  enum Color {
    red = 'red',
    blue = 'blue',
    yellow = 'yellow',
    black = 'black'
  }
	
const color: string = Color.red
```

注意：*不允许将string类型赋值给字符串枚举类型*

## 异构型枚举

枚举中同时定义数值型枚举成员和字符串枚举成员（实际项目不推荐使用）

```typescript
enum Color {
  red = 0,
  blue = 'blue'
}
```



## const枚举类型

const枚举类型将在编译阶段被完全删除，并且在使用了const枚举类型的地方会直接将const枚举成员的值内联到代码中

```typescript
// const枚举类型
const enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}

const colors = [
  Color.red,
  Color.blue,
  Color.yellow,
  Color.balc
]

/********* const枚举类型 编译成JS后的代码 ********/
"use strict";
const colors = [
    0 /* red */,
    1 /* blue */,
    2 /* yellow */,
    3 /* black */
];


// 枚举类型
enum Color {
  red,	// 0
  blue,	// 1
  yellow,	// 2
  black, // 3
}

const colors = [
  Color.red,
  Color.blue,
  Color.yellow,
  Color.black
]

/********* 枚举类型 编译成JS后的代码 ********/
"use strict";
var Color;
(function (Color) {
    Color[Color["red"] = 0] = "red";
    Color[Color["blue"] = 1] = "blue";
    Color[Color["yellow"] = 2] = "yellow";
    Color[Color["black"] = 3] = "black";
})(Color || (Color = {}));
const colors = [
    Color.red,
    Color.blue,
    Color.yellow,
    Color.black
];
```

枚举：是一个双向键值对（可以通过值获取值，也可以通过值获取建），会入侵编译后的js代码
常量枚举：只能通过建获取值

使用建议：**如果不需要通过索引获取键值，建议用常量枚举**

## 使用示例

vue3中使用枚举示例

```typescript
// statusEnum.ts
export enum ApplyStatus {
    checkPending,  // 待审核
    success,    // 审核成功
    refuse  // 审核拒绝
}

// 获取枚举对应的 name
export function getApplyStatus(type: Status) {
    let result = '--'
    switch (type) {
        case Status.checkPending:
            result = '待审核'
            break
        case Status.success:
            result = '审核成功'
            break
        case Status.refuse:
            result = '审核拒绝'
            break
    }
    return result
}

// vue
<template>
  <div>
    	<select>
        	<option v-for="item in list"
							:key="item.value"
              :key="item.value">
                {{item.lable}}
           </option>
  		</select>
  </div>
</template>
<script lang="ts">
  	import { defineComponent } from 'vue';
  	import { ApplyStatus, getApplyStatus} from './statusEnum.ts'

  	export default defineComponent({
      setup() {
        const list = [
          { value: ApplyStatus.checkPending, lable: getApplyStatus(ApplyStatus.checkPending) },
          { value: ApplyStatus.success, lable: getApplyStatus(ApplyStatus.success) },
          { value: ApplyStatus.refuse, lable: getApplyStatus(ApplyStatus.refuse) },
        ]
        
        return { list }
      }
    })
</script>
```

使用好处：

1.有利于代码阅读。例如，getApplyStatus(ApplyStatus.checkPending) 与 getApplyStatus(1)，当参数直接是 1  的时候需要去查找 这个1是什么意思，而使用枚举更能清晰表达意图

2.易维护（程序不依赖枚举成员值时，能够降低代码耦合度）。例如，当需要添加一个 待提交  枚举的时候，可以在原来的基础上添加 对应的枚举即可。如果写死，则需要破坏之前的代码，因为枚举值发生了改变。

