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
    <div class="bg-background relative border border-border rounded-md my-2 w-full p-2 px-5 codeblock">
        <Toaster />
        <Button @click="copyQuick()" variant="outline" class="absolute w-8 h-8 right-1 top-1">
            <IconCopy class="size-4" />
        </Button>
        <p>
            <pre class="overflow-x-auto">
<slot />
            </pre>
        </p>
    </div>
</template>
