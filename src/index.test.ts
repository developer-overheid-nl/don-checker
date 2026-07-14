import { describe, expect, test } from 'vitest';
import rulesets from './specs/publiccode-05/rulesets';

describe('publiccode rulesets', () => {
  test('exposes publiccode.yml 0.5 and 0.7 rulesets', () => {
    expect(Object.keys(rulesets)).toEqual(
      expect.arrayContaining(['https://yml.publiccode.tools/schema/0.5', 'https://yml.publiccode.tools/schema/0.7']),
    );
  });
});
