import type { Standard } from '@geonovum/standards-checker';
// Examples are imported as raw text (`?raw`) and appear verbatim in the editor.
// The publiccode examples are YAML files, which makes the editor open them in
// YAML mode (the UI derives its mode from the content).
import adr20Example from './adr-20/example.json?raw';
import adr20Rulesets from './adr-20/rulesets';
import adr21Example from './adr-21/example.json?raw';
import adr21Rulesets from './adr-21/rulesets';
import oasExample from './oas/example.json?raw';
import oasRulesets from './oas/rulesets';
import publiccode05Example from './publiccode/example-0.5.yaml?raw';
import publiccode07Example from './publiccode/example-0.7.yaml?raw';
import { publiccode05Rulesets, publiccode07Rulesets } from './publiccode/rulesets';

// Versions are listed ascending (old -> new); the UI shows them reversed and
// defaults to the latest final (2.1). Legacy slugs map each version back to its
// old `--ruleset` value / route.
const apiDesignRules: Standard = {
  name: 'API Design Rules',
  slug: 'adr',
  versions: [
    { id: '2.0.2', label: '2.0.2', status: 'final', example: adr20Example, rulesets: adr20Rulesets, legacySlug: 'adr-20' },
    { id: '2.1.0', label: '2.1.0', status: 'final', example: adr21Example, rulesets: adr21Rulesets, legacySlug: 'adr-21' },
    {
      id: 'werkversie',
      label: 'Werkversie',
      status: 'draft',
      example: oasExample,
      rulesets: oasRulesets,
      legacySlug: 'adr',
    },
  ],
};

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
