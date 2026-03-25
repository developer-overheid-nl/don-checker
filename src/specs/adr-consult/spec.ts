import { Spec, spectralLinter } from '@geonovum/standards-checker-ui';
import { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import example from './example.json';
import rulesets from './rulesets';

const spec: Spec = {
  name: 'ADR Kennisplatform Consultatie 2026Q1',
  slug: 'adr-consult',
  example: JSON.stringify(example, undefined, 2),
  linters: Object.entries(rulesets).map(([name, ruleset]) => ({
    name,
    linter: spectralLinter(name, ruleset as RulesetDefinition),
  })),
};

export default spec;
