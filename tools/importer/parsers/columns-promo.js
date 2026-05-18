/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-promo
 * Base block: columns
 * Source: https://www.ambetterhealth.com/en/
 * Description: Two-column promo layout with text content (heading, paragraph, CTA) in column 1
 *              and an illustration image in column 2.
 * Generated: 2026-05-18
 */
export default function parse(element, { document }) {
  // Guard: only process the outer shared-column-control that has the two-column layout
  // (skip nested column controls that may also match the selector)
  const colPanels = element.querySelectorAll(':scope > div > .colctrl-50');
  if (colPanels.length < 2) {
    return;
  }

  // --- Column 1: Text content (heading + paragraph + CTA) ---

  // Extract heading from first .richtext containing h2
  const heading = element.querySelector('.colctrl-50:first-child h2');

  // Extract paragraph from second .richtext
  const paragraph = element.querySelector('.colctrl-50:first-child .richtext + .richtext p');

  // Extract CTA button link
  const ctaLink = element.querySelector('.colctrl-50:first-child a.btn');

  // Build column 1 content array
  const col1Content = [];

  if (heading) {
    // Create a clean heading element preserving text
    const h2 = document.createElement('h2');
    h2.textContent = heading.textContent.trim();
    col1Content.push(h2);
  }

  if (paragraph) {
    col1Content.push(paragraph);
  }

  if (ctaLink) {
    // Wrap CTA in strong for button styling
    const strong = document.createElement('strong');
    const link = document.createElement('a');
    link.href = ctaLink.href;
    link.textContent = ctaLink.textContent.trim();
    strong.append(link);
    col1Content.push(strong);
  }

  // --- Column 2: Image ---

  // Extract image from second .colctrl-50
  const image = element.querySelector('.colctrl-50:nth-child(2) img, .colctrl-50 + .colctrl-50 img');

  const col2Content = [];
  if (image) {
    col2Content.push(image);
  }

  // --- Build cells array matching library example: single row with 2 columns ---
  const cells = [
    [col1Content, col2Content],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-promo', cells });
  element.replaceWith(block);
}
