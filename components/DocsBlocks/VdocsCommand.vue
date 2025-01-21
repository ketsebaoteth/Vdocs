<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/VdocsCommand.vue -->
<script setup>
import { ref, onMounted, watch, defineProps } from 'vue';
import { Button } from '@/components/ui/button';
import { IconCopy } from '@tabler/icons-vue';
import { Toaster, toast } from 'vue-sonner';
import hljs from 'highlight.js';
import 'highlight.js/styles/monokai.css'; // Choose your preferred Highlight.js theme
import bash from 'highlight.js/lib/languages/bash';

hljs.registerLanguage('bash', bash);

// Define component props
const props = defineProps({
  language: {
    type: String,
    default: 'bash', // Default language for highlighting
  },
});

// Refs to store code content and highlighted HTML
const code = ref('');
const highlightedCode = ref('');

// Function to copy code to clipboard
const copyQuick = () => {
  navigator.clipboard.writeText(code.value);
  toast.success('Copied to clipboard');
};

// Access the default slot
import { useSlots } from 'vue';
const slots = useSlots();

// Function to update and highlight code
const updateHighlight = (rawCode) => {
  code.value = rawCode.trim();
  if (props.language && hljs.getLanguage(props.language)) {
    highlightedCode.value = hljs.highlight(code.value, { language: props.language }).value;
  } else {
    // Fallback to automatic language detection
    highlightedCode.value = hljs.highlightAuto(code.value).value;
  }
};

// Watch for slot content changes and highlight accordingly
onMounted(() => {
  if (slots.default && slots.default().length > 0) {
    const rawCode = slots.default()[0].children;
    updateHighlight(rawCode);
  }
});

watch(
  () => slots.default,
  (newSlots) => {
    if (newSlots.default && newSlots.default().length > 0) {
      const rawCode = newSlots.default()[0].children;
      updateHighlight(rawCode);
    }
  },
  { immediate: true }
);
</script>

<template>
  <div class="bg-background relative border border-border rounded-md my-2 w-full p-4 codeblock">
    <!-- Toaster for notifications -->
    <Toaster />

    <!-- Copy Button -->
    <Button
      @click="copyQuick"
      variant="outline"
      class="absolute w-8 h-8 right-2 top-2 flex items-center justify-center"
      aria-label="Copy code"
    >
      <IconCopy class="h-4 w-4" />
    </Button>

    <!-- Code Block -->
    <div class="overflow-x-auto">
      <div class="rounded-md">
        <code
          :class="` language-${props.language}`"
          v-html="highlightedCode"
        ></code>
      </div>
    </div>
  </div>
</template>

<style scoped>
.codeblock {
  /* Optional: Add custom styles if needed */
}

/* Optional: Customize the appearance of the <pre> and <code> elements */
pre {
  margin: 0;
}

code {
  @apply font-mono
}
</style>