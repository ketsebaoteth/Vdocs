<template>
  <div class="tabbed-code-block">
    <div class="tabs">
      <button
        v-for="(tab, index) in parsedTabs"
        :key="index"
        @click="activeTab = index"
        :class="{ active: activeTab === index }"
      >
        {{ tab.name }}
      </button>
      <p class="ml-auto text-xs mr-2 text-muted-foreground">Terminal</p>
    </div>
    <div class="code-content relative">
      <pre
        v-for="(tab, index) in parsedTabs"
        :key="index"
        v-show="activeTab === index"
      >
        <code
          :class="['language-' + finalLanguage]"
          v-html="getHighlighted(tab.command)"
        ></code>
      </pre>
      <Button @click="copyQuick()" variant="outline" size="icon" class="absolute h-8 w-8 right-2 top-1">
        <IconCopy class="size-5" />
      </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-light.min.css'

// Import the custom language
import installScript from '@/components/utils/custom-hljs'

// Register built-ins if you still want them
import shell from 'highlight.js/lib/languages/shell'
hljs.registerLanguage('shell', shell)

// Register your custom “install-script” language
hljs.registerLanguage('install-script', installScript)

// Props
const props = defineProps({
  tabs: {
    type: String,
    required: true,
    default: '[]'
  },
  // Language defaults to "install-script"
  lang: {
    type: String,
    default: 'install-script'
  }
})

// Parse the tabs from JSON
const parsedTabs = ref([])
watch(
  () => props.tabs,
  (newVal) => {
    try {
      parsedTabs.value = JSON.parse(newVal)
    } catch (error) {
      console.error('Invalid JSON for tabs prop:', error)
      parsedTabs.value = []
    }
  },
  { immediate: true }
)

// Active tab index
const activeTab = ref(0)

// Decide which language to use
const finalLanguage = ref(props.lang || 'install-script')

// Re-highlight if the language changes
watch(
  () => props.lang,
  (newVal) => {
    finalLanguage.value = newVal || 'install-script'
  }
)

// Helper to highlight text for the current language
function getHighlighted(codeStr) {
  try {
    return hljs.highlight(finalLanguage.value, codeStr.trim()).value
  } catch (err) {
    // If there's a highlighting error, just return raw text
    return codeStr.trim()
  }
}

// Copy to clipboard handler
function copyQuick() {
  const codeToCopy = parsedTabs.value[activeTab.value]?.command ?? ''
  navigator.clipboard.writeText(codeToCopy.trim())
  toast.success('Copied to clipboard')
}
</script>

<style scoped>
.tabbed-code-block {
  margin: 1em 0;
  @apply border border-border rounded-md flex flex-col gap-0;
}
.tabs {
  @apply flex p-1 pb-0 place-items-center ml-3 gap-3;
}
.tabs button {
  @apply px-2 py-1 cursor-pointer text-sm text-muted-foreground;
}
.tabs button.active {
  @apply text-foreground border-b-4 border-primary;
}
.code-content {
  @apply p-1 pt-0;
}
.code-content pre {
  @apply border border-border rounded-md rounded-t-none mt-0 flex place-items-center h-auto p-3;
}
.code-content pre code {
  @apply flex text-sm whitespace-pre-wrap break-words w-full;
}
/* Provide some spacing for the copy icon */
button.absolute {
}
</style>