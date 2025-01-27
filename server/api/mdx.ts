import fs from 'fs';
import path from 'path';
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import remarkFrontmatter from 'remark-frontmatter';
import matter from 'gray-matter';

export default defineEventHandler(async (event) => {
  try {
    // Ensure the request method is POST
    if (event.req.method !== 'POST') {
      console.warn('Mdx Ignoring non-POST request:', {
        method: event.req.method,
        url: event.req.url,
      });
      return {
        statusCode: 405,
        body: 'Method Not Allowed',
      };
    }

    // Read the file path from the request body
    const { filePath } = await readBody(event);

    if (!filePath) {
      console.error('No file path provided');
      return {
        statusCode: 400,
        body: 'No file path provided',
      };
    }

    // Use the storage API to fetch the file
    const sanitizedFilePath = path.normalize(filePath).replace(/^(\.\.(\/|\\|$))+/, '');

    const fullPath = path.join(process.cwd(), 'documentation', sanitizedFilePath);

    // Check if the file exists
    if (!fs.existsSync(fullPath)) {
      console.error('File does not exist:', fullPath);
      return {
        statusCode: 404,
        body: `File not found: ${fullPath}`,
      };
    }

    const fileContent = fs.readFileSync(fullPath, 'utf-8');


    // Parse the frontmatter using gray-matter
    const parsed = matter(fileContent);
    const frontmatter = parsed.data;

    // Compile the MDX content
    const compileMdx = await compile(fileContent, {
      jsxImportSource: 'vue',
      outputFormat: 'function-body',
      providerImportSource: '@mdx-js/vue',
      remarkPlugins: [remarkGfm, remarkFrontmatter],
    });

    return {
      body: {
        content: String(compileMdx),
        frontmatter: JSON.stringify(frontmatter),
      },
    };
  } catch (e: unknown) {
    // Log the error for debugging
    console.error('Error processing MDX file:', e);

    // Return a 500 error with the error message
    return {
      statusCode: 500,
      body: {
        message: 'Internal Server Error',
        error: (e as Error).message,
      },
    };
  }
});