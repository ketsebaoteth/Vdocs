
<template>
    <div class="relative outnow transition-all duration-200 ease-in-out w-[305px] hover:w-[315px] cursor-pointer flex-place-center gap-2 z-10 rounded-full bg-background py-1.5 px-2 border border-border ">
        <div class="bg-primary px-2 rounded-full text-background">
            <span class="text-xs font-semibold">New</span>
        </div>
        <span class="text-sm">Vdocs Version 1.0.1 is out now 🎉</span>
        <Icon name="tabler:chevron-right" class="text-foreground arrow-right ml-auto" />
    </div>
</template>

<script setup>
import gsap from 'gsap';
import { onMounted } from 'vue';

function animateUp(){
    gsap.fromTo(".outnow",{
        opacity: 0,
        duration: 0.5,
        ease: "power1.inOut"
    },{
        opacity: 1,
        duration: 0.5,
        ease: "power1.inOut"
    })
}
onMounted(()=>{
    animateUp();
})
</script>

<style scoped>
.outnow{
    transform: scale(0.9);
    opacity: 0;
}
.arrow-right{
    transition: transform 0.2s ease-in-out !important;
}
.outnow:hover > .arrow-right{
    transform: rotate(-45deg);
}
</style>

