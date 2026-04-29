import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adr20Base, { ADR_20_URI } from '@developer-overheid-nl/adr-rulesets/rulesets/adr-20';
import { adrWarnings } from '../../adr-warnings';

export { ADR_20_URI };

const adr20: RulesetDefinition = {
  extends: [[adr20Base as RulesetDefinition, 'all']],
  rules: {
    ...adrWarnings,
  },
};

export default adr20;
