<!-- filepath: /c:/Users/admin/Desktop/Full Typescript Projects/cognito 1.0/Vdocs/components/Docs/docsView.vue -->
<script setup lang="ts">
import { defineAsyncComponent } from 'vue';
import { docsStates } from '../../state';
import * as VueRuntime from 'vue'; // Import everything from "vue" as an object
import { MDXProvider, useMDXComponents } from '@mdx-js/vue';
import { run } from '@mdx-js/mdx';
import * as runtime_ from 'vue/jsx-runtime'
import TabbedCodeBlock from '../DocsBlocks/TabbedCodeBlock.vue';
import Codeblock from '../DocsBlocks/codeblock.vue';
import BrowserView from '../DocsBlocks/BrowserView.vue';
import Callout from '../DocsBlocks/Callout.vue';
import DirStructure from '../DocsBlocks/DirStructure.vue';
import Table from '../DocsBlocks/table.vue';
import HorizontalRule from '../DocsBlocks/HorizontalRule.vue';
import VdocsH2 from '../DocsBlocks/VdocsH2.vue';
import VdocsList from '../DocsBlocks/VdocsList.vue';
import VdocsBasiCodeBlock from '../DocsBlocks/VdocsCommand.vue';

interface Props {
  slug: string;
}

const props = defineProps<Props>();

interface mdxResponse {
  content: string;
  frontmatter: string;
}

const customComponents = {
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


const vueComponent = defineAsyncComponent(async () => {
  try {
    const mdxRuntime = {
      ...runtime_,
      useMDXComponents,
    }
    const response = await $fetch<{ body: mdxResponse }>('/api/mdx', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: {
        filePath: props.slug,
      },
    });

    const compiledCode = response.body.content;
    docsStates.value.selectedDocMatter = JSON.parse(response.body.frontmatter);
    
    const createModule = new Function('runtime', compiledCode)
    const MDXModule = createModule(mdxRuntime)
    const MDXContent = MDXModule.default || MDXModule

    return defineComponent({
      render (){
        return h(
          MDXProvider,
          { components: customComponents },
          [h(MDXContent)]
        )
      }
    });
  } catch (error) {
    return defineComponent({
      render() {
        return h('div', 'Error loading content');
      },
    });
  }
});


</script>

<template>
  <div id="mdx_display" class="mdx_display">
    <DocsGoToTop />
    <DocsBlocksVdocsHeading />
    <component :is="vueComponent" /> <!-- Use the compiled component directly -->
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
