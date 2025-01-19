<script setup>
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue';
import { Toaster, toast } from 'vue-sonner';

const copyQuick = () => {
    navigator.clipboard.writeText('npx create vdocs@latest')
    toast.success('Copy to clipboard')
}
</script>
<template>
    <div class="bg-background relative border border-border px-5 rounded-md my-2 w-full p-4 codeblock">
        <Toaster />
        <Button @click="copyQuick()" variant="outline" size="icon" class="absolute right-3 top-3">
            <IconCopy class="size-5" />
        </Button>
        <p>
            <slot />
        </p>
    </div>
</template>
