<script setup>
const props = defineProps({
    direction: {
        type: String,
        default: "vertical"
    }
})

const separatorClass = computed(() => ({
    'separator-vertical': props.direction === 'vertical',
    'separator-horizontal': props.direction === 'horizontal'
}));
</script>

<template>
    <div :class="separatorClass">

    </div>
</template>

<style scoped>
.separator-vertical{
    @apply w-[1px] h-[60%] bg-border;
}
.separator-horizontal{
    @apply w-[60%] h-[1px] bg-border;
}
</style>