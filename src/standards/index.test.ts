import { yamlEncoding } from '@geonovum/standards-checker';
import { describe, expect, test } from 'vitest';
import { PUBLICCODE_05_URI, PUBLICCODE_07_URI } from './publiccode/rulesets/publiccode';
import standards from './index';

describe('publiccode standard', () => {
  const publiccode = standards.find(standard => standard.slug === 'publiccode');

  test('exposes publiccode.yml 0.5 and 0.7 versions', () => {
    expect(publiccode?.versions.map(version => version.id)).toEqual(['0.5', '0.7']);
  });

  test('binds each version to its own conformance class', () => {
    expect(Object.keys(publiccode?.versions.find(version => version.id === '0.5')?.rulesets ?? {})).toEqual([PUBLICCODE_05_URI]);
    expect(Object.keys(publiccode?.versions.find(version => version.id === '0.7')?.rulesets ?? {})).toEqual([PUBLICCODE_07_URI]);
  });

  test('ships an example matching each version', () => {
    for (const version of publiccode?.versions ?? []) {
      expect(yamlEncoding.parser.parse(version.example).data.publiccodeYmlVersion).toBe(version.id);
    }
  });
});
