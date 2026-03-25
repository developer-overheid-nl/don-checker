import { Spec, spectralLinter } from '@geonovum/standards-checker-ui';
import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import example from './example.json';
import rulesets from './rulesets';

const spec: Spec = {
  name: 'ADR 2.0',
  slug: 'adr-20',
  example: JSON.stringify(example, undefined, 2),
  linters: Object.entries(rulesets).map(([name, ruleset]) => ({
    name,
    linter: spectralLinter(name, ruleset as RulesetDefinition),
  })),
};

export default spec;
