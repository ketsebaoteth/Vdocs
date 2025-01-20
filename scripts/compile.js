import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Resolve current script directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '../public/docs');
const structureFilePath = path.join(__dirname, '../Structure.json');

/**
 * Extracts an optional "#number" suffix from a file/folder name.
 * Example: "MyFolder#2" -> { baseName: "MyFolder", order: 2 }
 *          "AnotherFolder" -> { baseName: "AnotherFolder", order: 0 }
 */
function parseName(name) {
  const match = name.match(/^(.*?)(#(\d+))?$/);
  if (!match) {
    return { baseName: name, order: 0 };
  }
  const baseName = match[1] || name;
  const order = match[3] ? parseInt(match[3], 10) : 0;
  return { baseName, order };
}

async function updateStructure(dir, structure, rootPath) {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const { baseName, order } = parseName(file);
    const fullPath = path.join(dir, file);
    let relativePath = path.relative(rootPath, fullPath).replace(/\\/g, '/');

    const stats = fs.statSync(fullPath);

    // If directory
    if (stats.isDirectory()) {
      const folderStructure = {
        isFolder: true,
        name: baseName, // stripped name
        order,          // order from #number
        children: []
      };
      structure.children.push(folderStructure);
      await updateStructure(fullPath, folderStructure, rootPath);

    // If MDX file
    } else if (stats.isFile() && file.endsWith('.mdx')) {
      const fileStructure = {
        isFolder: false,
        name: baseName, // stripped name
        order,
        path: relativePath
      };
      structure.children.push(fileStructure);
    }
  }
}

async function generateStructure() {
  const structure = {
    isFolder: true,
    name: 'docs',
    order: 0,
    children: []
  };

  await updateStructure(docsDir, structure, docsDir);
  fs.writeFileSync(structureFilePath, JSON.stringify(structure, null, 2));
}

generateStructure()
  .then(() => {
    console.log('Structure.json generated successfully');
  })
  .catch((error) => {
    console.error('Error generating Structure.json:', error);
  });