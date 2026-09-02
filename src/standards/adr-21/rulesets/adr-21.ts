import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adr21Base, { ADR_21_URI } from '@developer-overheid-nl/adr-rulesets/rulesets/adr-21';
import { adrWarnings } from '../../adr-warnings';

export { ADR_21_URI };

const adr21: RulesetDefinition = {
  extends: [adr21Base as RulesetDefinition],
  rules: {
    ...adrWarnings,
  },
};

export default adr21;
