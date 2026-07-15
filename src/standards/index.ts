import type { Standard } from '@geonovum/standards-checker';
import adr20Example from './adr-20/example.json';
import adr20Rulesets from './adr-20/rulesets';
import adr21Example from './adr-21/example.json';
import adr21Rulesets from './adr-21/rulesets';
import oasExample from './oas/example.json';
import oasRulesets from './oas/rulesets';
import publiccodeExample from './publiccode-05/example.json';
import publiccodeRulesets from './publiccode-05/rulesets';

const stringify = (value: unknown) => JSON.stringify(value, undefined, 2);

// Versions are listed ascending (old -> new); the UI shows them reversed and
// defaults to the latest final (2.1). Legacy slugs map each version back to its
// old `--ruleset` value / route.
const apiDesignRules: Standard = {
  name: 'API Design Rules',
  slug: 'adr',
  versions: [
    { id: '2.0.2', label: '2.0.2', status: 'final', example: stringify(adr20Example), rulesets: adr20Rulesets, legacySlug: 'adr-20' },
    { id: '2.1.0', label: '2.1.0', status: 'final', example: stringify(adr21Example), rulesets: adr21Rulesets, legacySlug: 'adr-21' },
    { id: 'werkversie', label: 'Werkversie', status: 'draft', example: stringify(oasExample), rulesets: oasRulesets, legacySlug: 'adr' },
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
      example: stringify(publiccodeExample),
      rulesets: publiccodeRulesets,
      legacySlug: 'publiccode-05',
    },
  ],
};

export default [apiDesignRules, publiccode];
