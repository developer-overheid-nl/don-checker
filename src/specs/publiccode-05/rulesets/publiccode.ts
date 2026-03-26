import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import { enumeration, pattern, schema, truthy } from '@geonovum/standards-checker/spectral/functions';
import { publiccode05 } from '../../formats';

export const PUBLICCODE_URI = 'https://yml.publiccode.tools/schema/0.5';

const CATEGORIES = [
  'accounting', 'agile-project-management', 'applicant-tracking', 'application-development',
  'appointment-scheduling', 'backup', 'billing-and-invoicing', 'blog', 'budgeting',
  'business-intelligence', 'business-process-management', 'cad', 'call-center-management',
  'cloud-management', 'collaboration', 'communications', 'compliance-management',
  'contact-management', 'content-management', 'crm', 'customer-service-and-support',
  'data-analytics', 'data-collection', 'data-visualization', 'design', 'design-system',
  'digital-asset-management', 'digital-citizenship', 'document-management', 'donor-management',
  'e-commerce', 'e-signature', 'educational-content', 'email-management', 'email-marketing',
  'employee-management', 'enterprise-project-management', 'enterprise-social-networking', 'erp',
  'event-management', 'facility-management', 'feedback-and-reviews-management',
  'financial-reporting', 'fleet-management', 'fundraising', 'gamification',
  'geographic-information-systems', 'grant-management', 'graphic-design', 'help-desk', 'hr',
  'ide', 'identity-management', 'instant-messaging', 'integrated-library-system',
  'inventory-management', 'it-asset-management', 'it-development', 'it-management',
  'it-security', 'it-service-management', 'knowledge-management', 'learning-management-system',
  'marketing', 'mind-mapping', 'mobile-marketing', 'mobile-payment', 'network-management',
  'office', 'online-booking', 'online-community', 'payment-gateway', 'payroll',
  'predictive-analysis', 'procurement', 'productivity-suite', 'project-collaboration',
  'project-management', 'property-management', 'real-estate-management',
  'regulations-and-directives', 'remote-support', 'resource-management', 'sales-management',
  'seo', 'service-desk', 'social-media-management', 'survey', 'talent-management',
  'task-management', 'taxes-management', 'test-management', 'time-management', 'time-tracking',
  'translation', 'video-conferencing', 'video-editing', 'visitor-management', 'voip',
  'warehouse-management', 'web-collaboration', 'web-conferencing', 'website-builder',
  'whistleblowing', 'workflow-management', 'other',
];

const DEVELOPMENT_STATUSES = ['concept', 'development', 'beta', 'stable', 'obsolete'];

const SOFTWARE_TYPES = [
  'standalone/mobile', 'standalone/iot', 'standalone/desktop', 'standalone/web',
  'standalone/backend', 'standalone/other', 'addon', 'library', 'configurationFiles',
];

const MAINTENANCE_TYPES = ['internal', 'contract', 'community', 'none'];

const PUBLICCODE_YML_VERSIONS = ['0', '0.2', '0.2.0', '0.2.1', '0.2.2', '0.3', '0.3.0', '0.4', '0.4.0', '0.5', '0.5.0'];

const SCOPE_VALUES = [
  'agriculture', 'culture', 'defence', 'education', 'emergency-services', 'employment',
  'energy', 'environment', 'finance-and-economic-development', 'foreign-affairs', 'government',
  'healthcare', 'infrastructures', 'justice', 'local-authorities', 'manufacturing', 'research',
  'science-and-technology', 'security', 'society', 'sport', 'tourism', 'transportation', 'welfare',
];


