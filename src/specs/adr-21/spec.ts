import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { Spec, spectralLinter } from '@geonovum/standards-checker/ui';
import example from './example.json';
import rulesets from './rulesets';

const spec: Spec = {
  name: 'ADR 2.1 (huidige verplichting)',
  slug: 'adr-21',
  example: JSON.stringify(example, undefined, 2),
  linters: Object.entries(rulesets).map(([name, ruleset]) => ({
    name,
    linter: spectralLinter(name, ruleset as RulesetDefinition),
  })),
};

export default spec;
