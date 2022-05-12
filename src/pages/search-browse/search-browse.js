// eslint-disable-next-line no-unused-vars
import { utils, log, error, sendEvent } from "base";
import { observeClick } from "../../metrics";

const applyMetrics = () => {
  // [TPT1134] Search/Browse | Pagination Engagement
  observeClick(`.Paginator__pages .PaginatorControls li a`, "tpt1134-search-browse-pagination-engagement");
  // [TPT1134] Search/Browse | Left Rail Filter Engagement
  observeClick(`.MobileSearchMenu label, .MobileSearchMenu input, .MobileSearchMenu select option`, "tpt1134-search-browse-left-rail-filter-engagement");
  // [TPT1134] Search/Browse | Global Header Filter Engagement
  observeClick(`.tpt1134-new-inputs-grade-dropdown label, .tpt1134-new-inputs-subject-dropdown label, .tpt1134-new-inputs-price-dropdown label`, "tpt1134-search-browse-global-header-filter-engagement");
  // [TPT1134] Search Results Actions | Bundle Item Click | Cart Add
  utils.observeSelector(".SearchProductRowLayout .NextSearchProductRowLayout__actionsContainer .CartButtonContainer button", button => {
    button.addEventListener("click", () => {
      if (button.textContent === "Add to cart" && button.parentElement.parentElement.parentElement.querySelector(".ProductRowFileTypeBespoke__boldText")?.textContent === "Bundle") {
        sendEvent("tpt1134-search-results-actions-bundle-item-click-cart-add");
        window.heap.track("tpt1134-search-results-actions-bundle-item-click-cart-add");
      }
    });
  });
  observeClick(`.SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a`, "tpt1122-search-in-line-tptsa-callout-clicks");
};

const applyTreatment = () => {
  // Update sort/view inline classes
  utils.observeSelector('.SearchResultsHeader__headerSort, .SearchResultsHeader__headerView', header =>
    header.className = header.className.replace('-inline', '-inline-flex')
  );

  // Change "You Selected" to just "Selected"
  utils.observeSelector('.SearchBreadcrumbsBox__title', breadcrumbTitle => breadcrumbTitle.textContent = 'Selected:');

  // Update easel filter item
  // observeSelector('[for="Format_Easel"] .Label__title', easelLabel =>
  //   easelLabel.insertAdjacentHTML('afterbegin', 'Easel')
  // );

  // Update product card CTAs
  // observeSelector('.NextSearchProductRowLayout__actionsContainer .Button--primary:not(:disabled)', atcButton => {
  //   console.log(atcButton.textContent);
  //   atcButton.textContent = atcButton.textContent.replace('cart', 'Cart');
  // });
  // observeSelector('.NextSearchProductRowLayout__actionsContainer .AddToWishList:not(:disabled)', wishlistButton => {
  //   console.log(wishlistButton.textContent);
  //   wishlistButton.innerHTML = wishlistButton.innerHTML.replace('Wish List', 'Wishlist');
  // });

  // Change author line
  utils.observeSelector('.ProductRowStoreBespoke', author => {
    if (author.textContent.includes('Created by')) return;

    author.innerHTML = /*html*/ `
      <span class="cro__ProductRowStoreBespoke__label">Created by</span>
      ${author.innerHTML.replace('by ', '')}
    `;
  });

  // Remove superscript from grades. @todo: I don't like this...
  utils.observeSelector('.Grade__sup', grade => {
    grade.outerHTML = grade.textContent;
  });

  utils.observeSelector('.ProductImage', productImg => {
    if (productImg.src)
      productImg.src = productImg.src.replace('/large-', '/original-');
    else if (productImg.style && productImg.style.backgroundImage)
      productImg.style.backgroundImage = productImg.style.backgroundImage.replace('/large-', '/original-');

    if (productImg.parentNode && productImg.parentNode.classList.contains('ImageMagnifier')) {
      productImg.insertAdjacentHTML('beforebegin', `<div class="cro__ImageGradient"></div>`);
    }
  });

  utils.observeSelector('label[for="Format_Format/All-Easel"] .Label__title, label[for="Format_Easel"] .Label__title, [data-testid="tpt-easel-badge"]', easelBadge => {
    if (easelBadge.textContent.includes('Easel') || !easelBadge.querySelector('img')) return;

    easelBadge.insertAdjacentHTML('afterbegin', 'Easel');
  });

  utils.observeSelector('.PaginatorControls__previous .Button, .PaginatorControls__next .Button', pageNavBtn => {
    const isNext = pageNavBtn.textContent.includes('Next');
    pageNavBtn.innerHTML = /*html*/ `
      <span class="d-none" aria-hidden="true" style="display: none !important">${isNext ? 'Next' : 'Previous'}</span>
      <span class="tpticon tpticon-angle-${isNext ? 'right' : 'left'} Button__icon${isNext ? 'Left' : 'Right'}"></span>
    `;
  });

  // Update sort by label
  utils.waitForElement('.SearchResultsHeader__headerLabel').then(sortHeaderLabel =>
    sortHeaderLabel.textContent = 'Sort by:'
  ).catch(error);

  // Remove random 0 at the end of some product rows -- likely prod bug
  utils.observeSelector(".ProductRowFacetsBespoke", productRow => {
    const html = productRow.innerHTML;
    if (html.endsWith("0")) {
      productRow.innerHTML = html.substring(0, html.length - 1);
    }
  });

  utils.observeSelector(".VideoDuration", video => video.parentElement.parentElement.classList.add(`${TAG}-search-browse-video`));
};

const applyExperiments = () => {
  const experiments = [];

  // TPT-1122
  experiments.push(() => {
    const utmLink = `https://www.teacherspayteachers.com/TpTSchoolAccess/Teachers?utm_source=marketplace&utm_medium=optimizely&utm_campaign=tpt1122v0`;

    utils.observeSelector('.SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .NextSearchProductRowLayout__descriptionContainer', (el) => {

      const getElement = () => el.querySelector(".tpt-school-access");
      if (getElement()) {
        return;
      }

      el.insertAdjacentHTML('beforeend', `
        <div class="tpt-school-access">
          <p>Also available with subscription</p>
          <img src="//cdn.optimizely.com/img/20328970170/e30c72021d9e4233afa2ec0b2101f6a8.png" alt="TpT Schools Access" height="28">
          <a class="Button Button--medium Button--fullWidth" href="${utmLink}">Learn More</a>
        </div>
      `);

      new MutationObserver(mutations => {
        for (const mutation of mutations) {
          if (mutation.target && mutation.target.classList.contains("tpt-school-access")) {
            getElement().classList.add(`${TAG}-hidden`);
          }
        }
      }).observe(el, { childList: true, subtree: true });
    });
  });

  for (const apply of experiments) {
    apply();
  }
};

export const searchBrowse = {
  name: "search-browse",
  applyMetrics,
  applyTreatment,
  applyExperiments,
  checkURL: () => window.location.pathname.includes("/Browse")
};