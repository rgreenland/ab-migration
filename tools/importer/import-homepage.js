/* eslint-disable */
/* global WebImporter */

import heroHomepageParser from './parsers/hero-homepage.js';
import cardsActionParser from './parsers/cards-action.js';
import cardsProgramParser from './parsers/cards-program.js';
import columnsPromoParser from './parsers/columns-promo.js';
import columnsAppbannerParser from './parsers/columns-appbanner.js';

import cleanupTransformer from './transformers/ambetterhealth-cleanup.js';
import sectionsTransformer from './transformers/ambetterhealth-sections.js';

const parsers = {
  'hero-homepage': heroHomepageParser,
  'cards-action': cardsActionParser,
  'cards-program': cardsProgramParser,
  'columns-promo': columnsPromoParser,
  'columns-appbanner': columnsAppbannerParser,
};

const PAGE_TEMPLATE = {
  name: 'homepage',
  description: 'Main landing page with hero, featured content, and program highlights',
  urls: ['https://www.ambetterhealth.com/en/'],
  blocks: [
    {
      name: 'hero-homepage',
      instances: ['.background-color-box.raspberry-background.marginBottom > .aem-Grid > .imagewithtext'],
    },
    {
      name: 'cards-action',
      instances: ['.featurecards .cardWrapper.four.theme_.medicaidFeatureCards'],
    },
    {
      name: 'cards-program',
      instances: ['.background-color-box.light-gray-background:not(.rounded) > .aem-Grid > .columncontrol .shared-column-control > .equalHeight'],
    },
    {
      name: 'columns-promo',
      instances: ['.background-color-box.marginBottom > .aem-Grid > .backgroundcolorbox > .background-color-box.marginBottom > .aem-Grid > .columncontrol .shared-column-control'],
    },
    {
      name: 'columns-appbanner',
      instances: ['.imagewithtext .container-fluid.imagetext.raspberry-background'],
    },
  ],
  sections: [
    {
      id: 'section-hero',
      name: 'Hero',
      selector: '.background-color-box.raspberry-background.marginBottom',
      style: 'raspberry',
      blocks: ['hero-homepage'],
      defaultContent: [],
    },
    {
      id: 'section-promo-banner',
      name: 'Promo Banner',
      selector: '.background-color-box.light-gray-background.rounded.img-rounded',
      style: 'grey-rounded',
      blocks: [],
      defaultContent: ['.background-color-box.light-gray-background.rounded .richtext .clearfix p', '.background-color-box.light-gray-background.rounded .button .btn'],
    },
    {
      id: 'section-feature-cards',
      name: 'Feature Cards',
      selector: '.featurecards.aem-GridColumn',
      style: null,
      blocks: ['cards-action'],
      defaultContent: [],
    },
    {
      id: 'section-programs-perks',
      name: 'Programs and Perks',
      selector: '.background-color-box.light-gray-background:not(.rounded)',
      style: 'grey',
      blocks: ['cards-program'],
      defaultContent: ['.background-color-box.light-gray-background:not(.rounded) > .aem-Grid > .richtext h2'],
    },
    {
      id: 'section-ichra',
      name: 'ICHRA Coverage',
      selector: '.background-color-box.marginBottom > .aem-Grid > .backgroundcolorbox > .background-color-box.marginBottom',
      style: null,
      blocks: ['columns-promo'],
      defaultContent: [],
    },
    {
      id: 'section-app-promo',
      name: 'App Promotion',
      selector: '.imagewithtext .container-fluid.imagetext.raspberry-background',
      style: 'raspberry',
      blocks: ['columns-appbanner'],
      defaultContent: [],
    },
    {
      id: 'section-disclaimers',
      name: 'Disclaimers',
      selector: '.background-color-box.gray-background',
      style: 'grey',
      blocks: [],
      defaultContent: ['.background-color-box.gray-background .richtext .clearfix p'],
    },
  ],
};

const transformers = [
  cleanupTransformer,
  sectionsTransformer,
];

function executeTransformers(hookName, element, payload) {
  const enhancedPayload = { ...payload, template: PAGE_TEMPLATE };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
        });
      });
    });
  });
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const { document, url, params } = payload;
    const main = document.body;

    executeTransformers('beforeTransform', main, payload);

    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
    pageBlocks.forEach((block) => {
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name}:`, e);
        }
      }
    });

    executeTransformers('afterTransform', main, payload);

    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, ''),
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
