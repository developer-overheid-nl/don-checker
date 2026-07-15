---
"@developer-overheid-nl/don-checker": minor
---

Adopt the **Standard → Version** model from `@geonovum/standards-checker`.

The specs are now version-less standards that each own an ordered list of versions: the ADR
rulesets are grouped under a single `adr` standard (versions `2.0.2`, `2.1.0`, and the `werkversie`
draft, defaulting to `2.1.0`), and `publiccode` is its own standard. A single `Standard[]` config
drives both the web app and the CLI.

- **CLI:** validate with `--standard <slug>` and optional `--version <id>` (default = the latest
  `final` version). The old `--ruleset <slug>` flag keeps working as a **deprecated** alias that
  warns on stderr and resolves to the equivalent standard/version.
- **UI:** the header gains a standard selector and an always-visible version selector; the URL anchor
  is `/#/{standard}/{version}` and legacy single-slug URLs redirect to it.
- Remove the ADR public-consultation (`consultatie` / "Consultatie 2026Q1") version — that
  consultation has finished.
