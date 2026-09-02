import { Rulesets } from '@geonovum/standards-checker/ui';
import { publiccode05, publiccode07, PUBLICCODE_05_URI, PUBLICCODE_07_URI } from './publiccode';

export const publiccode05Rulesets: Rulesets = {
  [PUBLICCODE_05_URI]: publiccode05,
};

export const publiccode07Rulesets: Rulesets = {
  [PUBLICCODE_07_URI]: publiccode07,
};
