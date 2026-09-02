import { Rulesets } from '@geonovum/standards-checker/ui';
import adr22, { ADR_22_URI } from './adr-22';

const rulesets: Rulesets = {
  [ADR_22_URI]: adr22,
};

export default rulesets;
