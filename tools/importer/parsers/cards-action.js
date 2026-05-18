/* eslint-disable */
/* global WebImporter */

/**
 * Parser for cards-action
 * Base block: cards
 * Source: https://www.ambetterhealth.com/en/
 * Selector: .featurecards .cardWrapper.four.theme_.medicaidFeatureCards
 * Generated: 2026-05-18
 *
 * Extracts feature cards from the desktop grid layout (.row.hidden-xs).
 * Each card has an icon image, heading, and CTA button.
 * UE Model: container block with "card" items having fields: image, text
 * Each card = one row with two columns: [image] | [text (heading + CTA)]
 */
export default function parse(element, { document }) {
  // Target only the desktop grid (hidden-xs row), not the mobile carousel
  const desktopRow = element.closest('.row.hidden-xs')
    || element.querySelector('.row.hidden-xs');

  // Get the container to work from - prefer desktop row if found
  const container = desktopRow || element;

  // Extract all card elements from the desktop layout
  const cardElements = container.querySelectorAll('.cardCols .featureCard, .cardCols > .featureCard');

  const cells = [];

  cardElements.forEach((card) => {
    // Extract image - validated selector: .cardImage img.icon-img
    const img = card.querySelector('.cardImage img.icon-img, .cardImage img');

    // Extract heading - validated selector: .cardHeading h2
    const heading = card.querySelector('.cardHeading h2, .cardHeading h3, .cardHeading h1');

    // Extract CTA button - validated selector: .cardButton a.btn-default
    const cta = card.querySelector('.cardButton a.btn-default, .cardButton a');

    // Build image cell with field hint
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(' field:image '));
    if (img) {
      imageCell.appendChild(img);
    }

    // Build text cell with field hint (heading + CTA combined as richtext)
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(' field:text '));
    if (heading) {
      textCell.appendChild(heading);
    }
    if (cta) {
      // Wrap CTA in paragraph for proper richtext structure
      const p = document.createElement('p');
      // Clean up external link icons and sr-only spans inside the link
      const srOnly = cta.querySelectorAll('.sr-only');
      srOnly.forEach((el) => el.remove());
      const externalIcons = cta.querySelectorAll('i.link-external, i.fa-external-link');
      externalIcons.forEach((el) => el.remove());
      p.appendChild(cta);
      textCell.appendChild(p);
    }

    // Each card is one row with two columns: image | text
    cells.push([imageCell, textCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-action', cells });
  element.replaceWith(block);
}
