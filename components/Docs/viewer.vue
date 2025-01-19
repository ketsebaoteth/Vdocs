<script setup>
import { ref, watch } from 'vue';
import { docsStates } from '../../state';
import Codeblock from '../DocsBlocks/codeblock.vue';
import { MDXProvider } from '@mdx-js/vue';
import VdocsHeading from '../DocsBlocks/VdocsHeading.vue';
import VdocsH2 from '../DocsBlocks/VdocsH2.vue';
import VdocsList from '../DocsBlocks/VdocsList.vue';
import VdocsBasiCodeBlock from '../DocsBlocks/VdocsCommand.vue';
import TabbedCodeBlock from '../DocsBlocks/TabbedCodeBlock.vue';

const mdxContent = ref(null);

function wrapWithProvider(mdxDefaultExport) {

  const components = {
    Codeblock,
    TabbedCodeBlock,
    h1: VdocsHeading,
    h2: VdocsH2,
    ul: VdocsList,
    pre: VdocsBasiCodeBlock,
  }
  // Return a new Vue component that renders MDX with your global components
  return defineComponent({
    setup() {
      return () =>
        h(MDXProvider, { components }, [
          h(mdxDefaultExport),
        ])
    },
  })
}


const loadMDX = async (componentPath) => {
  try {
    const module = await import(`../../public/docs/${componentPath}`)
    mdxContent.value = wrapWithProvider(module.default);
  } catch (error) {
    console.error(error);
    mdxContent.value = null;
  }
};

watch(() => docsStates.value.selectedDoc, (newVal) => {
  console.log(newVal);
  if(newVal){
    loadMDX(newVal);
  }
});
</script>

<template>
  <div class="mdx_display">
    <component :is="mdxContent" v-if="mdxContent" />
    <p v-else>No document selected or failed to load.</p>
  </div>
</template>

<style scoped>
.mdx_display {
  @apply p-5 pl-10 w-[80%] h-full text-foreground;
}
</style>