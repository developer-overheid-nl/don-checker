import type { RulesetFunction } from '@geonovum/standards-checker/spectral/core';

export const or: RulesetFunction<Record<string, unknown>, { properties: string[] }> = (input, options) => {
  if (!options?.properties?.length) {
    return;
  }

  for (const property of options.properties) {
    if (input?.[property] != null) {
      return;
    }
  }

  return [{ message: `Must have at least one of: ${options.properties.join(', ')}` }];
};
