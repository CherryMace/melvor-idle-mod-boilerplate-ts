const fs = require('fs');
const path = require('path');
const archiver = require('archiver');
const { v4: uuid } = require('uuid');
const del = import('del');

const pkg = require('../package.json');

const dir = 'package';
if (!fs.existsSync(dir)) fs.mkdirSync(dir);

const id = uuid().split('-')[0];
const outname = `${pkg.name}.${id}.zip`;
const output = fs.createWriteStream(path.resolve(dir, outname));
const archive = archiver('zip');

output.on('close', () => {
  console.log(outname + ': ' + archive.pointer() + ' total bytes');

  del.then(({ deleteSync }) => {
    fs.readdir(dir, (err, files) => {
      if (err) {
        console.log(err);
      }
    
      files.forEach(file => {
        if (file !== outname) {
          deleteSync(path.join(dir, file));
        }
      });
    });
  });
});

archive.on('error', (err) => {
  throw err;
});

archive.pipe(output);
archive.directory('dist/', false);
archive.finalize();
