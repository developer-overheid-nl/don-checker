# @developer-overheid-nl/don-checker

## 1.1.0-beta.1

### Patch Changes

- 100b2bd: Rename the werkversie draft's legacy slug from `adr` to `adr-werkversie`, so the bare `adr` slug no longer shadows the standard itself: `/#/adr` and `--standard adr` now consistently resolve to the ADR standard's default version (`2.1.0`), and the deprecated `--ruleset adr-werkversie` alias (previously `--ruleset adr`) selects the werkversie draft.
- b833f22: Ship the `publiccode` examples (all versions) as YAML instead of JSON, so opening the
  publiccode.yml standard starts the editor in YAML mode
  ([#55](https://github.com/developer-overheid-nl/don-checker/issues/55)). All examples
  now load verbatim from their checked-in fixture files, so the ADR/OAS examples render
  with the fixtures' own formatting (e.g. short arrays inline).
- 100b2bd: Update `@geonovum/standards-checker` to the final `1.2.0` release (back to a
  caret range now that the pre-release period is over).

## 1.1.0-beta.0

### Minor Changes

- 1ad5c02: Adopt the **Standard → Version** model from `@geonovum/standards-checker`.

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

- 1ad5c02: Add publiccode.yml **0.7** support: the `publiccode` standard now offers versions `0.5` and `0.7`
  (default = `0.7`, legacy slugs `publiccode-05` / `publiccode-07`). The 0.7 ruleset validates
  against the publiccode.yml 0.7 schema, including the new `supports` section (`alias:` identifiers
  and URI/URN references), and the 0.5 version-format detection has been tightened to the actual
  `0.2`–`0.5` version range.
