---
'@developer-overheid-nl/don-checker': patch
---

Rename the werkversie draft's legacy slug from `adr` to `adr-werkversie`, so the bare `adr` slug no longer shadows the standard itself: `/#/adr` and `--standard adr` now consistently resolve to the ADR standard's default version (`2.1.0`), and the deprecated `--ruleset adr-werkversie` alias (previously `--ruleset adr`) selects the werkversie draft.
