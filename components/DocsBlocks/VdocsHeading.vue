<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/VdocsHeading.vue -->
<script setup lang="ts">
import { IconLink } from "@tabler/icons-vue";
import { docsStates } from "../../state";
import { watch } from "vue";
import { useHeadSafe } from "../../.nuxt/imports";

</script>

<template>
  <div class="w-full text-4xl font-bold py-5 mb-2 flex flex-col gap-2 relative cursor-pointer group">
    <div class="flex-place-center relative">
      <h1>{{docsStates.selectedDocMatter['title']}}</h1>
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
        class="lucide lucide-link text-muted-foreground absolute -left-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
      >
        <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
        <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
      </svg>
    </div>
    
    <div class="flex gap-3 font-normal text-muted-foreground">
      <p class="text-sm">Created on: {{docsStates.selectedDocMatter['date']}}</p>
      <p class="text-sm">Author: {{docsStates.selectedDocMatter['author']}}</p>
    </div>
  </div>
</template>

<style scoped>
/* Optional: Add any additional styles if needed */
</style>