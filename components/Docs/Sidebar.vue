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
} from '@/components/ui/select';
import docsStructure from "../../Structure.json";
import { docsStates } from '../../state';
import { ref, computed, reactive } from 'vue';
import { IconChevronDown, IconChevronRight } from '@tabler/icons-vue';

let selectedVersion = ref(docsStructure.children[0]?.name || "");

// Track which subtopics are collapsed
const collapsedTopics = reactive({}); // { [subtopicName]: boolean }

const toggleSubtopic = (name) => {
  collapsedTopics[name] = !collapsedTopics[name];
};

// Sorting function based on 'order' property
const sortByOrder = (a, b) => a.order - b.order;

// Recursively sort children for folders
function sortChildrenRecursively(node) {
  if (!node.children) return;
  node.children.sort(sortByOrder);
  node.children.forEach(child => {
    if (child.isFolder) {
      sortChildrenRecursively(child);
    }
  });
}

// Compute and sort topics/folders and their children (including files)
const filteredTopics = computed(() => {
  const selectedTopic = docsStructure.children.find(
    topic => topic.name === selectedVersion.value
  );
  if (!selectedTopic) return [];

  // Sort the selected topic's entire tree
  sortChildrenRecursively(selectedTopic);
  return selectedTopic.children;
});

const setSelectedDoc = (path, componentSrc) => {
  docsStates.value.selectedDoc = path;
  docsStates.value.selectedComponentSrc = componentSrc;
};

const removeExtension = (filename) => {
  return filename.replace(/^\d+_|\.mdx$/g, "");
};
</script>

<template>
  <div class="sidebar flex flex-col gap-2 h-screen p-4 bg-background">
    <DocsSidebarSearch />
    <Select v-model="selectedVersion">
      <SelectTrigger class="h-10">
        <SelectValue placeholder="Select Version" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Versions</SelectLabel>
          <SelectItem
            v-for="(version, index) in docsStructure.children"
            :key="index"
            :value="version.name"
          >
            {{ version.name }}
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <separator direction="horizontal" gofullwidth />

    <!-- Tree-like nav -->
    <div class="topic w-full">
      <div
        class="main w-full flex flex-col justify-start"
        v-for="(subtopic, subindex) in filteredTopics"
        :key="subindex"
      >
        <div class="subtopics">
          <!-- Folder label + animated chevron -->
          <p
            class="subtopic flex items-center"
            v-if="subtopic.isFolder"
            @click="toggleSubtopic(subtopic.name)"
          >
            <component
              :is="IconChevronRight"
              class="inline-block mr-2 text-muted-foreground transition-transform duration-200"
              :class="{
                'rotate-90': !collapsedTopics[subtopic.name]
              }"
              size="16"
            />
            {{ subtopic.name }}
          </p>

          <!-- List of files (if not a folder) -->
          <p
            class="file-item flex items-center pl-6"
            v-else
            @click="setSelectedDoc(subtopic.path, subtopic.componentSrc)"
          >
            <span class="file-name text-muted-foreground cursor-pointer transition-colors"
                  :class="{'text-primary': docsStates.selectedDoc === subtopic.path}">
              {{ removeExtension(subtopic.name) }}
            </span>
          </p>

          <!-- Collapsible files list for folders -->
          <Transition name="collapsible">
            <div
              v-if="subtopic.isFolder && !collapsedTopics[subtopic.name]"
              class="files"
            >
              <div
                v-for="(file, fileindex) in subtopic.children"
                :key="fileindex"
                :class="{
                  'bg-secondary !border-l !border-primary': docsStates.selectedDoc === file.path
                }"
              >
                <div
                  class="filename"
                  :class="{
                    '!text-primary ': docsStates.selectedDoc === file.path
                  }"
                  @click="setSelectedDoc(file.path, file.componentSrc)"
                >
                  {{ removeExtension(file.name) }}
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.sidebar {
  @apply min-w-72 w-fit bg-background p-4;
}

/* Give subtopics a bold label and pointer cursor */
.subtopic {
  @apply text-foreground py-2 font-semibold cursor-pointer;
}

/* Indent nested files for a tree look with a left border */
.files {
  @apply flex flex-col gap-1 ml-6 border-l border-border;
}

/* Hover highlight style for files */
.filename {
  @apply text-muted-foreground py-1 pl-3 cursor-pointer hover:!text-primary transition-colors py-1;
}

/* Transition classes for collapsible content */
.collapsible-enter-active,
.collapsible-leave-active {
  transition: max-height 0.3s ease, opacity 0.3s ease;
  overflow: hidden;
}

.collapsible-enter-from,
.collapsible-leave-to {
  max-height: 0;
  opacity: 0;
}

.collapsible-enter-to,
.collapsible-leave-from {
  max-height: 1000px; /* Adjust based on maximum expected height */
  opacity: 1;
}

/* Rotate the chevron smoothly */
.rotate-90 {
  transform: rotate(90deg);
}

/* Additional styling for file items outside of folders */
.file-item {
  @apply flex items-center py-1;
}

.file-name {
  @apply text-sm cursor-pointer;
}
</style>