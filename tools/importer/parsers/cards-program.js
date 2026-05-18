/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-program
 * Base block: cards
 * Source: https://www.ambetterhealth.com/en/
 * Selector: .background-color-box.light-gray-background:not(.rounded) > .aem-Grid > .columncontrol .shared-column-control > .equalHeight
 * Generated: 2026-05-18
 *
 * UE Model (card): image (reference), text (richtext)
 * Container block: each card = 1 row with [image, text] columns
 * Field hints required for xwalk: image, text
 */
export default function parse(element, { document }) {
  // Each card is a .colctrl-40.whiteSpace div within the .equalHeight container
  const cardColumns = element.querySelectorAll(':scope > .colctrl-40.whiteSpace');

  const cells = [];

  cardColumns.forEach((card) => {
    // Extract image from first .richtext section
    const imageEl = card.querySelector('.richtext img');

    // Extract heading (h3) and description (p) from second .richtext section
    const richtextSections = card.querySelectorAll('.richtext');
    let heading = null;
    let description = null;

    if (richtextSections.length >= 2) {
      heading = richtextSections[1].querySelector('h3');
      description = richtextSections[1].querySelector('p');
    }

    // Extract CTA link from .button section
    const ctaLink = card.querySelector('.button a.btn');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (imageEl) {
      imageCell.appendChild(imageEl);
    }

    // Build text cell with field hint - combines heading, description, and CTA
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (heading) {
      textCell.appendChild(heading);
    }
    if (description) {
      textCell.appendChild(description);
    }
    if (ctaLink) {
      // Wrap CTA in a paragraph for proper block rendering
      const ctaParagraph = document.createElement('p');
      ctaParagraph.appendChild(ctaLink);
      textCell.appendChild(ctaParagraph);
    }

    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-program', cells });
  element.replaceWith(block);
}
