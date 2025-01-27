import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';

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

    const fullPath = path.join(process.cwd(), 'documentation', filePath);

    if (!fs.existsSync(fullPath)) {
      console.error('File does not exist:', fullPath);
      return {
        statusCode: 404,
        body: 'File not found',
      };
    }


    const file = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(file);
    const frontmatter = parsed.data;

    const compileMdx = await compile(file, {
      jsxImportSource: 'vue',
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/vue',
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    })
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