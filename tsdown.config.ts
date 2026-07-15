import { readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

const RAW_QUERY = /\?raw$/;

// Rolldown (which powers the tsdown-based `build-cli`) doesn't implement Vite's
// `?raw` suffix imports, used for the example fixtures in src/standards. Resolve
// and inline them here; Vite and Vitest handle `?raw` natively.
export default {
  plugins: [
    {
      name: 'raw-imports',
      resolveId(source: string, importer?: string) {
        if (!RAW_QUERY.test(source) || !importer) return null;
        return `${resolve(dirname(importer), source.replace(RAW_QUERY, ''))}?raw`;
      },
      load(id: string) {
        if (!RAW_QUERY.test(id)) return null;
        return { code: `export default ${JSON.stringify(readFileSync(id.replace(RAW_QUERY, ''), 'utf8'))};`, moduleType: 'js' };
      },
    },
  ],
};
