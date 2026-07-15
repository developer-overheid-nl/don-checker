---
'@developer-overheid-nl/don-checker': patch
---

Ship the `publiccode` examples (all versions) as YAML instead of JSON, so opening the
publiccode.yml standard starts the editor in YAML mode
([#55](https://github.com/developer-overheid-nl/don-checker/issues/55)). All examples
now load verbatim from their checked-in fixture files, so the ADR/OAS examples render
with the fixtures' own formatting (e.g. short arrays inline).
