<script setup lang="ts">
import { IconMoon, IconSun } from '@tabler/icons-vue';

</script>

<template>
    <div class="px-1 py-1 rounded-full border border-border flex-place-center gap-2 relative">
        <div class="p-1 cursor-pointer z-10 text-white">
            <IconSun class="size-4" />
        </div>
        <div class="p-1 cursor-pointer z-10">
            <IconMoon class="size-4" />
        </div>
        <div class="inducator p-3 bg-primary rounded-full bg-black absolute z-0">

        </div>
    </div>
</template>