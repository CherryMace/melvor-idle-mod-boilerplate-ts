const fs = require('fs/promises');
const path = require('path');
const { minify } = require('html-minifier-terser');

(async () => {
  const outPath = path.join('dist', 'templates.min.html');
  await recurseTemplates('src', outPath);
})();

/**
 * @param {string} dirPath 
 * @param {string} outPath
 */
async function recurseTemplates(dirPath, outPath) {
  const dirs = [];
  const dir = await fs.opendir(dirPath);
  for await (const dirent of dir) {
    if (dirent.isFile()) {
      if (!dirent.name.endsWith('.template.html')) continue;
      if (dirent.name === 'templates.min.html') continue;
      await minifyAndAppend(path.join(dirPath, dirent.name), outPath);
    } else {
      dirs.push(path.join(dirPath, dirent.name));
    }
  }
  for (const d of dirs) {
    await recurseTemplates(d, outPath);
  }
}

/**
 * @param {string} filePath 
 * @param {string} outPath 
 */
async function minifyAndAppend(filePath, outPath) {
  const templates = await fs.readFile(filePath, 'utf-8');
  const minified = await minify(templates, {
    collapseWhitespace: true,
    collapseInlineTagWhitespace: true,
    removeComments: true
  });
  await fs.appendFile(outPath, minified);
}