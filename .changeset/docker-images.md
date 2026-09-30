---
'@developer-overheid-nl/don-checker': patch
---

Add a `Dockerfile` with two targets: `cli` (the default) runs the `don-checker` CLI on a distroless,
non-root Node image, and `web` serves the web UI with Caddy as a non-root user. See the README's
"Docker" section for build and run commands.
