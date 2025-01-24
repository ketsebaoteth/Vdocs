<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Extenders/Custom/FeatureEx.vue -->
<template>
    <div
      ref="featureElement"
      class="flex-place-center w-full h-fit py-5 px-28 gap-12 justify-center transition-all duration-2000"
      :class="[
        props.direction === 'left' ? 'flex-row' : 'flex-row-reverse',
        { 'opacity-0 blur-md': !isVisible, 'opacity-100 blur-none': isVisible }
      ]"
    >
      <div class="flex flex-col gap-5">
        <h1 class="text-3xl font-bold text-foreground flex-place-center gap-1">
          <slot name="title"></slot>
        </h1>
        <p class="text-lg text-muted-foreground max-w-[45rem]">
          <slot name="description"></slot>
        </p>
        <slot name="actions" />
      </div>
      <div class="flex flex-col">
        <slot name="img" />
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, onUnmounted } from 'vue';
  
  const props = defineProps({
    direction: {
      type: String,
      default: 'left'
    }
  });
  
  const isVisible = ref(false);
  const featureElement = ref(null);
  
  function handleIntersection(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        isVisible.value = true;
        observer.disconnect(); // Stop observing after the first intersection
      }
    });
  }
  
  let observer;
  
  onMounted(() => {
    observer = new IntersectionObserver(handleIntersection, {
      threshold: 0.1 // Adjust as needed
    });
    if (featureElement.value) {
      observer.observe(featureElement.value);
    }
  });
  
  onUnmounted(() => {
    if (observer && featureElement.value) {
      observer.unobserve(featureElement.value);
    }
  });
  </script>
  
  <style scoped>
  .opacity-0 {
    opacity: 0;
  }
  .opacity-100 {
    opacity: 1;
  }
  .blur-md {
    filter: blur(10px);
  }
  .blur-none {
    filter: blur(0);
  }
  </style>