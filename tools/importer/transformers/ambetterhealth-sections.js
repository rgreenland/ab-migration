/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: ambetterhealth sections.
 * Adds section breaks (<hr>) and section-metadata blocks based on template sections.
 * Runs only in afterTransform. Uses payload.template.sections from page-templates.json.
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const { template } = payload;
    if (!template || !template.sections || template.sections.length < 2) {
      return;
    }

    const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
    const doc = document || element.ownerDocument;

    // Process sections in reverse order to avoid offset issues when inserting elements
    const sections = [...template.sections].reverse();

    for (const section of sections) {
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) {
        continue;
      }

      // Add section-metadata block if section has a style
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: [['style', section.style]],
        });
        sectionEl.after(metaBlock);
      }

      // Add section break (<hr>) before section if it is not the first section
      const isFirst = section.id === template.sections[0].id;
      if (!isFirst) {
        const hr = doc.createElement('hr');
        sectionEl.before(hr);
      }
    }
  }
}
