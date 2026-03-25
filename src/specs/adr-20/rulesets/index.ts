import { Rulesets } from '@geonovum/standards-checker-ui';
import adrCore, { ADR_URI } from './adr-20';

const rulesets: Rulesets = {
  [ADR_URI]: adrCore,
};

export default rulesets;
