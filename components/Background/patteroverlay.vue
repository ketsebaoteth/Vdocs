<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Background/patteroverlay.vue -->
<template>
  <!-- The overlay is absolutely positioned and non-interactive -->
  <div class="absolute  bg-gradient-to-t  from-5% top-0 left-0 w-full h-full">
    <div class="zap absolute top-48 rotate-[-15deg] left-48 -z-20 text-muted">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="lucide lucide-zap size-16 "
      >
        <path
          d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"
        />
      </svg>
    </div>
    <div class="nuxt absolute top-72 rotate-12 right-44 text-muted">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="icon icon-tabler icons-tabler-outline text-muted size-16 icon-tabler-brand-nuxt"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path
          d="M12.146 8.583l-1.3 -2.09a1.046 1.046 0 0 0 -1.786 .017l-5.91 9.908a1.046 1.046 0 0 0 .897 1.582h3.913"
        />
        <path
          d="M20.043 18c.743 0 1.201 -.843 .82 -1.505l-4.044 -7.013a.936 .936 0 0 0 -1.638 0l-4.043 7.013c-.382 .662 .076 1.505 .819 1.505h8.086z"
        />
      </svg>
    </div>
    <div class="scrolldownbtn absolute bottom-4 left-4 ">
      <button class="px-3 flex-place-center text-xs py-1 border rounded-full border-border bg-background">
        <div class="w-5 h-3 flex flex-col items-start justify-center">
          <span
            class="coin border-l border-border"
            v-for="index in goDownInductorsCount"
            :key="index"
            :style="{ 'animation-delay': `${0.3 * index}s` }"
          ></span>
        </div>
        Scroll Down
      </button>
    </div>
    <div class="copyright-terms flex place-items-center absolute right-4 bottom-4">
      
      <div class="bg-background px-3 py-1 rounded-full text-xs text-foreground">
        <span>Made With 💖 By K</span>
      </div>
      <div class="bg-background px-0.5 py-0.5 rounded-full text-xs text-foreground flex place-items-center justify-center">
        <Icon name="tabler:arrow-up-right" class="size-5 text-muted-foreground" />
      </div>
    </div>
    
  </div>
</template>

<script setup>
import { ref,onMounted } from 'vue';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/dist/ScrollTrigger';

// funny name for a function, but it does the job 😁
const animateWiggle = () => {
  gsap.to('.zap', {
    translateY: 20,
    duration: 2,
    repeat: -1,
    ease: 'power1.inOut',
    yoyo: true
  });
  gsap.to('.nuxt', {
    translateY: 10,
    duration: 1,
    repeat: -1,
    ease: 'power1.inOut',
    yoyo: true
  });
};
const goDownInductorsCount = ref(8);
onMounted(() => {
  animateWiggle();
  gsap.fromTo(
    ".copyright-terms",{
      scrollTrigger: {
        trigger: ".copyright-terms",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    },{
      scrollTrigger: {
        trigger: ".copyright-terms",
        start: "top 80%",
        end: "bottom 70%",
        scrub: 1,
      },
      x: 20,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    }
  )
  gsap.fromTo(
    ".scrolldownbtn",{
      scrollTrigger: {
        trigger: ".scrolldownbtn",
        start: "top 80%",
        end: "bottom 20%",
        scrub: 1,
      },
      x: 0,
      opacity: 1,
      duration: 1,
      ease: "power1.inOut"
    },{
      scrollTrigger: {
        trigger: ".scrolldownbtn",
        start: "top 80%",
        end: "bottom 70%",
        scrub: 1,
      },
      x: -20,
      opacity: 0,
      duration: 1,
      ease: "power1.inOut",
    }
  )
});
</script>

<style scoped>

.coin {
  @apply absolute size-[8px] mb-1 bg-primary rounded-full;
  animation: coin 2s infinite;
  animation-timing-function: cubic-bezier(.445,.05,.55,.95);
  transform-origin: center;
  will-change: transform, opacity, background-color;
}
@keyframes coin {
  0% {
    @apply bg-primary;
    opacity: 1;
    transform: translateY(0) scaleY(1);
    z-index: 1;
  }
  48% {
    opacity: 1;
  }
  80% {
    @apply bg-background;
    opacity: 0;
  }
  100% {
    opacity: 0;
    transform: translateY(200%) scaleY(0);
    z-index: 7;
  }
}
</style>