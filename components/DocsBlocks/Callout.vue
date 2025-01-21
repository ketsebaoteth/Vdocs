<script setup>
import { IconAlertCircleFilled, IconAlertTriangleFilled } from '@tabler/icons-vue';

const props = defineProps({
    type: {
        type: String,
        default: 'info'
    },
    header:{
        type: String,
        default: ''
    },
    content:{
        type: String,
        default: ''
    }
})
</script>
<template>
    <div 
    class="w-full py-3 border-2 border-background shadow-md my-2 rounded-lg flex gap-4 p-4 bg-gradient-to-b from-red-100 dark:from-red-950 to-background"
    :class="{
        '!from-blue-100 dark:!from-blue-950': props.type == 'info',
        '!from-yellow-100 dark:!from-yellow-950': props.type == 'warning',
        '!from-green-100 dark:!from-green-950': props.type == 'success',
    }"
    >
        <div class="p-2 h-fit rounded-full shadow-lg bg-background">
            <IconAlertTriangleFilled v-if="props.type == 'error'" class="text-2xl text-red-500" />
            <IconAlertCircleFilled v-if="props.type == 'warning'" class="text-2xl text-yellow-500" />
            <IconAlertCircleFilled v-if="props.type == 'info'" class="text-2xl text-blue-500" />
            <IconAlertCircleFilled v-if="props.type == 'success'" class="text-2xl text-green-500" />
        </div>
        <div class="content flex flex-col py-1 gap-1">
            <h3 class="font-semibold">{{props.header}}</h3>
            <p>
                {{ props.content }}
            </p>
        </div>
    </div>
</template>

<style scoped>

</style>