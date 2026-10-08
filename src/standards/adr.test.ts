import { adrVersions } from '@developer-overheid-nl/adr-rulesets/versions';
import { Spectral } from '@geonovum/standards-checker/spectral/core';
import { describe, expect, test } from 'vitest';
import apiDesignRules from './adr';

describe('adr standard', () => {
  test('takes its versions from adr-rulesets, in the same order', () => {
    expect(apiDesignRules.versions.map(version => version.id)).toEqual(adrVersions.map(version => version.id));
    expect(apiDesignRules.versions.map(version => version.status)).toEqual(adrVersions.map(version => version.status));
  });

  test('binds each version to its own conformance class', () => {
    for (const [index, version] of apiDesignRules.versions.entries()) {
      expect(Object.keys(version.rulesets)).toEqual([adrVersions[index].uri]);
    }
  });

  test('keeps the legacy slugs', () => {
    expect(apiDesignRules.versions.map(version => version.legacySlug)).toEqual(['adr-20', 'adr-21', 'adr-22', 'adr-werkversie']);
  });

  test('2.0.2 example document produces no errors', async () => {
    const version = apiDesignRules.versions.find(candidate => candidate.id === '2.0.2');
    const spectral = new Spectral();
    spectral.setRuleset(Object.values(version?.rulesets ?? {})[0]);

    const violations = await spectral.run(version?.example ?? '');
    expect(violations.filter(violation => violation.severity === 0)).toHaveLength(0);
  });
});
