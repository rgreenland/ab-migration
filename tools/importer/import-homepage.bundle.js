/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
  });

  // tools/importer/parsers/hero-homepage.js
  function parse(element, { document }) {
    const image = element.querySelector(".featured-image img");
    const imageCell = document.createDocumentFragment();
    imageCell.appendChild(document.createComment(" field:image "));
    if (image) {
      const img = image.cloneNode(true);
      imageCell.appendChild(img);
    }
    const heading = element.querySelector(".featured-text .richtext h1");
    const subheading = element.querySelector(".featured-text .richtext h2");
    const description = element.querySelector(".featured-text .richtext h2 + p, .featured-text .richtext .clearfix p");
    const ctaLink = element.querySelector(".featured-text .button a.btn, .featured-text a.btn");
    const textCell = document.createDocumentFragment();
    textCell.appendChild(document.createComment(" field:text "));
    if (heading) {
      const h1 = document.createElement("h1");
      h1.textContent = heading.textContent.trim();
      textCell.appendChild(h1);
    }
    if (subheading) {
      const h2 = document.createElement("h2");
      h2.textContent = subheading.textContent.trim();
      textCell.appendChild(h2);
    }
    if (description) {
      const p = document.createElement("p");
      p.textContent = description.textContent.trim();
      textCell.appendChild(p);
    }
    if (ctaLink) {
      const p = document.createElement("p");
      const a = document.createElement("a");
      a.href = ctaLink.href || ctaLink.getAttribute("href");
      a.textContent = ctaLink.textContent.trim();
      p.appendChild(a);
      textCell.appendChild(p);
    }
    const cells = [
      [imageCell],
      [textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-homepage", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-action.js
  function parse2(element, { document }) {
    const desktopRow = element.closest(".row.hidden-xs") || element.querySelector(".row.hidden-xs");
    const container = desktopRow || element;
    const cardElements = container.querySelectorAll(".cardCols .featureCard, .cardCols > .featureCard");
    const cells = [];
    cardElements.forEach((card) => {
      const img = card.querySelector(".cardImage img.icon-img, .cardImage img");
      const heading = card.querySelector(".cardHeading h2, .cardHeading h3, .cardHeading h1");
      const cta = card.querySelector(".cardButton a.btn-default, .cardButton a");
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (img) {
        imageCell.appendChild(img);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (heading) {
        textCell.appendChild(heading);
      }
      if (cta) {
        const p = document.createElement("p");
        const srOnly = cta.querySelectorAll(".sr-only");
        srOnly.forEach((el) => el.remove());
        const externalIcons = cta.querySelectorAll("i.link-external, i.fa-external-link");
        externalIcons.forEach((el) => el.remove());
        p.appendChild(cta);
        textCell.appendChild(p);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-action", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-program.js
  function parse3(element, { document }) {
    const cardColumns = element.querySelectorAll(":scope > .colctrl-40.whiteSpace");
    const cells = [];
    cardColumns.forEach((card) => {
      const imageEl = card.querySelector(".richtext img");
      const richtextSections = card.querySelectorAll(".richtext");
      let heading = null;
      let description = null;
      if (richtextSections.length >= 2) {
        heading = richtextSections[1].querySelector("h3");
        description = richtextSections[1].querySelector("p");
      }
      const ctaLink = card.querySelector(".button a.btn");
      const imageCell = document.createDocumentFragment();
      imageCell.appendChild(document.createComment(" field:image "));
      if (imageEl) {
        imageCell.appendChild(imageEl);
      }
      const textCell = document.createDocumentFragment();
      textCell.appendChild(document.createComment(" field:text "));
      if (heading) {
        textCell.appendChild(heading);
      }
      if (description) {
        textCell.appendChild(description);
      }
      if (ctaLink) {
        const ctaParagraph = document.createElement("p");
        ctaParagraph.appendChild(ctaLink);
        textCell.appendChild(ctaParagraph);
      }
      cells.push([imageCell, textCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-program", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-promo.js
  function parse4(element, { document }) {
    const colPanels = element.querySelectorAll(":scope > div > .colctrl-50");
    if (colPanels.length < 2) {
      return;
    }
    const heading = element.querySelector(".colctrl-50:first-child h2");
    const paragraph = element.querySelector(".colctrl-50:first-child .richtext + .richtext p");
    const ctaLink = element.querySelector(".colctrl-50:first-child a.btn");
    const col1Content = [];
    if (heading) {
      const h2 = document.createElement("h2");
      h2.textContent = heading.textContent.trim();
      col1Content.push(h2);
    }
    if (paragraph) {
      col1Content.push(paragraph);
    }
    if (ctaLink) {
      const strong = document.createElement("strong");
      const link = document.createElement("a");
      link.href = ctaLink.href;
      link.textContent = ctaLink.textContent.trim();
      strong.append(link);
      col1Content.push(strong);
    }
    const image = element.querySelector(".colctrl-50:nth-child(2) img, .colctrl-50 + .colctrl-50 img");
    const col2Content = [];
    if (image) {
      col2Content.push(image);
    }
    const cells = [
      [col1Content, col2Content]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-promo", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/columns-appbanner.js
  function parse5(element, { document }) {
    const image = element.querySelector(".featured-image img, .featured-image.left img");
    const contentCell = [];
    const headingSpan = element.querySelector(".featured-text .richtext .clearfix span.rd-t-29-slab");
    if (headingSpan) {
      const heading = document.createElement("h2");
      heading.textContent = headingSpan.textContent.replace(/\s+/g, " ").trim();
      contentCell.push(heading);
    }
    const allParagraphs = element.querySelectorAll(".featured-text .richtext .clearfix p");
    allParagraphs.forEach((p) => {
      if (p.querySelector("span.rd-t-29-slab")) return;
      const text = p.textContent.replace(/ /g, " ").trim();
      if (!text) return;
      contentCell.push(p);
    });
    const ctaLink = element.querySelector(".featured-text .button .clearfix a.btn, .featured-text .button a.btn");
    if (ctaLink) {
      contentCell.push(ctaLink);
    }
    const cells = [
      [image || "", contentCell.length > 0 ? contentCell : ""]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-appbanner", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/ambetterhealth-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        ".cc-revoke",
        ".cc-window.cc-banner"
      ]);
      WebImporter.DOMUtils.remove(element, [".cmp-loader"]);
      WebImporter.DOMUtils.remove(element, [".universal-banner"]);
      WebImporter.DOMUtils.remove(element, [".skip-content"]);
      WebImporter.DOMUtils.remove(element, ["link"]);
      WebImporter.DOMUtils.remove(element, ["header#product-desktop-header", "header.container-fluid"]);
      WebImporter.DOMUtils.remove(element, ["footer.redesign-standard-footer", "footer"]);
      const stateMap = element.querySelector(".statemap");
      if (stateMap) {
        const mapContainer = stateMap.closest(".backgroundcolorbox.aem-GridColumn");
        if (mapContainer) {
          mapContainer.remove();
        }
      }
      const mobileCarousel = element.querySelector("#carousel1");
      if (mobileCarousel) {
        const carouselContainer = mobileCarousel.closest(".container-fluid");
        if (carouselContainer) {
          carouselContainer.remove();
        }
      }
      const ghostDivs = element.querySelectorAll(".ghost.aem-GridColumn");
      ghostDivs.forEach((ghost) => {
        if (ghost.textContent.trim() === "") {
          ghost.remove();
        }
      });
      WebImporter.DOMUtils.remove(element, ["iframe"]);
      WebImporter.DOMUtils.remove(element, ["noscript"]);
    }
    if (hookName === TransformHook.afterTransform) {
      const rdContentDivs = element.querySelectorAll(".rd-content");
      rdContentDivs.forEach((div) => {
        if (div.textContent.trim() === "") {
          div.remove();
        }
      });
    }
  }

  // tools/importer/transformers/ambetterhealth-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const { template } = payload;
      if (!template || !template.sections || template.sections.length < 2) {
        return;
      }
      const { document } = element.ownerDocument ? { document: element.ownerDocument } : { document: element.getRootNode() };
      const doc = document || element.ownerDocument;
      const sections = [...template.sections].reverse();
      for (const section of sections) {
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) {
          continue;
        }
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: [["style", section.style]]
          });
          sectionEl.after(metaBlock);
        }
        const isFirst = section.id === template.sections[0].id;
        if (!isFirst) {
          const hr = doc.createElement("hr");
          sectionEl.before(hr);
        }
      }
    }
  }

  // tools/importer/import-homepage.js
  var parsers = {
    "hero-homepage": parse,
    "cards-action": parse2,
    "cards-program": parse3,
    "columns-promo": parse4,
    "columns-appbanner": parse5
  };
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "Main landing page with hero, featured content, and program highlights",
    urls: ["https://www.ambetterhealth.com/en/"],
    blocks: [
      {
        name: "hero-homepage",
        instances: [".background-color-box.raspberry-background.marginBottom > .aem-Grid > .imagewithtext"]
      },
      {
        name: "cards-action",
        instances: [".featurecards .cardWrapper.four.theme_.medicaidFeatureCards"]
      },
      {
        name: "cards-program",
        instances: [".background-color-box.light-gray-background:not(.rounded) > .aem-Grid > .columncontrol .shared-column-control > .equalHeight"]
      },
      {
        name: "columns-promo",
        instances: [".background-color-box.marginBottom > .aem-Grid > .backgroundcolorbox > .background-color-box.marginBottom > .aem-Grid > .columncontrol .shared-column-control"]
      },
      {
        name: "columns-appbanner",
        instances: [".imagewithtext .container-fluid.imagetext.raspberry-background"]
      }
    ],
    sections: [
      {
        id: "section-hero",
        name: "Hero",
        selector: ".background-color-box.raspberry-background.marginBottom",
        style: "raspberry",
        blocks: ["hero-homepage"],
        defaultContent: []
      },
      {
        id: "section-promo-banner",
        name: "Promo Banner",
        selector: ".background-color-box.light-gray-background.rounded.img-rounded",
        style: "grey-rounded",
        blocks: [],
        defaultContent: [".background-color-box.light-gray-background.rounded .richtext .clearfix p", ".background-color-box.light-gray-background.rounded .button .btn"]
      },
      {
        id: "section-feature-cards",
        name: "Feature Cards",
        selector: ".featurecards.aem-GridColumn",
        style: null,
        blocks: ["cards-action"],
        defaultContent: []
      },
      {
        id: "section-programs-perks",
        name: "Programs and Perks",
        selector: ".background-color-box.light-gray-background:not(.rounded)",
        style: "grey",
        blocks: ["cards-program"],
        defaultContent: [".background-color-box.light-gray-background:not(.rounded) > .aem-Grid > .richtext h2"]
      },
      {
        id: "section-ichra",
        name: "ICHRA Coverage",
        selector: ".background-color-box.marginBottom > .aem-Grid > .backgroundcolorbox > .background-color-box.marginBottom",
        style: null,
        blocks: ["columns-promo"],
        defaultContent: []
      },
      {
        id: "section-app-promo",
        name: "App Promotion",
        selector: ".imagewithtext .container-fluid.imagetext.raspberry-background",
        style: "raspberry",
        blocks: ["columns-appbanner"],
        defaultContent: []
      },
      {
        id: "section-disclaimers",
        name: "Disclaimers",
        selector: ".background-color-box.gray-background",
        style: "grey",
        blocks: [],
        defaultContent: [".background-color-box.gray-background .richtext .clearfix p"]
      }
    ]
  };
  var transformers = [
    transform,
    transform2
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), { template: PAGE_TEMPLATE });
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
            element
          });
        });
      });
    });
    return pageBlocks;
  }
  var import_homepage_default = {
    transform: (payload) => {
      const { document, url, params } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "")
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_homepage_exports);
})();
