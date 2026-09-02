import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adrDraftBase, { ADR_DRAFT_URI } from '@developer-overheid-nl/adr-rulesets/rulesets/adr-draft';
import { adrWarnings } from '../../adr-warnings';

export { ADR_DRAFT_URI };

const adrDraft: RulesetDefinition = {
  extends: [adrDraftBase as RulesetDefinition],
  rules: {
    ...adrWarnings,
  },
};

export default adrDraft;
