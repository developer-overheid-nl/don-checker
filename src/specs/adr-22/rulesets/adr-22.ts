import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adr22Base, { ADR_22_URI } from '@developer-overheid-nl/adr-rulesets/rulesets/adr-22';
import { adrWarnings } from '../../adr-warnings';

export { ADR_22_URI };

const adr22: RulesetDefinition = {
  extends: [[adr22Base as RulesetDefinition, 'all']],
  rules: {
    ...adrWarnings,
  },
};

export default adr22;
