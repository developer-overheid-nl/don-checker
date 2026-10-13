import type { Standard } from '@geonovum/standards-checker';
import apiDesignRules from './adr';
// Examples are imported as raw text (`?raw`) and appear verbatim in the editor.
// The publiccode examples are YAML files, which makes the editor open them in
// YAML mode (the UI derives its mode from the content).
import publiccode05Example from './publiccode/example-0.5.yaml?raw';
import publiccode07Example from './publiccode/example-0.7.yaml?raw';
import { publiccode05Rulesets, publiccode07Rulesets } from './publiccode/rulesets';

const publiccode: Standard = {
  name: 'publiccode.yml',
  slug: 'publiccode',
  versions: [
    {
      id: '0.5',
      label: '0.5',
      status: 'final',
      example: publiccode05Example,
      rulesets: publiccode05Rulesets,
      legacySlug: 'publiccode-05',
    },
    {
      id: '0.7',
      label: '0.7',
      status: 'final',
      example: publiccode07Example,
      rulesets: publiccode07Rulesets,
      legacySlug: 'publiccode-07',
    },
  ],
};

export default [apiDesignRules, publiccode];
