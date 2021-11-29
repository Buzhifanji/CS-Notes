

<template>
    <h4>home</h4>
    <button @click="btnClick">click</button>
    <component v-if="currentTabComponent" :is="currentTabComponent"></component>
</template>

<script>
// 如果 想要组件命名
// vue3 实现了 自动 name 推动功能，所以可以不需要自己手动命名了

// https://v3.cn.vuejs.org/api/sfc-spec.html#%E8%87%AA%E5%8A%A8-name-%E6%8E%A8%E6%96%AD

export default {
    name: 'home'
}
</script>

<script setup>

import { defineAsyncComponent, shallowRef } from 'vue';

// 异步组件
const components = {
    AsyncComponent: defineAsyncComponent(() => import('./asyncComponent.vue'))
}


defineProps({
    msg: String
})

// 用ref 会提醒异常
// Vue received a Component which was made a reactive object. This can lead to unnecessary performance overhead, and should be avoided by marking the component with `markRaw` or using `shallowRef` instead of `ref`.
const currentTabComponent = shallowRef('')

function btnClick() {
    // 异步组件，用对象嵌套，就可以用 字符 去匹配异步组件了。
    currentTabComponent.value = currentTabComponent.value ? '' : components['AsyncComponent']
}

</script>

<style scoped>
a {
    color: #42b983;
}
</style>