const publiccode: RulesetDefinition = {
  description: 'publiccode.yml 0.5',
  formats: [publiccode05],
  rules: {
    // --- Required top-level fields ---
    'publiccode-required-fields': {
      severity: 'error',
      given: '$',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: [
              'publiccodeYmlVersion',
              'name',
              'url',
              'platforms',
              'developmentStatus',
              'softwareType',
              'description',
              'legal',
              'maintenance',
              'localisation',
            ],
          },
        },
      },
      message: 'Missing required field: {{error}}.',
    },

    // --- publiccodeYmlVersion ---
    'publiccode-yml-version-enum': {
      severity: 'error',
      given: '$.publiccodeYmlVersion',
      then: {
        function: enumeration,
        functionOptions: {
          values: PUBLICCODE_YML_VERSIONS,
        },
      },
      message: `\`publiccodeYmlVersion\` must be one of: ${PUBLICCODE_YML_VERSIONS.join(', ')}. Got "{{value}}".`,
    },

    // --- name ---
    'publiccode-name-type': {
      severity: 'error',
      given: '$.name',
      then: {
        function: truthy,
      },
      message: '`name` must be a non-empty string.',
    },

    // --- url ---
    'publiccode-url-format': {
      severity: 'error',
      given: '$.url',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`url` must be a valid URL to the source code repository.',
    },

    // --- landingURL ---
    'publiccode-landing-url-format': {
      severity: 'warn',
      given: '$.landingURL',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`landingURL` must be a valid URL.',
    },

    // --- roadmap ---
    'publiccode-roadmap-format': {
      severity: 'warn',
      given: '$.roadmap',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`roadmap` must be a valid URL.',
    },

    // --- releaseDate ---
    'publiccode-release-date-format': {
      severity: 'error',
      given: '$.releaseDate',
      then: {
        function: pattern,
        functionOptions: {
          match: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
      message: '`releaseDate` must be a date in YYYY-MM-DD format. Got "{{value}}".',
    },

    // --- developmentStatus ---
    'publiccode-development-status-enum': {
      severity: 'error',
      given: '$.developmentStatus',
      then: {
        function: enumeration,
        functionOptions: {
          values: DEVELOPMENT_STATUSES,
        },
      },
      message: `\`developmentStatus\` must be one of: ${DEVELOPMENT_STATUSES.join(', ')}. Got "{{value}}".`,
    },

    // --- softwareType ---
    'publiccode-software-type-enum': {
      severity: 'error',
      given: '$.softwareType',
      then: {
        function: enumeration,
        functionOptions: {
          values: SOFTWARE_TYPES,
        },
      },
      message: `\`softwareType\` must be one of: ${SOFTWARE_TYPES.join(', ')}. Got "{{value}}".`,
    },

    // --- categories ---
    'publiccode-categories-enum': {
      severity: 'error',
      given: '$.categories[*]',
      then: {
        function: enumeration,
        functionOptions: {
          values: CATEGORIES,
        },
      },
      message: 'Invalid category "{{value}}". Must be one of the allowed categories.',
    },

    // --- intendedAudience.scope ---
    'publiccode-scope-enum': {
      severity: 'error',
      given: '$.intendedAudience.scope[*]',
      then: {
        function: enumeration,
        functionOptions: {
          values: SCOPE_VALUES,
        },
      },
      message: 'Invalid scope "{{value}}". Must be one of the allowed scope values.',
    },

    // --- intendedAudience.countries ---
    'publiccode-countries-format': {
      severity: 'error',
      given: '$.intendedAudience.countries[*]',
      then: {
        function: pattern,
        functionOptions: {
          match: '^[A-Z]{2}$',
        },
      },
      message: 'Country code "{{value}}" must be a two-letter uppercase ISO 3166-1 alpha-2 code.',
    },

    // --- intendedAudience.unsupportedCountries ---
    'publiccode-unsupported-countries-format': {
      severity: 'error',
      given: '$.intendedAudience.unsupportedCountries[*]',
      then: {
        function: pattern,
        functionOptions: {
          match: '^[A-Z]{2}$',
        },
      },
      message: 'Country code "{{value}}" must be a two-letter uppercase ISO 3166-1 alpha-2 code.',
    },

    // --- description ---
    'publiccode-description-has-language': {
      severity: 'error',
      given: '$.description',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'object',
            minProperties: 1,
          },
        },
      },
      message: '`description` must contain at least one language section (e.g. `en`, `nl`).',
    },

    'publiccode-description-short-description-required': {
      severity: 'error',
      given: '$.description.*',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['shortDescription'],
          },
        },
      },
      message: 'Each description language section must include `shortDescription`.',
    },

    'publiccode-description-short-description-max-length': {
      severity: 'error',
      given: '$.description.*.shortDescription',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string',
            maxLength: 150,
          },
        },
      },
      message: '`shortDescription` must not exceed 150 characters.',
    },

    'publiccode-description-long-description-length': {
      severity: 'error',
      given: '$.description.*.longDescription',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string',
            minLength: 150,
            maxLength: 10000,
          },
        },
      },
      message: '`longDescription` must be between 150 and 10000 characters.',
    },

    'publiccode-description-generic-name-max-length': {
      severity: 'error',
      given: '$.description.*.genericName',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'string',
            maxLength: 35,
          },
        },
      },
      message: '`genericName` must not exceed 35 characters.',
    },

    'publiccode-description-documentation-format': {
      severity: 'warn',
      given: '$.description.*.documentation',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`documentation` must be a valid URL.',
    },

    'publiccode-description-api-documentation-format': {
      severity: 'warn',
      given: '$.description.*.apiDocumentation',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`apiDocumentation` must be a valid URL.',
    },

    // --- legal ---
    'publiccode-legal-license-required': {
      severity: 'error',
      given: '$.legal',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['license'],
          },
        },
      },
      message: '`legal.license` is required and must be a valid SPDX expression.',
    },

    'publiccode-legal-license-truthy': {
      severity: 'error',
      given: '$.legal.license',
      then: {
        function: truthy,
      },
      message: '`legal.license` must be a non-empty SPDX expression.',
    },

    // --- maintenance ---
    'publiccode-maintenance-type-required': {
      severity: 'error',
      given: '$.maintenance',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['type'],
          },
        },
      },
      message: '`maintenance.type` is required.',
    },

    'publiccode-maintenance-type-enum': {
      severity: 'error',
      given: '$.maintenance.type',
      then: {
        function: enumeration,
        functionOptions: {
          values: MAINTENANCE_TYPES,
        },
      },
      message: `\`maintenance.type\` must be one of: ${MAINTENANCE_TYPES.join(', ')}. Got "{{value}}".`,
    },

    // --- maintenance.contacts ---
    'publiccode-maintenance-contact-name-required': {
      severity: 'error',
      given: '$.maintenance.contacts[*]',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['name'],
          },
        },
      },
      message: 'Each maintenance contact must have a `name`.',
    },

    // --- maintenance.contractors ---
    'publiccode-maintenance-contractor-required-fields': {
      severity: 'error',
      given: '$.maintenance.contractors[*]',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['name', 'until'],
          },
        },
      },
      message: 'Each contractor must have `name` and `until` fields.',
    },

    'publiccode-maintenance-contractor-until-format': {
      severity: 'error',
      given: '$.maintenance.contractors[*].until',
      then: {
        function: pattern,
        functionOptions: {
          match: '^\\d{4}-\\d{2}-\\d{2}$',
        },
      },
      message: 'Contractor `until` must be a date in YYYY-MM-DD format. Got "{{value}}".',
    },

    'publiccode-maintenance-contractor-website-format': {
      severity: 'warn',
      given: '$.maintenance.contractors[*].website',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: 'Contractor `website` must be a valid URL.',
    },

    // --- localisation ---
    'publiccode-localisation-required-fields': {
      severity: 'error',
      given: '$.localisation',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['localisationReady', 'availableLanguages'],
          },
        },
      },
      message: '`localisation` must include `localisationReady` and `availableLanguages`.',
    },

    'publiccode-localisation-ready-type': {
      severity: 'error',
      given: '$.localisation.localisationReady',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'boolean',
          },
        },
      },
      message: '`localisation.localisationReady` must be a boolean.',
    },

    'publiccode-localisation-available-languages-type': {
      severity: 'error',
      given: '$.localisation.availableLanguages',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            type: 'array',
            minItems: 1,
            items: { type: 'string' },
          },
        },
      },
      message: '`localisation.availableLanguages` must be a non-empty array of language strings (BCP 47).',
    },

    // --- dependsOn.*.name required ---
    'publiccode-dependency-name-required': {
      severity: 'error',
      given: ['$.dependsOn.open[*]', '$.dependsOn.proprietary[*]', '$.dependsOn.hardware[*]'],
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['name'],
          },
        },
      },
      message: 'Each dependency must have a `name`.',
    },

    // --- organisation.uri ---
    'publiccode-organisation-uri-required': {
      severity: 'error',
      given: '$.organisation',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['uri'],
          },
        },
      },
      message: '`organisation.uri` is required.',
    },

    'publiccode-organisation-uri-format': {
      severity: 'error',
      given: '$.organisation.uri',
      then: {
        function: pattern,
        functionOptions: {
          match: '^https?://',
        },
      },
      message: '`organisation.uri` must be a valid URL.',
    },

    // --- fundedBy organisations ---
    'publiccode-funded-by-uri-required': {
      severity: 'error',
      given: '$.fundedBy[*]',
      then: {
        function: schema,
        functionOptions: {
          schema: {
            required: ['uri'],
          },
        },
      },
      message: 'Each `fundedBy` organisation must have a `uri`.',
    },
  },
};

export default publiccode;
