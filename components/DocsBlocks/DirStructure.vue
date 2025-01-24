<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/DocsBlocks/DirStructure.vue -->
<template>
    <div :class="{'!my-0 border-l border-border' : props.isSub}" class="my-4 divide-y divide-border">
      <div v-for="(dir, index) in struct" :key="index" class="w-fit min-w-80">
        <div v-if="dir.isFolder">
          <div @click="toggleCollapse(index)" class="cursor-pointer min-w-[400px] border-b border-border py-2 px-2 flex-place-center gap-2 transition-all">
            <Icon class="size-5 text-muted-foreground" :name="'tabler:' + (dir.icon ? dir.icon : 'folder-open')" />
            {{ dir.name }} 
            <IconChevronDown class="size-4 ml-auto" v-if="dir.isCollapsable" :class="collapsed[index] ? 'transform rotate-0' : 'transform rotate-180'" />
          </div>
          <div v-if="!collapsed[index]" class="pl-4 sub-directory">
            <DirStructure :is-sub="true" :structure="JSON.stringify(dir.children)" />
          </div>
        </div>
        <div v-else class="py-2 px-2 text-sm text-muted-foreground flex-place-center gap-2">
          <IconFile class="size-5" />
          {{ dir.name }}
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { IconChevronDown, IconFile, IconFolder } from '@tabler/icons-vue';
  import { ref, onMounted } from 'vue';
  
  const props = defineProps({
    structure: {
      type: String,
      default: '[]'
    },
    isSub:{
        type: Boolean,
        default: false
    }
  });
  
  let struct = ref([]);
  let collapsed = ref([]);
  
  function parseStruct() {
    struct.value = JSON.parse(props.structure);
    collapsed.value = struct.value.map(() => false);
  }
  
  function toggleCollapse(index) {
    collapsed.value[index] = !collapsed.value[index];
  }
  
  onMounted(() => {
    parseStruct();
  });
  </script>
  
  <style scoped>
  .grid_pattern{
    background-color: #ffffff00;
    opacity: 0.5;
    background-image:  linear-gradient(hsl(var(--border)) 1px, transparent 1px), linear-gradient(to right, hsl(var(--border)) 1px, hsl(var(--border)) 1px);
    background-size: 20px 20px;
  }
  .sub-directory {
    margin-left: 1rem; /* Adjust the margin as needed */
  }
  
  .flex-place-center {
    display: flex;
    align-items: center;
  }
  
  .size-5 {
    font-size: 1.25rem;
  }
  
  .size-4 {
    font-size: 1rem;
  }
  
  .transition-all {
    transition: all 0.3s ease;
  }
  
  .rotate-180 {
    transform: rotate(180deg);
  }
  </style>