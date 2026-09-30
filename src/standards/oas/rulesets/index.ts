import { Rulesets } from '@geonovum/standards-checker/ui';
import adrDraft, { ADR_DRAFT_URI } from './adr-draft';

const rulesets: Rulesets = {
  [ADR_DRAFT_URI]: adrDraft,
};

export default rulesets;
