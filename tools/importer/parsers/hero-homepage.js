/* eslint-disable */
/* global WebImporter */

/**
 * Parser: hero-homepage
 * Base block: hero
 * Source: https://www.ambetterhealth.com/en/
 * Generated: 2026-05-18
 *
 * UE Model fields:
 *   - image (reference) — hero image
 *   - imageAlt (collapsed into image alt attribute)
 *   - text (richtext) — heading, subheading, description, CTA
 *
 * Source DOM structure:
 *   .imagewithtext > .container-fluid.imagetext > .row
 *     > .featured-text (h1, h2, p, button/CTA)
 *     > .featured-image img
 */
export default function parse(element, { document }) {
  // Extract image from .featured-image
  const image = element.querySelector('.featured-image img');

  // Build image cell with field hint
  const imageCell = document.createDocumentFragment();
  imageCell.appendChild(document.createComment(' field:image '));
  if (image) {
    const img = image.cloneNode(true);
    imageCell.appendChild(img);
  }

  // Extract text content: heading, subheading, description, CTA
  const heading = element.querySelector('.featured-text .richtext h1');
  const subheading = element.querySelector('.featured-text .richtext h2');
  const description = element.querySelector('.featured-text .richtext h2 + p, .featured-text .richtext .clearfix p');
  const ctaLink = element.querySelector('.featured-text .button a.btn, .featured-text a.btn');

  // Build text cell with field hint — combine all text content into one richtext cell
  const textCell = document.createDocumentFragment();
  textCell.appendChild(document.createComment(' field:text '));

  if (heading) {
    const h1 = document.createElement('h1');
    h1.textContent = heading.textContent.trim();
    textCell.appendChild(h1);
  }

  if (subheading) {
    const h2 = document.createElement('h2');
    h2.textContent = subheading.textContent.trim();
    textCell.appendChild(h2);
  }

  if (description) {
    const p = document.createElement('p');
    p.textContent = description.textContent.trim();
    textCell.appendChild(p);
  }

  if (ctaLink) {
    const p = document.createElement('p');
    const a = document.createElement('a');
    a.href = ctaLink.href || ctaLink.getAttribute('href');
    a.textContent = ctaLink.textContent.trim();
    p.appendChild(a);
    textCell.appendChild(p);
  }

  // Build cells array matching UE model: 2 rows (image, text)
  const cells = [
    [imageCell],
    [textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-homepage', cells });
  element.replaceWith(block);
}
