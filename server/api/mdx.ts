import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';
import axios from 'axios';

export default defineEventHandler(async (event) => {
  try {
    if (event.req.method !== 'POST') {
      console.warn('Mdx Ignoring non-POST request:', {
        method: event.req.method,
        url: event.req.url,
      });
      return;
    }

    const { filePath } = await readBody(event);

    if (!filePath) {
      console.error('No file path provided');
      return {
        statusCode: 400,
        body: 'No file path provided',
      };
    }

    // Encode the filePath to handle spaces and other special characters
    const encodedFilePath = encodeURIComponent(filePath).replace(/%2F/g, '/'); // Keep '/' as is
    const rawVercelUrl = process.env.VERCEL_URL || 'localhost:3000'
    const resolvedBaseUrl = rawVercelUrl.startsWith('http')
      ? rawVercelUrl
      : `https://${rawVercelUrl}`

    const fullPath = `${resolvedBaseUrl}/documentation/${encodedFilePath}`
    console.log('Fetching file:', fullPath);

    const response = await axios.get(fullPath);
    console.log('Response:', response.data);
    const file = response.data;
    const parsed = matter(file);
    const frontmatter = parsed.data;

    const compileMdx = await compile(file, {
      jsxImportSource: 'vue',
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/vue',
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    });

    return {
      body: {
        content: String(compileMdx),
        frontmatter: JSON.stringify(frontmatter),
      }
    };
  } catch (e: unknown) {
    console.error('Error reading file:', e);
    return {
      statusCode: 500,
      body: (e as Error).message,
    };
  }
});
