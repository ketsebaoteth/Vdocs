<script setup>
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconArrowUpRight, IconCopy, IconTerminal2 } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner';
import gsap from 'gsap';
import { onMounted } from 'vue';

const copyQuick = () => {
    navigator.clipboard.writeText('npx create vdocs@latest')
    toast.success('Copy to clipboard')
}



onMounted(()=>{
})
</script>
<template>
    <div class="hero-size bg-transparent flex place-items-center justify-center">
        <div class="flex flex-col relative items-center justify-center mt-[-100px] gap-3">
            <HerosDComponentsOutNow />
            <div class="details absolute top-6 left-4">
                <p class="text-foreground font-bold">Clean . Beutifull . Fast Docs</p>
              </div>
            <h1 class="title-text text-[96px] max-w-[900px] font-bold text-foreground text-center leading-[90px] space-x-1">
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
                    <span class="font-mono font-bold">npx create vdocs@latest</span>
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
    background: hsl(var(--primary));  /* fallback for old browsers */
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}
</style>