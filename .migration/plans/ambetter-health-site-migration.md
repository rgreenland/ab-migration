# Full Site Migration Plan: Ambetter Health (ambetterhealth.com)

## Overview

Migrate the full **Ambetter Health** website (https://www.ambetterhealth.com/en/) to AEM Edge Delivery Services. This is a **xwalk (Universal Editor)** project based on the Adobe AEM Block Collection boilerplate. The migration will include content structure and full design fidelity (colors, fonts, spacing).

**Exclusion:** The "Select State" functionality/pages will be excluded from migration.

## Project Context

| Property | Value |
|----------|-------|
| Source URL | https://www.ambetterhealth.com/en/ |
| Project Type | xwalk (Universal Editor) |
| AEM Author | author-p169053-e1809681.adobeaemcloud.com |
| Existing Blocks | accordion, cards, carousel, columns, embed, footer, form, fragment, header, hero, modal, quote, search, table, tabs, video |
| Content Dir | Currently empty |
| Import Infra | Not yet created |

## Migration Strategy

1. **Site Analysis** — Crawl the site to discover all pages, identify page templates, and categorize URLs
2. **Page Analysis** — Analyze representative pages from each template to identify block variants and content structure
3. **Block Mapping** — Map discovered content patterns to existing EDS blocks or create new block variants
4. **Design Migration** — Extract and adapt the site's design system (colors, typography, spacing, layout)
5. **Import Infrastructure** — Generate block parsers and page transformers for each template
6. **Content Import** — Execute bulk import for all discovered pages
7. **Validation** — Verify migrated pages render correctly with design fidelity

## Checklist

### Phase 1: Discovery & Analysis
- [ ] Crawl site to discover all pages and build URL list
- [ ] Classify URLs into page templates (homepage, inner pages, blog, etc.)
- [ ] Exclude "Select State" related pages from migration scope
- [ ] Analyze representative page from each template type
- [ ] Document all unique block variants found across templates

### Phase 2: Block Mapping & Variants
- [ ] Map discovered blocks to existing EDS block library
- [ ] Identify blocks that need new variants or custom implementations
- [ ] Create block variant code for any new patterns
- [ ] Update component models for xwalk compatibility

### Phase 3: Design Migration
- [ ] Extract design tokens (colors, fonts, spacing, breakpoints)
- [ ] Migrate global site styles (typography, layout, utilities)
- [ ] Migrate block-specific styles for each variant
- [ ] Validate design against original site

### Phase 4: Import Infrastructure
- [ ] Create page-templates.json with all template definitions
- [ ] Generate block parsers for each block variant
- [ ] Generate page transformers (cleanup + sections)
- [ ] Bundle and validate import script

### Phase 5: Content Import
- [ ] Execute content import for all pages per template
- [ ] Verify HTML output structure for each template
- [ ] Fix any import errors or content issues

### Phase 6: Validation & QA
- [ ] Preview migrated pages in local dev server
- [ ] Compare visual fidelity against original site
- [ ] Fix any styling discrepancies
- [ ] Final review of all migrated pages

---

*This plan requires Execute mode to begin implementation. Switch to Execute mode to start Phase 1.*
