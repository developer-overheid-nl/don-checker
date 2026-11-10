# Maintenance

How to perform recurring maintenance tasks on this project.

## Adding a new publiccode.yml version

Follow these steps when the [publiccode.yml](https://publiccodeyml.github.io/) standard
publishes a new version. They are written from the 0.8 upgrade (see git history) and
assume the new version is `X.Y`.

1. **Check the upstream release notes** ([releases](https://github.com/publiccodeyml/publiccode.yml/releases))
   to see which keys were added, removed or deprecated, and whether the controlled
   vocabularies (categories, scope, software types) changed.

2. **`src/standards/formats.ts`** — add a `publiccodeXY` format matcher for the new
   version (e.g. `/^0\.8(?:\.0)?$/`), mirroring the previous one, including the
   `displayName` line.

3. **`src/standards/publiccode/rulesets/publiccode.ts`**:
   - Add `PUBLICCODE_XY_URI = 'https://yml.publiccode.tools/schema/X.Y'`.
   - Add `PUBLICCODE_XY_YML_VERSIONS = [...<previous>, 'X.Y', 'X.Y.0']`.
   - Add a `publiccodeXY` ruleset. If the new spec version only deprecates or clarifies
     keys, spread the previous ruleset's rules and only override
     `publiccode-yml-version-enum`. If keys were added/removed/changed, adjust the rules
     (and the shared vocabularies) accordingly.
   - Point `export default` at the new ruleset.

4. **`src/standards/publiccode/rulesets/index.ts`** — add `publiccodeXYRulesets` binding
   the new URI to the new ruleset.

5. **`src/standards/publiccode/example-X.Y.yaml`** — new editor example; the previous
   example with `publiccodeYmlVersion` bumped is usually enough. Drop keys that the new
   version deprecates.

6. **`src/standards/index.ts`** — import the example and rulesets, and append a version
   entry `{ id: 'X.Y', label: 'X.Y', status: 'final', example, rulesets, legacySlug: 'publiccode-XY' }`.
   Keep entries ordered oldest → newest: the framework picks the last `final` entry as
   the default version in both CLI and web UI. Use `status: 'draft'` to expose a version
   without making it the default.

7. **Tests**:
   - `src/standards/index.test.ts` — extend the hardcoded version-id list and add the
     new URI binding assertion.
   - `src/standards/publiccode/rulesets/publiccode.test.ts` — add a describe block for
     the new version (format match + valid document). Use a dedicated `OpenLint`
     instance per ruleset: rules still run when a document doesn't match the ruleset's
     format, so a shared instance tests documents against the wrong ruleset.

8. **`README.md`** — update the "Validate publiccode.yml" example text and the standards
   table (versions, default, legacy `--ruleset` slugs).

9. **`publiccode.yml`** (repo root) — bump this project's own manifest to the new
   version and fix anything the new spec version deprecates.

10. **Changeset** — add `.changeset/<name>.md` with a `minor` bump. Do not hand-edit
    `CHANGELOG.md`; Changesets owns it (see README → Versioning & releasing).

### Verification

```bash
pnpm lint && pnpm test run && pnpm build
node dist/cli.mjs validate --standard publiccode --input ./publiccode.yml          # default = new version
node dist/cli.mjs validate --standard publiccode --version <previous> --input ...  # old version still works
node dist/cli.mjs validate --ruleset publiccode-XY --input ...                     # legacy slug works
```
