<script setup>
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner'
import hljs from 'highlight.js'
import 'highlight.js/styles/github.css'
import vue from "highlight.js/lib/languages/vbscript-html"
import bash from "highlight.js/lib/languages/bash"

// 2. Register the Vue language
hljs.registerLanguage('vue', vue)
hljs.registerLanguage('bash', bash)

const props = defineProps({
  content: { type: String, default: '' },
  lang: { type: String, default: 'plaintext' },
})

import { ref, watch } from 'vue'
const highlightedCode = ref('')

watch(
  () => props.content,
  (newCode) => {
    try {
      highlightedCode.value =
        props.lang && props.lang !== 'auto'
          ? hljs.highlight(props.lang, newCode).value
          : hljs.highlightAuto(newCode).value
    } catch {
      highlightedCode.value = newCode
    }
  },
  { immediate: true }
)

const copyQuick = () => {
  navigator.clipboard.writeText(props.content)
  toast.success('Copied to clipboard')
}
</script>

<template>
  <div class="flex flex-col gap-0 my-1">
    <div class="codeblocknav relative w-full py-2 px-3 flex-place-center border-x border-t rounded-t-md border-border">
      <div class="text-sm px-3 rounded-md py-1 border border-border">
        {{ props.lang }}
      </div>
      <Button @click="copyQuick()" variant="outline" size="icon" class="ml-auto right-2 top-1">
        <IconCopy class="size-5" />
      </Button>
    </div>
    <div class="bg-background relative border border-border pr-10 flex place-content-start flex-wrap rounded-md mt-0 rounded-t-none w-full p-4 py-0 codeblock">
      <Toaster  />
      
      <pre class="code-content">
        <code class="p-0" v-html="highlightedCode" :class="['language-' + lang]"></code>
      </pre>
    </div>
  </div>
  
</template>

<style scoped>
.code-content{
  @apply overflow-x-auto;
}
.code-content *{
  @apply py-0;
}
</style>