---
'@developer-overheid-nl/don-checker': patch
---

Take the ADR versions (ids, status, conformance-class URIs and rulesets) from `adrVersions` in
`@developer-overheid-nl/adr-rulesets` instead of maintaining them here. don-checker only adds the UI
fields (label, example, legacy slug) and its own warnings. The CLI and the web UI offer the same
versions as before.
