# DON Checker

[![npm](https://img.shields.io/npm/v/@developer-overheid-nl/don-checker)](https://www.npmjs.com/package/@developer-overheid-nl/don-checker)

Validates OpenAPI specifications against the [API Design Rules](https://logius-standaarden.github.io/API-Design-Rules/).

Built on [`@geonovum/standards-checker`](https://github.com/Geonovum/standards-checker); see its documentation for the validation engine, CLI toolkit, and web UI framework.

**Demo:** https://developer-overheid-nl.github.io/don-checker/

## CLI

### Quick start (via npx)

```bash
# From a local file
npx @developer-overheid-nl/don-checker@latest validate --ruleset adr-20 --input ./openapi.json

# From a URL
npx @developer-overheid-nl/don-checker@latest validate --ruleset adr-20 --input https://example.com/openapi.json

# From stdin
cat openapi.json | npx @developer-overheid-nl/don-checker@latest validate --ruleset adr-20
```

### Install globally

```bash
npm install -g @developer-overheid-nl/don-checker@latest
don-checker validate --ruleset adr-20 --input ./openapi.json
```

### From a local clone

```bash
pnpm install
pnpm build:cli
node dist/cli.mjs validate --ruleset adr-20 --input ./openapi.json
```

Available rulesets: `adr-20`, `adr-21`, `adr`, `adr-consult`.

### CLI flags

| Flag                | Description                               | Default      |
| ------------------- | ----------------------------------------- | ------------ |
| `--ruleset <name>`  | Ruleset to run (listed in `--help`)       | _(required)_ |
| `--input <file\|->` | Input file, URL, or `-` for stdin         | `-`          |
| `--format <fmt>`    | Output: `table`, `json`                   | `table`      |
| `--fail-on <level>` | Exit code policy: `none`, `warn`, `error` | `error`      |

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
| `pnpm build:cli` | Build only the CLI binary (`dist/cli.js`)  |
| `pnpm test`      | Vitest in watch mode                       |
| `pnpm test run`  | Vitest single run                          |
| `pnpm lint`      | Check for lint and formatting issues       |
| `pnpm lint:fix`  | Auto-fix lint and formatting issues        |

### Publishing

Published to npm automatically when a version tag is pushed:

```bash
git tag v1.0.0
git push --tags
```

This triggers the CI workflow that builds, tests, publishes to npm, and deploys to GitHub Pages.

## License

[EUPL-1.2](LICENSE)
