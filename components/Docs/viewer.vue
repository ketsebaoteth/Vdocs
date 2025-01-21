<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Docs/viewer.vue -->
<script setup>
import { ref, watch, nextTick } from 'vue';
import { docsStates } from '../../state';
import Codeblock from '../DocsBlocks/codeblock.vue';
import { MDXProvider } from '@mdx-js/vue';
import VdocsHeading from '../DocsBlocks/VdocsHeading.vue';
import VdocsH2 from '../DocsBlocks/VdocsH2.vue';
import VdocsList from '../DocsBlocks/VdocsList.vue';
import VdocsBasiCodeBlock from '../DocsBlocks/VdocsCommand.vue';
import TabbedCodeBlock from '../DocsBlocks/TabbedCodeBlock.vue';
import Callout from '../DocsBlocks/Callout.vue';
import HorizontalRule from '../DocsBlocks/HorizontalRule.vue';
import Table from '../DocsBlocks/table.vue';
import BrowserView from '../DocsBlocks/BrowserView.vue';
import 'highlight.js/styles/monokai.css';

const mdxContent = ref(null);

// Wrap MDX in a provider
function wrapWithProvider(mdxDefaultExport) {
  const components = {
    Codeblock,
    TabbedCodeBlock,
    Callout,
    BrowserView,
    table: Table,
    hr: HorizontalRule,
    h1: VdocsHeading,
    h2: VdocsH2,
    ul: VdocsList,
    pre: VdocsBasiCodeBlock,
  };
  return defineComponent({
    setup() {
      return () =>
        h(MDXProvider, { components }, [h(mdxDefaultExport)]);
    },
  });
}

// Load the MDX
async function loadMDX(componentPath) {
  try {
    const module = await import(`../../public/docs/${componentPath}`);
    mdxContent.value = wrapWithProvider(module.default);
  } catch (error) {
    console.error(error);
    mdxContent.value = null;
  }
}

// 2) Extract headings after MDX is loaded
function updateHeadings() {
  const container = document.getElementById('mdx_display');
  if (!container) return;
  const headingElems = container.querySelectorAll('.heading');
  docsStates.value.headings = Array.from(headingElems).map((elem, i) => {
    const id = `heading-${i}`;
    elem.setAttribute('id', id);
    return { id, text: elem.innerText };
  });
}

// Watch for doc changes, then wait a tick and update headings
watch(
  () => docsStates.value.selectedDoc,
  async newVal => {
    if (!newVal) return;
    await loadMDX(newVal);
    // Let the new MDX render, then extract headings
    await nextTick();
    updateHeadings();
  }
);
</script>

<template>
  <div id="mdx_display" class="mdx_display">
    <component :is="mdxContent" v-if="mdxContent" />
    <p v-else>No document selected or failed to load.</p>
    <div class="flex gap-2 my-5">
      <DocsPrePage prePage="prepage" />
      <DocsNextPage nextPage="nextpage" />
    </div>
  </div>
</template>

<style scoped>
.mdx_display {
  @apply p-5 pl-10 w-[75%] h-full text-foreground max-w-[800px];
}
</style>