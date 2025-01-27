<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Heros/DComponents/TextHeading.vue -->
<template>
    <h1 id="titleText" class="title-text text-[80px] max-w-[800px] font-bold text-foreground text-center leading-[80px] space-x-1">
      Modern, <span class="special-gradient">Readable,</span> and Efficient Docs
    </h1>
  </template>
  
  <style lang="scss" scoped>
  .special-gradient {
    @apply text-primary;
  }
  .title-text {
    font-kerning: none;
    opacity: 0;
    overflow: hidden;
  }
  </style>
  
  <script setup>
  import { onMounted } from 'vue';
  import gsap from 'gsap';
  import SplitType from 'split-type';
  
  
  const splitTextForAnimation = () => {
    const text = new SplitType("#titleText", { types: "chars",  });
    gsap.set(".title-text", { y: 0, opacity: 1 });
    gsap.fromTo(
      text.chars,
      {
        translateY: 20,
        opacity: 0,
        duration: 0.8,
        ease: "power2.out",
      },
      {
        translateY: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.02,
        ease: "power2.out",
      }
    );
  };
  
  onMounted(() => {
    splitTextForAnimation();
    gsap.fromTo(
      ".char",
      {
        scrollTrigger: {
          trigger: ".title-text",
          start: "top 50%",
          end: "bottom 5%",
          scrub: 1,
        },
        y: 0,
        opacity: 1,
        stagger: 0.02,
      },
      {
        scrollTrigger: {
          trigger: ".title-text",
          start: "top 30%",
          end: "bottom 15%",
          scrub: 1,
        },
        y: -50,
        opacity: 0,
        stagger: 0.02,
      }
    )
   
  });
  </script>