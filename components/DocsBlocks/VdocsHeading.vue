<script setup lang="ts">
import { IconLink } from '@tabler/icons-vue';

</script>

<template>
    <div class="w-full text-3xl font-bold  py-5 mb-2 flex-place-center gap-2">
        <IconLink class="text-muted-foreground mr-1" />
        <slot />
    </div>
</template>