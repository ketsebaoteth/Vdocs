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

const toastOptions = {
    class: "bg-background text-foreground border-green-500 bg-gradient-to-r from-green-100 dark:from-green-900 to-background",
    descriptionClass: 'my-toast-description'
  }
</script>