import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { Spec, spectralLinter } from '@geonovum/standards-checker/ui';
import example from './example.json';
import rulesets from './rulesets';

const buildSpec = (name: string, slug: string, rulesetNames: string[]): Spec => ({
  name,
  slug,
  example: JSON.stringify({ ...example, publiccodeYmlVersion: slug === 'publiccode-05' ? '0.5' : '0.7' }, undefined, 2),
  linters: Object.entries(rulesets)
    .filter(([name]) => rulesetNames.includes(name))
    .map(([name, ruleset]) => ({
      name,
      linter: spectralLinter(name, ruleset as RulesetDefinition),
    })),
});

export const publiccode05Spec = buildSpec('publiccode.yml 0.5', 'publiccode-05', ['https://yml.publiccode.tools/schema/0.5']);
export const publiccode07Spec = buildSpec('publiccode.yml 0.7', 'publiccode-07', ['https://yml.publiccode.tools/schema/0.7']);

export default publiccode07Spec;
