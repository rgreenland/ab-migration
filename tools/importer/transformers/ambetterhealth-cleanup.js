/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: ambetterhealth cleanup.
 * Removes non-authorable content from Ambetter Health pages.
 * All selectors verified against captured DOM in migration-work/cleaned.html.
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Cookie consent banner
    WebImporter.DOMUtils.remove(element, [
      '.cc-revoke',
      '.cc-window.cc-banner',
    ]);

    // Securiti CMP loader
    WebImporter.DOMUtils.remove(element, ['.cmp-loader']);

    // Universal banner widget
    WebImporter.DOMUtils.remove(element, ['.universal-banner']);

    // Skip-to-content link
    WebImporter.DOMUtils.remove(element, ['.skip-content']);

    // Remove link elements (CSS clientlib refs)
    WebImporter.DOMUtils.remove(element, ['link']);

    // Header navigation (must be removed before parsing to avoid nav content in output)
    WebImporter.DOMUtils.remove(element, ['header#product-desktop-header', 'header.container-fluid']);

    // Footer
    WebImporter.DOMUtils.remove(element, ['footer.redesign-standard-footer', 'footer']);

    // State coverage map section - interactive map with state links
    const stateMap = element.querySelector('.statemap');
    if (stateMap) {
      const mapContainer = stateMap.closest('.backgroundcolorbox.aem-GridColumn');
      if (mapContainer) {
        mapContainer.remove();
      }
    }

    // Mobile carousel duplicate of feature cards (only keep desktop grid)
    const mobileCarousel = element.querySelector('#carousel1');
    if (mobileCarousel) {
      const carouselContainer = mobileCarousel.closest('.container-fluid');
      if (carouselContainer) {
        carouselContainer.remove();
      }
    }

    // Remove empty ghost divs
    const ghostDivs = element.querySelectorAll('.ghost.aem-GridColumn');
    ghostDivs.forEach((ghost) => {
      if (ghost.textContent.trim() === '') {
        ghost.remove();
      }
    });

    // Remove tracking iframes
    WebImporter.DOMUtils.remove(element, ['iframe']);

    // Remove noscript tags (GTM noscript etc)
    WebImporter.DOMUtils.remove(element, ['noscript']);
  }

  if (hookName === TransformHook.afterTransform) {
    // Final cleanup: remove any remaining empty wrapper divs
    const rdContentDivs = element.querySelectorAll('.rd-content');
    rdContentDivs.forEach((div) => {
      if (div.textContent.trim() === '') {
        div.remove();
      }
    });
  }
}
