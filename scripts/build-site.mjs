import { cp, mkdir } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const destination = resolve(root, '_site');
await mkdir(destination, { recursive: true });
for (const file of ['index.html', 'styles.css', 'script.js', 'data.js', '.nojekyll', 'assets', 'cv']) {
  await cp(resolve(root, file), resolve(destination, file), { recursive: true });
}
console.log('Static site prepared in _site/');
