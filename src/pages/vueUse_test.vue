<template>
    <h1>测试鼠标位置</h1>
    <div>Mouse location{{ x }} and {{ y }}</div>
</template>

<script lang='ts'>
    import { defineComponent } from 'vue';
    import { useMouse } from '@vueuse/core';

    export default defineComponent({
        name: 'VueUse',
        setup() {
            const { x, y } = useMouse()

            return{
                x,
                y
            }
        }
    });
</script>

<style lang="scss" scoped></style>
