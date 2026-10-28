// Adds one package version to index.json (the VPM listing VCC reads).
//   node tools/add-version.mjs <package zip> <download url>
// The zip must hold package.json at its root (the GitHub Release asset, not a .unitypackage).
// The entry is the zip's own package.json plus url and zipSHA256, so the listing can never disagree with the file.
// An existing version is never rewritten: publish a new version instead.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { readFileSync, writeFileSync } from 'node:fs';

const [zipPath, url] = process.argv.slice(2);
if (!zipPath || !url) {
  console.error('usage: node tools/add-version.mjs <package zip> <download url>');
  process.exit(2);
}
if (!url.startsWith('https://')) throw new Error('download url must be https');

const pkg = JSON.parse(execFileSync('unzip', ['-p', zipPath, 'package.json'], { encoding: 'utf8' }));
for (const key of ['name', 'version', 'displayName', 'unity']) {
  if (!pkg[key]) throw new Error(`package.json has no ${key}`);
}
const zipSHA256 = createHash('sha256').update(readFileSync(zipPath)).digest('hex');

const indexPath = new URL('../index.json', import.meta.url);
const index = JSON.parse(readFileSync(indexPath, 'utf8'));
const versions = ((index.packages[pkg.name] ??= { versions: {} }).versions);
const old = versions[pkg.version];
if (old) {
  if (old.zipSHA256 === zipSHA256 && old.url === url) {
    console.log(`UNCHANGED ${pkg.name} ${pkg.version}`);
    process.exit(0);
  }
  throw new Error(`${pkg.name} ${pkg.version} is already listed with a different file or url`);
}
versions[pkg.version] = { ...pkg, url, zipSHA256 };
writeFileSync(indexPath, JSON.stringify(index, null, 2) + '\n');
console.log(`ADDED ${pkg.name} ${pkg.version} ${zipSHA256}`);
