import { adrVersions } from '@developer-overheid-nl/adr-rulesets/versions';
import { OpenLint } from '@geonovum/standards-checker/openlint/core';
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

  test('derives the labels and the legacy slugs of the existing versions', () => {
    expect(apiDesignRules.versions.map(version => version.label)).toEqual(['2.0.2', '2.1.0', '2.2.0', 'Werkversie']);
    expect(apiDesignRules.versions.map(version => version.legacySlug)).toEqual(['adr-20', 'adr-21', 'adr-22', 'adr-werkversie']);
  });

  test('2.0.2 example document produces no errors', async () => {
    const version = apiDesignRules.versions.find(candidate => candidate.id === '2.0.2');
    const openLint = new OpenLint();
    openLint.setRuleset(Object.values(version?.rulesets ?? {})[0]);

    const violations = await openLint.run(version?.example ?? '');
    expect(violations.filter(violation => violation.severity === 0)).toHaveLength(0);
  });
});
