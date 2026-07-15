import { yamlEncoding, type Standard } from '@geonovum/standards-checker';
import adr20Example from './adr-20/example.json';
import adr20Rulesets from './adr-20/rulesets';
import adr21Example from './adr-21/example.json';
import adr21Rulesets from './adr-21/rulesets';
import oasExample from './oas/example.json';
import oasRulesets from './oas/rulesets';
import publiccodeExample from './publiccode/example.json';
import { publiccode05Rulesets, publiccode07Rulesets } from './publiccode/rulesets';

const stringify = (value: unknown) => JSON.stringify(value, undefined, 2);
// publiccode.yml is a YAML format: shipping its examples as YAML makes the
// editor open in YAML mode (the UI derives the mode from the content).
const stringifyYaml = (value: unknown) => yamlEncoding.stringify(value);

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
      example: stringifyYaml({ ...publiccodeExample, publiccodeYmlVersion: '0.5' }),
      rulesets: publiccode05Rulesets,
      legacySlug: 'publiccode-05',
    },
    {
      id: '0.7',
      label: '0.7',
      status: 'final',
      example: stringifyYaml(publiccodeExample),
      rulesets: publiccode07Rulesets,
      legacySlug: 'publiccode-07',
    },
  ],
};

export default [apiDesignRules, publiccode];
