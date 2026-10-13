---
'@developer-overheid-nl/don-checker': patch
---

Take the ADR versions (ids, status, conformance-class URIs and rulesets) from `adrVersions` in
`@developer-overheid-nl/adr-rulesets` instead of maintaining them here. don-checker only adds the editor
example per version and its own warnings; labels and legacy slugs are derived from the version id. The
CLI and the web UI offer the same versions, labels and legacy slugs as before.
