<script setup>
import { Button } from '@/components/ui/button'
import { IconArrowRight, IconArrowUpRight, IconCopy, IconTerminal2 } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner';
import gsap from 'gsap';
import { onMounted } from 'vue';
import SplitType from 'split-type';

const copyQuick = () => {
    navigator.clipboard.writeText('npx create vdocs@latest')
    toast.success('Copy to clipboard')
}


function animateText(){
    const textWords = SplitType.create(".discription",{types: "words"})
    gsap.set(".discription", { y: 0, opacity: 1 });
    textWords.words.forEach(element => {
        gsap.fromTo(".word",{
            y: 10,
            opacity: 0,
            duration: 0.5,
            stagger: 0.04
        },{
            y: 0,
            opacity: 1,
            duration: 0.5,
            stagger: 0.04
        })
    });
}

function animateActionButtons(){
gsap.fromTo(".heroactions",{
    y: 20,
    opacity: 0,
    duration: 1,
    stagger: 0.04,
    ease: "power1.inOut"
},{
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.04,
    ease: "power1.inOut"
})
}



onMounted(()=>{
    animateText();
    animateActionButtons();
    
})
</script>
<template>
    <div class="hero-size bg-transparent flex place-items-center justify-center">
        <div class="flex flex-col relative items-center justify-center mt-[-100px] gap-3">
            <HerosDComponentsOutNow />
            <div class="details opacity-0 absolute top-6 left-4">
                <p class="text-foreground font-bold">Clean . Beutifull . Fast Docs</p>
              </div>
            <HerosDComponentsTextHeading />
            <p class="text-lg text-center discription">The best place to find documentation for your favorite libraries and frameworks</p>
            <div class="actions flex-place-center gap-2">
                <Button class="heroactions">
                    Get Started <IconArrowRight class="text-background"/>
                </Button>
                <Button class="heroactions" variant="outline">
                    Install Vdocs <IconArrowUpRight class="text-primary"/>
                </Button>
                <div class="heroactions quick-copy code-block flex-place-center gap-2">
                    <IconTerminal2 class="text-primary"/>
                    <span class="font-mono font-bold">npx create vdocs@latest</span>
                    <IconCopy @click="copyQuick" class="text-muted-foreground size-4 cursor-pointer ml-5"/>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.discription{
    opacity: 0;
}
.hero-size {
    @apply w-screen h-[calc(100vh-56px)];
}
.code-block{
    @apply text-muted-foreground text-sm p-2 py-1 border border-border rounded-md bg-background;
}
.heroactions{
    transform: translateY(20px);
    opacity: 0;
}
</style>