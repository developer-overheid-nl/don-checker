# DON Checker

[![npm](https://img.shields.io/npm/v/@developer-overheid-nl/don-checker)](https://www.npmjs.com/package/@developer-overheid-nl/don-checker)

Validates OpenAPI specifications against the [API Design Rules](https://logius-standaarden.github.io/API-Design-Rules/), plus `publiccode.yml` files.

Built on [`@geonovum/standards-checker`](https://github.com/Geonovum/standards-checker); see its documentation for the validation engine, CLI toolkit, and web UI framework.

**Demo:** https://developer-overheid-nl.github.io/don-checker/

## CLI

### Quick start (via npx)

```bash
# From a local file (ADR, default version 2.1.0)
npx @developer-overheid-nl/don-checker@latest validate --standard adr --input ./openapi.json

# Pin a specific version
npx @developer-overheid-nl/don-checker@latest validate --standard adr --version 2.0.2 --input ./openapi.json

# From stdin
cat openapi.json | npx @developer-overheid-nl/don-checker@latest validate --standard adr
```

### Install globally

```bash
npm install -g @developer-overheid-nl/don-checker@latest
don-checker validate --standard adr --input ./openapi.json
```

### From a local clone

```bash
pnpm install
pnpm build:cli
node dist/cli.mjs validate --standard adr --input ./openapi.json
```

Available standards:

| Standard (`--standard`) | Versions (`--version`)         | Default | Legacy `--ruleset`               |
| ----------------------- | ------------------------------ | ------- | -------------------------------- |
| `adr`                   | `2.0.2`, `2.1.0`, `werkversie` | `2.1.0` | `adr-20`, `adr-21`, `adr`        |
| `publiccode`            | `0.5`, `0.7`                   | `0.7`   | `publiccode-05`, `publiccode-07` |

`--version` is optional; omitting it selects the latest final version (for `adr`, that is `2.1.0`).
The old `--ruleset <slug>` flag still works as a **deprecated** alias — it prints a warning on stderr
and resolves the old slug to the same standard/version (e.g. `--ruleset adr-20` ==
`--standard adr --version 2.0.2`; `--ruleset adr` == the `werkversie` draft).

### CLI flags

| Flag                | Description                                       | Default      |
| ------------------- | ------------------------------------------------- | ------------ |
| `--standard <slug>` | Standard to validate against                      | _(required)_ |
| `--version <id>`    | Version of the standard                           | latest final |
| `--ruleset <slug>`  | **Deprecated** alias for `--standard`/`--version` | —            |
| `--input <file\|->` | Input file, URL, or `-` for stdin                 | `-`          |
| `--format <fmt>`    | Output: `table`, `json`                           | `table`      |
| `--fail-on <level>` | Exit code policy: `none`, `warn`, `error`         | `error`      |

Exit codes: `0` = pass, `1` = failed per `--fail-on` policy, `>1` = unexpected error.

## Development

### Prerequisites

- Node.js 24+
- pnpm 10+

### Setup

```bash
pnpm install
```

### Commands

| Command          | Description                                |
| ---------------- | ------------------------------------------ |
| `pnpm dev`       | Vite dev server with hot reload            |
| `pnpm build`     | Full build: tsc + CLI bundle + vite webapp |
| `pnpm build:cli` | Build only the CLI binary (`dist/cli.mjs`) |
| `pnpm test`      | Vitest in watch mode                       |
| `pnpm test run`  | Vitest single run                          |
| `pnpm lint`      | Check for lint and formatting issues       |
| `pnpm lint:fix`  | Auto-fix lint and formatting issues        |

### Versioning & releasing

Versioning, the changelog, and publishing are driven by [Changesets](https://changesets.dev/). Describing a change is decoupled from cutting a release:

1. **Add a changeset with your change.** Run `pnpm changeset`, pick the bump (`major` / `minor` / `patch`), and write a one-line summary. This creates a `.changeset/<name>.md` file — commit it with your PR. Omit only for changes that don't affect the published package (CI, internal docs, tests).

2. **Cut the release.** Run `pnpm version-packages` (alias for `changeset version`). It consumes the pending `.changeset/*.md` files, bumps `package.json`, and prepends the summaries to `CHANGELOG.md`. Review and commit the result. Don't hand-edit the `version` field — Changesets owns it.

3. **Publish.** Tag the released version and push; the CI workflow verifies `package.json` matches the tag, builds, tests, publishes to npm, and deploys to GitHub Pages:

   ```bash
   git tag v1.1.0
   git push --tags
   ```

   `pnpm release` (`pnpm build && changeset publish`) publishes to npm locally if you need to bypass the workflow (it does not deploy Pages).

#### Pre-releases

To publish `-beta.N` prereleases before a final release, enter Changesets pre-release mode first; steps 2–3 above then produce prereleases until you exit:

```bash
pnpm changeset pre enter beta   # writes .changeset/pre.json — commit it
```

While in pre mode:

- `pnpm version-packages` computes e.g. `1.1.0-beta.0`; running it again after new changesets land bumps to `-beta.1`, and so on. Final releases are blocked until you exit pre mode.
- Tag and push as usual (`git tag v1.1.0-beta.0`). The publish workflow publishes any version containing a `-` under the npm dist-tag `beta`, so `latest` keeps pointing at the last final release.
- Consumed `.changeset/*.md` files are **kept** (tracked in `.changeset/pre.json`) so the final release's changelog can aggregate them — don't delete them by hand.
- The `-beta.N` counter is derived from the current `package.json` version — one more reason never to hand-edit `version`; a hand-set version shifts the counter.

When the release is ready to go final, exit pre mode and version again:

```bash
pnpm changeset pre exit         # removes .changeset/pre.json
pnpm version-packages           # computes the final version and cleans up the consumed changesets
```

Commit, tag (`v1.1.0`), and push — the same workflow now publishes under `latest`.

## License

[EUPL-1.2](LICENSE)
