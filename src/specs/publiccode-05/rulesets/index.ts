import { Rulesets } from '@geonovum/standards-checker-ui';
import publiccode, { PUBLICCODE_URI } from './publiccode';

const rulesets: Rulesets = {
  [PUBLICCODE_URI]: publiccode,
};

export default rulesets;
