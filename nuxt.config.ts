import { defineNuxtConfig } from 'nuxt/config'
import vueJsx from '@vitejs/plugin-vue-jsx'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import { resolve } from 'pathe'
import { exec } from 'child_process'
import mdx from '@mdx-js/rollup'
import CompressionPlugin from 'compression-webpack-plugin'
import fs from 'fs-extra';
import path from 'path'


export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  nitro: {
    serverAssets: [
      {
        baseName: 'docs',
        dir: 'documentation'
      }
    ],
    compressPublicAssets: {
      brotli: true,
      gzip: true
    }
  },
  devtools: {
    enabled: true,

    timeline: {
      enabled: true,
    },
  },
  app: {
    head: {
      title: 'Vdocs',

      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'robots', content: 'index, follow' },
        { hid: 'og:title', property: 'og:title', content: 'Current Page Title | Vdocs Documentation' },
        { hid: 'description', name: 'description', content: 'Vdocs is a powerful documentation site generator CLI tool designed to help you create and manage your project documentation with ease.' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg', href: '/favicon.ico' },
      ]

    }
  },
  shiki: {
    defaultTheme: 'nord',
  },
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

  runtimeConfig: {
    public: {
      docsBasePath: process.env.DOCS_BASE_PATH || '../../public/docs',
    },
  },
  plugins: [
    "~/plugins/markdown-it.js",
  ],
  modules: ['@nuxtjs/tailwindcss', 'shadcn-nuxt', '@nuxtjs/color-mode', '@nuxt/fonts', 'nuxt-shiki', '@nuxt/icon'],

  tailwindcss: {
    exposeConfig: true,
    viewer: true,
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },
  css: ["./assets/css/global.css", "./assets/css/twoslash.css"],

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
    },
    'nitro:build:public-assets': async () => {
      const srcDir = path.resolve(__dirname, 'documentation');
      const desDir = path.resolve(__dirname, '.output/server/documentation');
      console.log("Copying From ", srcDir, " to ", desDir);
      try {
        await fs.copy(srcDir, desDir);
        console.log("Copied Documentation to .output/documentation");
      } catch (err) {
        console.log("Error copying Documentation to .output/documentation: ", err);
      }
    }
  },
})