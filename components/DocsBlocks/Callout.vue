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
    class="w-full py-3 border border-red-500 bg-red-100 dark:bg-red-950 shadow-md my-2 rounded-lg flex gap-4 p-4 "
    :class="{
        '!bg-blue-50 !border-blue-300 dark:!border-blue-700 dark:!bg-blue-950': props.type == 'info',
        '!bg-yellow-100 !border-yellow-500 dark:!border-yellow-500 dark:!bg-yellow-800': props.type == 'warning',
        '!bg-green-100 !border-green-500 dark:!bg-green-950': props.type == 'success',
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