<script setup>
import { computed } from 'vue';

const props = defineProps({
    direction: {
        type: String,
        default: "vertical"
    },
    gofullwidth: {
        type: Boolean,
        default: false
    },
    gofullheight: {
        type: Boolean,
        default: false
    }
})

const separatorClass = computed(() => ({
    'separator-vertical': props.direction === 'vertical',
    'separator-horizontal': props.direction === 'horizontal',
    'separator-full-width': props.gofullwidth,
    'separator-full-height': props.gofullheight
}));
</script>

<template>
    <div :class="separatorClass"></div>
</template>

<style scoped>
.separator-vertical {
    @apply w-[1px] h-[60%] bg-border;
}
.separator-horizontal {
    @apply w-[60%] h-[1px] bg-border;
}
.separator-full-width {
    @apply w-full;
}
.separator-full-height {
    @apply h-full;
}
</style>