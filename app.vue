<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/app.vue -->
<template>
  <div>
    <Toaster :toast-options="toastOptions" />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
import { Toaster } from 'vue-sonner';
import { docsStates } from './state';
import { watch } from 'vue';
import { useHead } from '@vueuse/head';

// Watch for changes in docsStates and update the title
watch(
  () => docsStates.value.selectedDocMatter,
  (newVal) => {
    if (newVal && newVal.title) {
      useHead({
        title: newVal.title + ' | Vdocs',
      });
    }
  },
  { immediate: true }
);

const toastOptions = {
  class: "bg-background text-foreground border-primary bg-primary dark:bg-primary",
  descriptionClass: 'my-toast-description'
};

useHead({
  script: [{
    children: "(function() { const savedTheme = localStorage.getItem('theme') || 'default'; const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches; if (savedTheme === 'dark' || (savedTheme === 'default' && isDarkMode)) { document.documentElement.classList.add('dark'); } else { document.documentElement.classList.remove('dark'); } })(); "
  }]
})
</script>