<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Docs/Sidebar.vue -->
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

const sortByOrder = (a, b) => a.order - b.order;

const filteredTopics = computed(() => {
  const selectedTopic = docsStructure.children.find(topic => topic.name === selectedVersion.value);
  if (!selectedTopic) return [];
  
  const sortedTopics = selectedTopic.children.sort(sortByOrder);
  sortedTopics.reverse();
  sortedTopics.forEach(topic => {
    if (topic.children) {
      topic.children.sort(sortByOrder);
    }
  });
  return sortedTopics;
});

const setSelectedDoc = (path, componentSrc) => {
  docsStates.value.selectedDoc = path;
  docsStates.value.selectedComponentSrc = componentSrc;
};

const removeExtension = (filename) => {
  return filename.split('.').slice(0, -1).join('.');
};
</script>

<template>
  <div class="sidebar flex flex-col gap-2 place-items-center">
    <DocsSidebarSearch />
    <Select v-model="selectedVersion">
      <SelectTrigger class="h-8">
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
          <div class="files" v-for="(file, fileindex) in subtopic.children" :key="fileindex" :class="{'bg-secondary': docsStates.selectedDoc === file.path}">
            <p class="filename" @click="setSelectedDoc(file.path, file.componentSrc)">{{removeExtension(file.name)}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  @apply w-80 h-full p-5 bg-background;
}
.subtopic{
  @apply text-foreground py-1;
}
.files{
  @apply flex flex-col gap-2 h-8 my-1 flex justify-center  rounded-lg;
}
.filename{
  @apply text-sm text-muted-foreground ml-5 cursor-pointer;
}
</style>