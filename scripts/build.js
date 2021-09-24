#!/bin/env

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const main = async () => {
  execSync('npx tsc ./src/index.ts --declaration', { stdio: 'inherit' });
  if (!fs.existsSync(path.resolve('./src/index.js')) || !fs.existsSync(path.resolve('./src/index.d.ts'))) {
    console.error('Something went wrong building this package');
    return;
  }
  fs.renameSync(path.resolve('./src/index.js'), path.resolve('./index.js'));
  fs.renameSync(path.resolve('./src/index.d.ts'), path.resolve('./index.d.ts'));
};

main();
