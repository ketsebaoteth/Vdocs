<template>
  <div class="tabbed-code-block">
    <Toaster />
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
      <pre v-for="(tab, index) in parsedTabs" :key="index" v-show="activeTab === index">
        <code>{{ tab.command }}</code>
      </pre>
      <Button @click="copyQuick()" variant="outline" size="icon" class="absolute h-8   w-8 right-2 top-1">
        <IconCopy class="size-5" />
    </Button>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Button } from '@/components/ui/button'
import { IconCopy } from '@tabler/icons-vue';
import { Toaster, toast } from 'vue-sonner';

const copyQuick = () => {
    navigator.clipboard.writeText('npx create vdocs@latest')
    toast.success('Copy to clipboard')
}

const props = defineProps({
  tabs: {
    type: String,
    required: true,
    default: '[]'
  }
});

const parsedTabs = ref([]);

watch(() => props.tabs, (newVal) => {
  try {
    parsedTabs.value = JSON.parse(newVal);
  } catch (error) {
    console.error('Invalid JSON for tabs prop:', error);
    parsedTabs.value = [];
  }
}, { immediate: true });

const activeTab = ref(0);

const highlightedCode = ref('');

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
.code-content{
  @apply p-1 pt-0;
}
.code-content pre {
  @apply border border-border rounded-md rounded-t-none h-10 flex place-items-center ;
}
.code-content pre code {
  @apply flex px-3 py-0 text-sm;
}
</style>