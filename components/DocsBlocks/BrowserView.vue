<template>
    <div class="w-full border-border border py-1 my-2 rounded-md">
        <div class="nav h-10 border-b border-border px-5 pr-2 flex gap-5 py-1">
            <div class="maclikeclosingbtns h-full flex place-items-center gap-1">
                <div class="redcircle p-1 rounded-full bg-red-500 w-fit h-fit"></div>
                <div class="yellowcircle p-1 rounded-full bg-yellow-500 w-fit h-fit"></div>
                <div class="greencircle p-1 rounded-full bg-green-500 w-fit h-fit"></div>
            </div>
            <div class="inputfield px-2 border border-border rounded-md flex place-items-center text-sm w-full">
                {{ props.Location }}
            </div>
        </div>
        <div class="w-full h-fit p-3">
            <slot />
        </div>
    </div>
</template>

<script setup>
const props  = defineProps({
    Location: {
        type: String,
        default: 'https://localhost:3000'
    }
})
</script>