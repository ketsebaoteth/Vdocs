import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const docsDir = path.join(__dirname, '../public/docs');
const structureFilePath = path.join(__dirname, '../Structure.json');


const updateStructure = async (dir, structure, rootPath) => {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        let relativePath = path.relative(rootPath, fullPath);
        relativePath = relativePath.replace(/\\/g, '/'); // Normalize to forward slashes
        const stats = fs.statSync(fullPath);
        if (stats.isDirectory()) {
            const folderStructure = {
                isFolder: true,
                name: file,
                children: []
            };
            structure.children.push(folderStructure);
            await updateStructure(fullPath, folderStructure, rootPath);
        } else if (stats.isFile() && file.endsWith('.mdx')) {
            const fileStructure = {
                isFolder: false,
                name: file,
                path: relativePath
            };
            structure.children.push(fileStructure);
        }
    }
};

const generateStructure = async () => {
    const structure = {
        isFolder: true,
        name: 'docs',
        children: []
    };
    await updateStructure(docsDir, structure, docsDir);
    fs.writeFileSync(structureFilePath, JSON.stringify(structure, null, 2));
};

generateStructure().then(() => {
    console.log('Structure.json generated successfully');
}).catch((error) => {
    console.error('Error generating Structure.json:', error);
});