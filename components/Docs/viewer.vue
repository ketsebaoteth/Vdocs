<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Docs/viewer.vue -->
<script setup>
import { ref, watch, nextTick, defineComponent, h } from 'vue';
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
import DirStructure from '../DocsBlocks/DirStructure.vue';
import 'highlight.js/styles/monokai.css';
import { matter } from 'vfile-matter';
import { VFile } from 'vfile';
import { useRuntimeConfig } from '#imports';
import { toast } from 'vue-sonner';

const mdxContent = ref(null);


// Wrap MDX in a provider
function wrapWithProvider(mdxDefaultExport) {
  const components = {
    Codeblock,
    TabbedCodeBlock,
    Callout,
    BrowserView,
    DirStructure,
    table: Table,
    hr: HorizontalRule,
    h2: VdocsH2,
    ul: VdocsList,
    pre: VdocsBasiCodeBlock,
  };
  return defineComponent({
    setup() {
      return () => h(MDXProvider, { components }, [h(mdxDefaultExport)]);
    },
  });
}

async function getFrontMatter(path){
  try {
    const res = await $fetch('/middleware/frontmatter',{
      method: `POST`,
      headers: {
        'Content-Type': 'application/json'
      },
      body: {
        path: path
      }
    })

    return res;
  }catch(error){
    console.error(error);
    toast.error('Failed to get frontmatter');
    return null;
  }
}

async function loadMDX(componentPath) {
  try {

    const { public: { docsBasePath } } = useRuntimeConfig();

    console.log("Receved from env: ", docsBasePath)

    const matterFromMiddleware = await getFrontMatter(`${docsBasePath}/${componentPath}`)
    docsStates.value.selectedDocMatter = matterFromMiddleware.frontMatter.matter;

    // 3) Now import the compiled MDX module (for rendering)
    const module = await import(`../../${docsBasePath}/${componentPath}`);
    mdxContent.value = wrapWithProvider(module.default);
  } catch (error) {
    console.error(error);
    mdxContent.value = null;
  }
}

// Extract headings after MDX is loaded
function updateHeadings() {
  const container = document.getElementById('mdx_display');
  if (!container) return;
  const headingElems = container.querySelectorAll('.heading');
  docsStates.value.headings = Array.from(headingElems).map((elem, i) => {
    const id = `heading-${i}`;
    elem.setAttribute('id', id);
    return { id, text: elem.textContent };
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
    <DocsGoToTop />
    <DocsBlocksVdocsHeading />
    <!-- Display the MDX content -->
    <component :is="mdxContent" v-if="mdxContent" />

    <!-- Display a message if no document is selected -->
    <p v-else>No Content In This Document.</p>

    <!-- Navigation buttons to go to next and previous page -->
    <div class="flex gap-2 my-5">
      <DocsPrePage prePage="prepage" />
      <DocsNextPage nextPage="nextpage" />
    </div>
  </div>
</template>

<style>
.mdx_display code:not(pre > code) {
  /* Your inline code styles */
  @apply text-primary !font-semibold px-1 py-[2px] border-muted border border-dashed rounded-md bg-secondary;
}
.mdx_display {
  @apply p-5 pl-10 w-[75%] h-full text-foreground max-w-[800px];
  /* Ensures pseudo-element can layer over this container */
  position: relative;
}

/* Pseudo-element to create a subtle grid texture at the top */
.mdx_display::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  pointer-events: none;
  /* 
    1) repeating-linear-gradient(...) draws the grid lines. 
    2) linear-gradient(...) fades from transparent to var(--background).
    Using background-blend-mode: multiply to combine them subtly.
  */
  background:
    repeating-linear-gradient(
      to right,
      hsl(var(--border)) 0,
      hsl(var(--border)) 1px,
      transparent 1px,
      transparent 20px
    ),
    repeating-linear-gradient(
      to bottom,
      hsl(var(--border)) 0,
      hsl(var(--border)) 1px,
      transparent 1px,
      transparent 80px
    ),
    linear-gradient(
      to bottom,
      transparent 80%,
      hsl(var(--background)) 100%
    );
  background-size: 20px 20px, 20px 20px, 100% 100%;
  background-blend-mode: multiply, multiply, normal;
  opacity: 0.4;
}
</style>