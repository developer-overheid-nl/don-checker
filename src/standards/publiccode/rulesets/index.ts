import { Rulesets } from '@geonovum/standards-checker/ui';
import { publiccode05, publiccode07, publiccode08, PUBLICCODE_05_URI, PUBLICCODE_07_URI, PUBLICCODE_08_URI } from './publiccode';

export const publiccode05Rulesets: Rulesets = {
  [PUBLICCODE_05_URI]: publiccode05,
};

export const publiccode07Rulesets: Rulesets = {
  [PUBLICCODE_07_URI]: publiccode07,
};

export const publiccode08Rulesets: Rulesets = {
  [PUBLICCODE_08_URI]: publiccode08,
};
