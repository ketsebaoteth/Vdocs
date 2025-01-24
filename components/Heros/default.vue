<script setup>
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconArrowUpRight, IconCopy, IconTerminal2 } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner';

const copyQuick = () => {
    navigator.clipboard.writeText('npx create vdocs@latest')
    toast.success('Copy to clipboard')
}
</script>
<template>
    <div class="hero-size bg-transparent flex place-items-center justify-center">
        <div class="flex flex-col items-center justify-center mt-[-56px] gap-5">
            <div class="relative cursor-pointer flex space-x-2 items-center z-10 rounded-full bg-background py-1.5 px-4 border border-border ">
                <span class="text-sm">Vdocs Version 1.0.1 is out now 🎉</span>
                <svg fill="none" height="16" viewBox="0 0 24 24" width="16" xmlns="http://www.w3.org/2000/svg"><path d="M10.75 8.75L14.25 12L10.75 15.25" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5"></path></svg>
            </div>

            <h1 class="text-[90px] max-w-[900px] font-bold text-foreground text-center leading-[85px] space-x-1">
                Modern, <span class="special-gradient">Readable,</span> and Efficient Docs
              </h1>
            <p class="text-lg text-center">The best place to find documentation for your favorite libraries and frameworks</p>
            <div class="actions flex-place-center gap-2">
                <Button>
                    Get Started <IconArrowRight class="text-background"/>
                </Button>
                <Button variant="outline">
                    Install Vdocs <IconArrowUpRight class="text-primary"/>
                </Button>
                <div class="quick-copy code-block flex-place-center gap-2">
                    <IconTerminal2 class="text-primary"/>
                    <span class="font-mono">npx create vdocs@latest</span>
                    <IconCopy @click="copyQuick" class="text-muted-foreground size-4 cursor-pointer ml-5"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.hero-size {
    @apply w-screen h-[calc(100vh-56px)];
}
.code-block{
    @apply text-muted-foreground text-sm p-2 py-1 border border-border rounded-md bg-background;
}
.special-gradient{
    background: #9d35ff;  /* fallback for old browsers */
    background: -webkit-linear-gradient(to right, #ff3489, #06d680);  /* Chrome 10-25, Safari 5.1-6 */
    background: linear-gradient(to right, #ff3489, #06d680); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>