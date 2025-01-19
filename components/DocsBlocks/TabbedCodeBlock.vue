<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/TabbedCodeBlock.vue -->
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
    </div>
    <div class="code-content">
      <pre v-for="(tab, index) in parsedTabs" :key="index" v-show="activeTab === index">
        <code>{{ tab.command }}</code>
      </pre>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

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
</script>

<style scoped>
.tabbed-code-block {
  margin: 1em 0;
  @apply border border-border rounded-md flex flex-col gap-0;
}

.tabs {
  @apply flex p-1 pb-0 place-items-center gap-1;
}

.tabs button {
  @apply px-2 py-1 border border-border cursor-pointer text-sm text-muted-foreground rounded-md;
}

.tabs button.active {
  @apply text-foreground;
}
.code-content{
  @apply p-1;
}
.code-content pre {
  @apply border border-border rounded-md;
}
</style>