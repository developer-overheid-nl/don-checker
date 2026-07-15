import { Rulesets } from '@geonovum/standards-checker/ui';
import { publiccode05, publiccode07, PUBLICCODE_05_URI, PUBLICCODE_07_URI } from './publiccode';

const rulesets: Rulesets = {
  [PUBLICCODE_05_URI]: publiccode05,
  [PUBLICCODE_07_URI]: publiccode07,
};

export default rulesets;
