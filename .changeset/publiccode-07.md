---
'@developer-overheid-nl/don-checker': minor
---

Add publiccode.yml **0.7** support: the `publiccode` standard now offers versions `0.5` and `0.7`
(default = `0.7`, legacy slugs `publiccode-05` / `publiccode-07`). The 0.7 ruleset validates
against the publiccode.yml 0.7 schema, including the new `supports` section (`alias:` identifiers
and URI/URN references), and the 0.5 version-format detection has been tightened to the actual
`0.2`–`0.5` version range.
