<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/VdocsList.vue -->
<template>
  <ul class="list-disc list-inside space-y-2 ml-5 my-4">
    <!-- Render the default slot to display list items -->
    <slot />
  </ul>
</template>

<script setup>
// No additional script needed for styling enhancements
</script>

<style scoped>
/* Optional: Add any component-specific styles here */
/* Example: Custom bullet color */
.list-disc li::marker {
  @apply text-primary; /* Replace 'text-primary' with your desired color */
}
</style>