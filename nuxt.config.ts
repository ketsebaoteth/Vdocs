import { defineNuxtConfig } from 'nuxt/config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { resolve } from 'pathe'
import { exec } from 'child_process'
import mdx from '@mdx-js/rollup'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

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

  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts'
  ],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  css: ["./assets/css/global.css"],

  hooks: {
    'builder:watch': (event, path) => {
      if (path.startsWith('public')) {
        exec('node ./scripts/compile.js', (error, stdout, stderr) => {
          if (error) {
            console.error(`Error executing compile script: ${error.message}`);
            return;
          }
          if (stderr) {
            console.error(`Compile script stderr: ${stderr}`);
          }
          console.log(`Compile script stdout: ${stdout}`);
        });
      }
    }
  },
})