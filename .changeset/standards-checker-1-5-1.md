---
'@developer-overheid-nl/don-checker': patch
---

Update `@geonovum/standards-checker` to 1.5.1 and `@developer-overheid-nl/adr-rulesets` to 0.2.1. The CLI's top-level
`--help` now describes the `validate` command and shows example invocations, and an unknown option ends with a hint to run
`--help`. Both packages now depend on the same OpenLint releases, so one copy of each OpenLint library is installed; the
checked rules and their results don't change.
