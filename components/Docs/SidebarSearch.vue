<script setup>
    import { Input } from '@/components/ui/input';
    import { IconSearch } from '@tabler/icons-vue';
</script>
<template>
    <div class="flex-place-center w-full">
        <IconSearch class="cursor-pointer absolute size-5 ml-2 text-muted-foreground"/>
        <Input class="h-9 pl-9 w-full cursor-pointer hover:bg-muted transition-all" placeholder="Search Documentation" />
    </div>
</template>