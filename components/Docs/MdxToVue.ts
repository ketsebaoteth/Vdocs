import { defineComponent, h } from 'vue';
import { compile } from '@mdx-js/mdx';
import { MDXProvider } from '@mdx-js/vue';

export async function compileMdxToVue(mdxContent: string) {
  const compiledMdx = await compile(mdxContent, { providerImportSource: '@mdx-js/vue' });
  const renderFunction = new Function('Vue', `${compiledMdx}`);

  return defineComponent({
    render() {
      return h(MDXProvider, {}, [h(renderFunction(Vue))]);
    },
  });
}