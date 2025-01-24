<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/codeblock.vue -->
<script setup>
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner'
import hljs from 'highlight.js'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import allLangs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";

hljs.registerLanguage('vue', javascript);


const props = defineProps({
  content: { type: String, default: '' },
  lang: { type: String, default: 'plaintext' },
  details: { type: String, default: '' }
})

import { ref, watch } from 'vue'
const highlightedCode = ref('')

watch(
  () => props.content,
  (newCode) => {
    try {
      highlightedCode.value =
        props.lang && props.lang !== 'auto'
          ? hljs.highlight(props.lang, newCode.trim()).value
          : hljs.highlightAuto(newCode.trim()).value
    } catch {
      highlightedCode.value = newCode.trim()
    }
  },
  { immediate: true }
)

const copyQuick = () => {
  navigator.clipboard.writeText(props.content.trim())
  toast.success('Copied to clipboard')
}
</script>

<template>
  <div class="flex flex-col gap-0 my-3">
    <div class="codeblocknav relative w-full py-2 px-3 flex-place-center border-x border-t rounded-t-md border-border">
      <div class="text-sm px-3 rounded-md py-1 border border-border">
        {{ props.lang }}
      </div>
      <p class="text-sm text-muted-foreground ml-3">
        {{ props.details }}
      </p>
      <Button @click="copyQuick()" variant="outline" size="icon" class="ml-auto active:scale-[0.9] text-muted-foreground right-2 top-1">
        <IconCopy class="size-5" />
      </Button>
    </div>
    <div class="bg-background border border-border rounded-md mt-0 rounded-t-none w-full p-4 pb-1 codeblock">
      <pre class="code-content">
<code v-html="highlightedCode" :class="['language-' + props.lang]"></code>
      </pre>
    </div>
  </div>
</template>

<style scoped>
/* Firefox (uncomment to work in Firefox, although other properties will not work!)  */
/** {
  scrollbar-width: thin;
  scrollbar-color: #397524 #DFE9EB;
}*/

/* Chrome, Edge and Safari */
*::-webkit-scrollbar {
  height: 5px;
  width: 10px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  @apply bg-background;
}

*::-webkit-scrollbar-thumb {
  @apply bg-border pb-2 rounded-md;
}


.code-content {
  @apply overflow-x-auto mb-1 ;
}
.code-content pre{
  @apply m-0 p-0;
}
.code-content code{
  @apply m-0 p-0;
  white-space: pre;
}
</style>