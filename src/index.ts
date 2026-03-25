import { RulesetPlugin, RulesetPluginIndex } from '@geonovum/standards-checker';
import type { RulesetDefinition } from '@geonovum/standards-checker/spectral/core';
import specs from './specs';
import adr20Rulesets from './specs/adr-20/rulesets';
import adr21Rulesets from './specs/adr-21/rulesets';
import adrConsultRulesets from './specs/adr-consult/rulesets';
import oasRulesets from './specs/oas/rulesets';

interface PluginConfig {
  slug: string;
  rulesets: Record<string, RulesetDefinition>;
}

const specsBySlug = new Map(specs.map(spec => [spec.slug, spec]));

interface RulesetTarget {
  slug: string;
  filter?: (uri: string, definition: RulesetDefinition) => boolean;
}

interface RulesetSource {
  slug: string;
  rulesets: Record<string, RulesetDefinition>;
  targets?: RulesetTarget[];
}

const collectRulesetGroups = (...sources: RulesetSource[]) => {
  const groups = new Map<string, Record<string, RulesetDefinition>>();

  sources.forEach(({ slug, rulesets, targets }) => {
    const resolvedTargets = targets ?? [{ slug }];

    resolvedTargets.forEach(({ slug: targetSlug, filter }) => {
      if (!specsBySlug.has(targetSlug)) {
        return;
      }

      const subset = filter
        ? Object.fromEntries(Object.entries(rulesets).filter(([uri, definition]) => filter(uri, definition)))
        : rulesets;

      if (!Object.keys(subset).length) {
        return;
      }

      const existing = groups.get(targetSlug) ?? {};
      groups.set(targetSlug, { ...existing, ...subset });
    });
  });

  return groups;
};

const buildPlugin = ({ slug, rulesets }: PluginConfig): RulesetPlugin => {
  return {
    id: slug,
    rulesets,
  };
};

const rulesetGroups = collectRulesetGroups(
  { slug: 'adr-20', rulesets: adr20Rulesets },
  { slug: 'adr-21', rulesets: adr21Rulesets },
  { slug: 'adr', rulesets: oasRulesets },
  { slug: 'adr-consult', rulesets: adrConsultRulesets },
);

const plugins = Array.from(rulesetGroups.entries()).reduce<RulesetPluginIndex>((acc, [slug, rulesets]) => {
  acc[slug] = buildPlugin({ slug, rulesets });
  return acc;
}, {});

export default plugins;
