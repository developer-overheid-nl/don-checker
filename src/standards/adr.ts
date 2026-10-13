import { adrVersions, type AdrVersion, type AdrVersionId } from '@developer-overheid-nl/adr-rulesets/versions';
import type { Standard } from '@geonovum/standards-checker';
import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adr20Example from './adr-20/example.json?raw';
import adr21Example from './adr-21/example.json?raw';
import adr22Example from './adr-22/example.json?raw';
import { adrWarnings } from './adr-warnings';
import oasExample from './oas/example.json?raw';

// Which ADR versions exist (and their status, URI and ruleset) comes from
// @developer-overheid-nl/adr-rulesets. Only the editor example is written per
// version, so a new ADR version fails the typecheck until it gets one.
const adrExamples: Record<AdrVersionId, string> = {
  '2.0.2': adr20Example,
  '2.1.0': adr21Example,
  '2.2.0': adr22Example,
  werkversie: oasExample,
};

const label = (version: AdrVersion): string =>
  version.status === 'draft' ? version.id.charAt(0).toUpperCase() + version.id.slice(1) : version.id;

// The old `--ruleset` value / route of each version: `adr-20` for 2.0.x,
// `adr-werkversie` for the draft.
const legacySlug = (version: AdrVersion): string =>
  version.status === 'draft' ? `adr-${version.id}` : `adr-${version.id.split('.').slice(0, 2).join('')}`;

// Every ADR version runs its adr-rulesets ruleset plus don-checker's own warnings.
export const withAdrWarnings = (ruleset: RulesetDefinition): RulesetDefinition => ({
  extends: [ruleset],
  rules: {
    ...adrWarnings,
  },
});

// Versions are listed ascending (old -> new), as adr-rulesets orders them; the
// UI shows them reversed and defaults to the latest final version.
const apiDesignRules: Standard = {
  name: 'API Design Rules',
  slug: 'adr',
  versions: adrVersions.map(version => ({
    id: version.id,
    status: version.status,
    rulesets: { [version.uri]: withAdrWarnings(version.ruleset as RulesetDefinition) },
    label: label(version),
    example: adrExamples[version.id],
    legacySlug: legacySlug(version),
  })),
};

export default apiDesignRules;
