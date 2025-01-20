<template>
    <div class="flex-place-center rounded-lg cursor-pointer hover:bg-border h-16 border border-border w-1/2 px-4">
        <IconChevronLeft class="text-muted-foreground mr-auto" />
        <div class="flex flex-col place-items-end">
            <h1>Previous</h1>
            <p class="text-sm text-muted-foreground">{{props.prePage}}</p>
        </div>
    </div>
</template>

<script setup>
import { IconChevronLeft, IconChevronRight } from '@tabler/icons-vue';

const props = defineProps({
    prePage: {
        type: String,
        required: true
    }
})
</script>