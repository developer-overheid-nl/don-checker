import { pattern } from '@geonovum/standards-checker/spectral/functions';

export const oasValidationRules = {
  'oas3-schema': true,
  'operation-operationId-unique': true,
  'path-params': true,
  'openapi-tags-uniqueness': true,
  'oas3-valid-media-example': true,
  'oas3-valid-schema-example': true,
  'oas3-server-variables': true,
  'oas3_1-warning': {
    severity: 'warn' as const,
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
};
