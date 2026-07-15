import { Spectral } from '@geonovum/standards-checker/spectral/core';
import { describe, expect, test } from 'vitest';
import { publiccode07 } from '../../formats';
import ruleset from './publiccode';

const spectral = new Spectral();
spectral.setRuleset(ruleset);

const validPubliccode07Document = {
  publiccodeYmlVersion: '0.7',
  name: 'Medusa',
  url: 'https://example.com/italia/medusa.git',
  platforms: ['web'],
  categories: ['content-management'],
  developmentStatus: 'stable',
  softwareType: 'standalone/web',
  supports: [{ id: 'alias:gdpr' }, { id: 'https://eur-lex.europa.eu/eli/reg/2016/679/oj' }, { id: 'urn:example:standard' }],
  description: {
    en: {
      shortDescription: 'A public service management platform.',
      longDescription:
        'Medusa is a public service management platform used by administrations to coordinate digital workflows, publish operational information, and support reusable service delivery across teams.',
      features: ['Service management'],
    },
  },
  legal: {
    license: 'EUPL-1.2',
  },
  maintenance: {
    type: 'internal',
    contacts: [{ name: 'Francesco Rossi' }],
  },
  localisation: {
    localisationReady: true,
    availableLanguages: ['en'],
  },
};

describe('publiccode.yml 0.7', () => {
  test('matches publiccode.yml 0.7 documents', () => {
    expect(publiccode07(validPubliccode07Document)).toBe(true);
  });

  test('accepts valid supports aliases and URIs', async () => {
    const violations = await spectral.run(validPubliccode07Document);
    const errors = violations.filter(v => v.severity === 0);

    expect(errors).toHaveLength(0);
  });

  test('rejects unknown supports aliases', async () => {
    const violations = await spectral.run({
      ...validPubliccode07Document,
      supports: [{ id: 'alias:unknown' }],
    });

    expect(violations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          code: 'publiccode-supports-id-format',
          severity: 0,
        }),
      ]),
    );
  });

  test('accepts URNs as organisation identifiers', async () => {
    const violations = await spectral.run({
      ...validPubliccode07Document,
      organisation: {
        uri: 'urn:x-italian-pa:c_h501',
        name: 'Roma Capitale',
      },
    });
    const errors = violations.filter(v => v.severity === 0);

    expect(errors).toHaveLength(0);
  });

  test('accepts deprecated lowercase country codes', async () => {
    const violations = await spectral.run({
      ...validPubliccode07Document,
      intendedAudience: {
        countries: ['it'],
        unsupportedCountries: ['us'],
      },
    });
    const errors = violations.filter(v => v.severity === 0);

    expect(errors).toHaveLength(0);
  });
});
