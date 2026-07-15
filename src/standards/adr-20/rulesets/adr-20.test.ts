import { Spectral } from '@geonovum/standards-checker/spectral/core';
import { describe, expect, test } from 'vitest';
import example from '../example.json';
import ruleset from './adr-20';

const spectral = new Spectral();
spectral.setRuleset(ruleset);

describe('adr-20', () => {
  test('Example document produces no errors', async () => {
    const violations = await spectral.run(example);
    const errors = violations.filter(v => v.severity === 0);
    expect(errors).toHaveLength(0);
  });
});
