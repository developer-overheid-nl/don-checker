import { Rulesets } from '@geonovum/standards-checker/ui';
import adr21, { ADR_21_URI } from './adr-21';

const rulesets: Rulesets = {
  [ADR_21_URI]: adr21,
};

export default rulesets;
