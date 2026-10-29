---
'@developer-overheid-nl/don-checker': minor
---

Validate with [OpenLint](https://github.com/openlint/openlint) (the `openlint@1.1.2` release) instead of Stoplight
Spectral, through `@geonovum/standards-checker` 1.5 and `@developer-overheid-nl/adr-rulesets` 0.2. OpenLint is the
community fork of Spectral and reads the same rulesets, so the ADR requirements don't change. The rulesets and tests now
import from `@geonovum/standards-checker/openlint/*` instead of the deprecated `spectral/*` subpaths.

ADR 2.1.0 keeps the inherited OAS rules switched on, and those now come from OpenLint: they link to
`https://docs.openlint.org/reference/openapi-rules`, and two rules change slightly (`operation-operationId-valid-in-url`
has a reworded message, and `duplicated-entry-in-enum` matches fewer nodes).
