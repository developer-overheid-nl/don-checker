import { pattern } from '@geonovum/standards-checker/spectral/functions';

export const adrWarnings = {
  'oas3_1-warning': {
    severity: 'warn',
    given: '$.openapi',
    then: {
      function: pattern,
      functionOptions: {
        notMatch: '^3\\.1',
      },
    },
    message:
      'OpenAPI 3.1 staat (nog) niet op de "pas toe of leg uit" lijst; OpenAPI 3.0 is momenteel de aanbevolen versie voor nieuwe API-specificaties.',
    documentationUrl: 'https://www.forumstandaardisatie.nl/open-standaarden/openapi-specification',
  },
} as const;
