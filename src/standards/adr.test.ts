import { adrVersions, type AdrVersionId } from '@developer-overheid-nl/adr-rulesets/versions';
import { OpenLint } from '@geonovum/standards-checker/openlint/core';
import { describe, expect, test } from 'vitest';
import apiDesignRules from './adr';

// What each version's editor example reports, as `severity:code`. The inherited
// OAS rules come from OpenLint, so an OpenLint bump that changes them shows up here.
// servers-use-https also fires on the `servers` schema property that two responses
// of the 2.1.0 and 2.2.0 examples share, hence the duplicates.
const expectedDiagnostics: Record<AdrVersionId, string[]> = {
  '2.0.2': ['warning:info-contact', 'warning:paths-open-api-json-resource-exists'],
  '2.1.0': ['error:paths-open-api-json-resource-exists', 'warning:servers-use-https', 'warning:servers-use-https'],
  '2.2.0': ['error:info-contact', 'warning:nlgov:servers-use-https', 'warning:nlgov:servers-use-https'],
  werkversie: ['error:info-contact'],
};

const severities = ['error', 'warning', 'info', 'hint'];

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

  test.each(apiDesignRules.versions)('$id example document reports the expected diagnostics', async version => {
    const openLint = new OpenLint();
    openLint.setRuleset(Object.values(version.rulesets)[0]);

    const violations = await openLint.run(version.example);
    const diagnostics = violations.map(violation => `${severities[violation.severity]}:${violation.code}`).sort();
    expect(diagnostics).toEqual(expectedDiagnostics[version.id as AdrVersionId]);
  });
});
