<template>
    <div class="mb-40 flex flex-col gap-6 px-20 py-10">
        <h1 class="text-[60px] catch1 font-semibold max-w-[500px] leading-[56px]">Redefining Clean Documentation</h1>
        <p class="text-lg catch1 max-w-[800px]">
            We help you create clean, beautiful and fast documentation for your libraries and frameworks while being framework agnostic so you can work on any stack or language and ready to go out of the box
        </p>
        <div class="p-2 preview-screen relative bg-secondary rounded-3xl shadow-3xl">
            <img class="rounded-3xl" src="../../assets/images/preview_dark.png" alt="">
            <div class="absolute bg-gradient-to-b from-transparent to-background top-0 left-0 w-full h-full ">
            </div>
        </div>
        <div class="features w-full flex flex-col place-items-center gap-3 mt-20">
            <h1 class="text-[40px] catch1 font-semibold max-w-[500px] leading-[56px]">Features</h1>
            <p class=" catch1 max-w-[500px] text-center">
                Here are some of the features that we offer. We are constantly working on adding more features to make your experience better
            </p>
            <div class="grid w-full h-[500px] px-3 py-3 flex">
                <div class="toright flex w-full gap-2">
                    <div class="firstcol flex flex-col gap-2 h-full w-[70%]">
                        <div class="mdxsupport h-1/2 p-5 border border-border">
                            <h1 class="text-lg">Smart Markdown</h1>
                        </div>
                        <div class="subcol h-1/2  flex gap-2">
                            <div class="col1 p-2 w-full border border-border">
                                <h2>Server Side Rendered</h2>
                            </div>
                            <div class="col2 p-2 border border-border min-w-[20%]">
                                <p>
                                    Deployments
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="secondcol border border-border p-5 w-full max-w-[30%] h-full">
                        <p>
                            Extendablity
                        </p>
                    </div>
                    
                </div>
                
            </div>
        </div>
    </div>
</template>

<style  scoped>

</style>

<script setup>
import {Button} from '@/components/ui/button'
import {IconArrowUpRight, IconLanguageHiragana, IconSearch} from '@tabler/icons-vue'
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

onMounted(()=>{
    gsap.fromTo(".catch1",{
        scrollTrigger:{
            trigger: ".catch1",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
        },
        y: 20,
        opacity: 0,
        duration: 1,
        ease: "power1.inOut"
    },{
        scrollTrigger:{
            trigger: ".catch1",
            start: "top 80%",
            end: "bottom 70%",
            scrub: 1,
        },
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power1.inOut",
    })
    gsap.fromTo(".preview-screen",{
        scrollTrigger:{
            trigger: ".preview-screen",
            start: "top 80%",
            end: "bottom 20%",
            scrub: 1,
        },
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 1,
        ease: "power1.inOut"
    },{
        scrollTrigger:{
            trigger: ".preview-screen",
            start: "top 80%",
            end: "bottom 70%",
            scrub: 1,
        },
        y: 0,
        opacity: 1,
        scale: 1,
        duration: 1,
        ease: "power1.inOut"
    })
})
</script>