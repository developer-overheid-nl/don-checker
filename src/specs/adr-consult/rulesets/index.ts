import { Rulesets } from '@geonovum/standards-checker-ui';
import adrConsult, { ADR_URI } from './adr-consult';

const rulesets: Rulesets = {
  [ADR_URI]: adrConsult,
};

export default rulesets;
