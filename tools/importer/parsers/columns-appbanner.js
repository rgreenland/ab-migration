/* eslint-disable */
/* global WebImporter */

/**
 * Parser: columns-appbanner
 * Base block: columns
 * Source: https://www.ambetterhealth.com/en/
 * Selector: .imagewithtext .container-fluid.imagetext.raspberry-background
 * Description: Two-column app promotion banner with phone image and download CTA
 * Generated: 2026-05-18
 */
export default function parse(element, { document }) {
  // Column 1: App screenshot image
  const image = element.querySelector('.featured-image img, .featured-image.left img');

  // Column 2: Text content (heading, body paragraphs, CTA)
  const contentCell = [];

  // Extract heading from span with slab font class
  const headingSpan = element.querySelector('.featured-text .richtext .clearfix span.rd-t-29-slab');
  if (headingSpan) {
    const heading = document.createElement('h2');
    // Clean the heading text (remove <br> tags and extra whitespace)
    heading.textContent = headingSpan.textContent.replace(/\s+/g, ' ').trim();
    contentCell.push(heading);
  }

  // Extract body paragraphs (skip the heading paragraph and trailing whitespace-only paragraphs)
  const allParagraphs = element.querySelectorAll('.featured-text .richtext .clearfix p');
  allParagraphs.forEach((p) => {
    // Skip paragraph that contains the heading span
    if (p.querySelector('span.rd-t-29-slab')) return;
    // Skip whitespace-only paragraphs
    const text = p.textContent.replace(/ /g, ' ').trim();
    if (!text) return;
    contentCell.push(p);
  });

  // Extract CTA button link
  const ctaLink = element.querySelector('.featured-text .button .clearfix a.btn, .featured-text .button a.btn');
  if (ctaLink) {
    contentCell.push(ctaLink);
  }

  // Build cells: single row with 2 columns (image | text content)
  // Columns blocks do NOT require field hint comments per xwalk hinting rules
  const cells = [
    [image || '', contentCell.length > 0 ? contentCell : '']
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-appbanner', cells });
  element.replaceWith(block);
}
