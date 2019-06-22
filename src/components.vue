<template>
    <div>
        <div class="component" draggable="true" data-component-name="HelloWorld" @dragstart="handleDragStart">HelloWorld</div>
    </div>
</template>
<script>
import HelloWorld from '@/components/HelloWorld';
export default {
    components: {
        HelloWorld
    },
    methods: {
        handleDragStart(e) {
            const target = e.target;
            console.log(target.getAttribute('data-component-name'));
            e.dataTransfer.setData('info', JSON.stringify({ componentName: e.target.getAttribute('data-component-name') }));
        }
    }
};
</script>
<style lang="scss" scoped>
.component {
    user-select: none;
    cursor: pointer;
}
</style>
