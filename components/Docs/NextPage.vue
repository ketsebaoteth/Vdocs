<template>
    <div class="flex-place-center rounded-lg cursor-pointer hover:bg-border h-16 border border-border w-1/2 px-4">
        <div>
            <h1>Next</h1>
            <p class="text-muted-foreground text-sm">{{props.nextPage}}</p>
        </div>
        <IconChevronRight class="text-muted-foreground ml-auto" />
    </div>
</template>

<script setup>
import { IconChevronRight } from '@tabler/icons-vue';

const props = defineProps({
    nextPage: {
        type: String,
        required: true
    }
})
</script>