import { adrVersions, type AdrVersionId } from '@developer-overheid-nl/adr-rulesets/versions';
import type { Standard, StandardVersion } from '@geonovum/standards-checker';
import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import adr20Example from './adr-20/example.json?raw';
import adr21Example from './adr-21/example.json?raw';
import adr22Example from './adr-22/example.json?raw';
import { adrWarnings } from './adr-warnings';
import oasExample from './oas/example.json?raw';

type AdrVersionUi = Pick<StandardVersion, 'label' | 'example' | 'legacySlug'>;

// Which ADR versions exist (and their status, URI and ruleset) comes from
// @developer-overheid-nl/adr-rulesets; only the UI fields live here. A new ADR
// version fails the typecheck until it gets an entry. Legacy slugs map each
// version back to its old `--ruleset` value / route.
const adrVersionUi: Record<AdrVersionId, AdrVersionUi> = {
  '2.0.2': { label: '2.0.2', example: adr20Example, legacySlug: 'adr-20' },
  '2.1.0': { label: '2.1.0', example: adr21Example, legacySlug: 'adr-21' },
  '2.2.0': { label: '2.2.0', example: adr22Example, legacySlug: 'adr-22' },
  werkversie: { label: 'Werkversie', example: oasExample, legacySlug: 'adr-werkversie' },
};

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
    ...adrVersionUi[version.id],
  })),
};

export default apiDesignRules;
