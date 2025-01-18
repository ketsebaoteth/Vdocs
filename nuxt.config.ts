import { defineNuxtConfig } from 'nuxt/config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { defineConfig } from 'vite'
import mdx from '@mdx-js/rollup'
import { resolve } from 'pathe'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  //markdown importer
  vite: {
    plugins: [
      vueJsx(),
      mdx({
        jsxImportSource: 'vue',
        remarkPlugins: [remarkGfm, remarkFrontmatter],
        providerImportSource: '@mdx-js/vue',
      }),
    ],
    resolve: {
      alias: {
        '@': resolve(__dirname, './'),
      },
    },
  },

  modules: ['@nuxtjs/tailwindcss'],

  //tailwindcss nuxt plugin
  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  }
})