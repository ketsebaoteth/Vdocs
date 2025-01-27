<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/codeblock.vue -->
<script setup>
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue'
import { Toaster, toast } from 'vue-sonner'
import { ref, onMounted } from 'vue'

const props = defineProps({
  content: { type: String, default: '' },
  lang: { type: String, default: 'plaintext' },
  details: { type: String, default: '' },
  icon: { type: String, default: 'terminal-2' }
})

const htmlReactive = ref('')

async function highlightCode() {
  try {
    const response = await $fetch('/api/shiki', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        content: props.content,
        lang: props.lang
      },
      
    })

    htmlReactive.value = response.html
  } catch (error) {
    console.error(error)
    toast.error('Failed to highlight code')
  }
}

const copyQuick = () => {
  navigator.clipboard.writeText(props.content.trim())
  toast.success('Copied to clipboard')
}

onMounted(() => {
  highlightCode()
})
</script>

<template>
  <div class="flex flex-col gap-0 my-3">
    <div class="codeblocknav relative w-full py-2 px-2 flex-place-center border-x border-t rounded-t-md border-border">
      <div class="flex-place-center gap-2 px-3 pl-1 py-1 border-r border-border">
        <Icon :name="'tabler:'+props.icon" class="size-5 text-muted-foreground" />
        {{ props.lang }}
      </div>
      <p class="text-sm text-muted-foreground ml-3">
        {{ props.details }}
      </p>
      <Button
        @click="copyQuick()"
        variant="outline"
        size="icon"
        class="ml-auto active:scale-[0.9] text-muted-foreground right-2 top-1"
      >
        <IconCopy class="size-5" />
      </Button>
    </div>
    <div class=" border border-border rounded-md rounded-t-none w-full h-full codeblock">
      <div v-html="htmlReactive" class="code-container !bg-[var(--shiki-dark-bg)]" :class="['language-' + props.lang]">
      </div>
    </div>
  </div>
</template>

<style>
html.dark .shiki,
html.dark .shiki span {
  color: var(--shiki-dark) !important;
  background-color: var(--shiki-dark-bg) !important;
  font-style: var(--shiki-dark-font-style) !important;
  font-weight: var(--shiki-dark-font-weight) !important;
  text-decoration: var(--shiki-dark-text-decoration) !important;
}
.shiki {
  @apply !px-3 !py-5 overflow-x-scroll overflow-y-hidden ;
}
/* Twoslash icons and annotation styling */
*::-webkit-scrollbar {
  height: 5px;
  width: 5px;
}
*::-webkit-scrollbar-track {
  border-radius: 5px;
  @apply !bg-[var(--shiki-dark-bg)];
}
*::-webkit-scrollbar-thumb {
  @apply bg-border pb-2 rounded-md;
}
.code-content {
  @apply overflow-x-auto !m-0;
}
.code-content pre {
  @apply m-0 p-0;
}
.code-content code {
  @apply m-0 p-0;
  white-space: pre;
}
</style>