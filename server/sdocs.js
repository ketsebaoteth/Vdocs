import { resolve } from 'path';
import serveStatic from 'serve-static';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
// Serve the docs directory
const serve = serveStatic(resolve(__dirname, '../docs'), {
  index: false, // Disable directory indexing
});

export default function (req, res, next) {
  serve(req, res, next);
}