const fs = require('fs');
const path = require('path');
const version = process.argv.pop();
const ROOT = path.resolve(__dirname, '..');

const updatePackageJSON = (packagePath, version, callback) => {
  const package = require(packagePath);
  package.version = version;
  if (callback) {
    callback(package);
  }
  fs.writeFileSync(packagePath, JSON.stringify(package, null, 2));
};

updatePackageJSON(path.resolve(ROOT, 'package.json'), version);

// const border = (num) => Array(num).fill('*').join('');
// fs.writeFileSync(path.resolve(ROOT, 'src/version.ts'), `/${border(79)}

// * This file is autogenerated. Do not edit directly

// ${border(79)}/
// export default '${version}';
// `);

const examplesPath = path.resolve(ROOT, 'examples');
const examples = fs.readdirSync(examplesPath);
examples.forEach((example) => {
  const dirPath = path.resolve(examplesPath, example);
  if (fs.lstatSync(dirPath).isDirectory()) {
    const examplePackagePath = path.resolve(dirPath, 'package.json');
    updatePackageJSON(examplePackagePath, version, (package) => {
      if (!package.dependencies) {
        package.dependencies = {};
      }
      package.dependencies.upscaler = version;
      package.dependencies['@tensorflow/tfjs-node-gpu'] = '2.1.0';
    });
  }
});
