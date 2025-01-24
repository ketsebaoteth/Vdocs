<script setup>
import { Input } from '@/components/ui/input'
import { IconSearch } from '@tabler/icons-vue';
</script>

<template>
    <div class="relative flex-place-center px-2">
        <IconSearch class="cursor-pointer absolute size-5 ml-2 text-muted-foreground"/>
        <Input class="h-9 pl-9 w-[17rem] hover:w-[18rem] cursor-pointer hover:bg-muted transition-all" placeholder="Search Documentation" />
        <div class="shortcut px-2 py-[2px] rounded-md absolute right-[11px] cursor-pointer hover:text-primary hover:border-primary transition-all text-muted-foreground border border-border">
            <span class="text-xs">CTRL+K</span>
        </div>
    </div>
</template>