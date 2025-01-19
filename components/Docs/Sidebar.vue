<script setup>
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import docsStructure from "../../Structure.json";
import { docsStates } from '../../state';
import { watch, ref, computed } from 'vue';
import { versions } from '../../state';

let selectedVersion = ref(docsStructure.children[0]?.name || "");


const filteredTopics = computed(() => {
  return docsStructure.children.find(topic => topic.name === selectedVersion.value)?.children || [];
});

const setSelectedDoc = (path, componentSrc) => {
  docsStates.value.selectedDoc = path;
  docsStates.value.selectedComponentSrc = componentSrc;
};
</script>

<template>
  <div class="sidebar flex flex-col gap-2 place-items-center">
    <DocsSidebarSearch />
    <Select v-model="selectedVersion">
      <SelectTrigger>
        <SelectValue placeholder="Select Version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Versions</SelectLabel>
          <SelectItem v-for="(version, index) in docsStructure.children" :key="index" :value="version.name">
            {{ version.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <separator direction="horizontal" gofullwidth />
    <!-- List tree here -->
    <div class="topic w-full">
      <div class="main w-full flex flex-col justify-start" v-for="(subtopic, subindex) in filteredTopics" :key="subindex">
        <div class="subtopics">
          <p class="subtopic" v-if="subtopic.isFolder">{{ subtopic.name }}</p>
          <div class="files" v-for="(file, fileindex) in subtopic.children" :key="fileindex">
            <p class="filename" @click="setSelectedDoc(file.path, file.componentSrc)">{{file.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-64 h-screen p-5 bg-background border-r border-border;
}
.subtopic{
  @apply text-foreground;
}
.files{
  @apply flex flex-col gap-2;
}
.filename{
  @apply text-sm text-muted-foreground ml-5 cursor-pointer;
}
</style>