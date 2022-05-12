// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";

// Author: Ross Joo

const applyMetrics = () => {

};

const applyTreatment = () => {
  /**
   * Use only on PLPs
   * @param {element} modalProductName
   * @returns {string|null} price or null if not found
   */
  const findProductListPriceByTitle = (modalProductName) => {
    if (!modalProductName || !modalProductName.textContent) return null;

    const modalProductNameText = modalProductName.textContent.trim();
    const productTitles = [...document.querySelectorAll('.ProductRowTitleBespoke')];

    for (let i = 0, l = productTitles.length; i < l; i++) {
      if (productTitles[i].textContent.trim() === modalProductNameText) {
        const originalPrice = productTitles[i].parentNode.parentNode.parentNode.querySelector('[data-testid="productrow-price-original"]');

        return originalPrice
          ? originalPrice.textContent
          : null;
      }
    }

    return null;
  };

  const apply = (modal) => {
    if (!modal) return;

    modal.classList.add('cro__atc-modal');

    // Change image resolution to original
    const productImage = modal.querySelector('[data-testid="product-image"]');
    productImage.style.backgroundImage = productImage.style.backgroundImage.replace('/large-', '/original-');

    // Change author line
    const author = modal.querySelector('.ProductRowStoreBespoke');
    author.innerHTML = /*html*/ `
      <span class="cro__ProductRowStoreBespoke__label">Created by</span>
      ${author.innerHTML.replace('by ', '')}
    `;

    // List price if product is discounted
    let listPrice = null;

    // On the PDP page, it should just be a simple selector lookup
    if (window.location.pathname.toLowerCase().startsWith('/product/')) {
      const listPriceEl = document.querySelector('.SavingsDisplayLayout__originalPriceNumber');

      if (listPriceEl) {
        listPrice = listPriceEl.textContent;
      }
    } else {
      // On the browse page, try to find the matching product by title
      listPrice = findProductListPriceByTitle(modal.querySelector('.AddToCartModalLayout__productName'));
    }

    if (listPrice) {
      // Only display the strikethrough/discount if the list price and actual price differ
      const productPrice = modal.querySelector('.AddToCartModalLayout__productPrice');
      if (productPrice.textContent != listPrice)
        productPrice.insertAdjacentHTML('afterbegin', /*html*/`
          <span class="cro__listPrice">${listPrice}</span>
        `);
    }
  };

  utils.observeSelector('.DialogModal__header', header => {
    if (header.textContent.includes('Added to cart')) {
      try {
        apply(header.closest('.DialogModalPortal'));
      } catch(e) { error(e); }
    }
  });
};

export const atcModal = {
  name: "atc-modal",
  applyMetrics,
  applyTreatment,
  checkURL: () => window.location.pathname.includes("/Browse") || window.location.pathname.includes("/Product")
};