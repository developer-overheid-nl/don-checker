import { Rulesets } from '@geonovum/standards-checker-ui';
import adrCore, { ADR_URI } from './adr-core';

const rulesets: Rulesets = {
  [ADR_URI]: adrCore,
};

export default rulesets;
