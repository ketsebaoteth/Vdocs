import { ref } from 'vue';

export const versions = ref([]);

export const docsStates = ref({
    selectedVersion: 'v1.0.0',
    selectedDoc: 'introduction',
    headings: [] // 1) Store all headings here
});