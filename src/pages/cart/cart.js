// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";
import { observeClick } from "../../metrics";
import xSVG from "./assets/x.svg";
import plusSVG from "./assets/plus.svg";
import minusSVG from "./assets/minus.svg";
import grayStarSVG from "../shared-assets/gray-star.svg";
import blueStarSVG from "../shared-assets/blue-star.svg";
import dollarSVG from "../shared-assets/dollar.svg";

const applyMetrics = () => {
  // [TPT1134] Cart | Clicked remove
  observeClick(`[data-testid="ProductRowRemoveCartProductBespoke"]`, "tpt1134-cart-clicked-remove");
  // [TPT1134] Cart | Move Resource to Wish List
  observeClick(`[data-testid="move-to-wish-list"]`, "tpt1134-cart-move-resource-to-wish-list");
};

const applyTreatment = () => {
  // Update subtitle text
  utils.waitForElement(`[class*="SkinnyHeaderLayout"] ~ span > [class*="CartPageLayout"] [class*="subtitleSection"] p`)
    .then(subtitle => subtitle.textContent = "Review and edit your order, then proceed to Checkout")
    .catch(error);

  // Update alert text
  utils.waitForElement(".RemoveDuplicatesAlert__removeDuplicates")
    .then(button => {
      button.textContent = "Remove Individual Resources";
      button.parentElement.insertAdjacentHTML("beforebegin", `
        <div></div>
        <p>Duplicate items in cart</p>
      `);
    })
    .catch(error);

  // TpT -> TPT
  utils.waitForElement(`[class*="SkinnyHeaderLayout"] ~ span > [class*="CartPageLayout"] .EmptyState__subtitle p:last-child`)
    .then(paragraph => paragraph.innerHTML = paragraph.innerHTML.replace("TpT", "TPT"))
    .catch(error);

  // TpT -> TPT and minor copy change
  utils.waitForElement(`[class*="SkinnyHeaderLayout"] ~ span > [class*="CartPageLayout"] .OrderActionsBespoke--responsive__trustLanguage`)
    .then(paragraph => paragraph.innerHTML = paragraph.innerHTML.replace("TpT", "TPT").replace("instantly downloaded", "downloaded instantly"))
    .catch(error);

  // Remove "by" text on product descriptions
  utils.observeSelector(".ProductRowStoreBespoke", item => item.innerHTML = item.innerHTML.replace("by ", ""));

  // Replace the "Remove" product SVG
  utils.observeSelector(`[data-testid="ProductRowRemoveCartProductBespoke"] a span > span`, icon => {
    icon.classList.add(`${TAG}-hidden`);
    icon.insertAdjacentHTML("afterend", xSVG);
  });

  // Replace license count buttons
  utils.observeSelector(".Counter__buttonsPlus", plus => plus.innerHTML = plusSVG);
  utils.observeSelector(".Counter__buttonsMinus", plus => plus.innerHTML = minusSVG);

  // Hide paginator when there is only one page
  utils.waitForElement(".CartPage__pageRangeCount")
    .then(range => {
      if (parseInt(range.innerText) <= 25) {
        range.parentElement.parentElement.parentElement.parentElement.classList.add(`${TAG}-hidden`);
      }
    }).catch(error);

  // Update star rating SVGs
  utils.observeSelector(`.Rating__star svg svg:first-child:not(.${TAG}-star)`, gray => {
    gray.classList.add(`${TAG}-hidden`);
    gray.insertAdjacentHTML("afterend", grayStarSVG);
  });
  utils.observeSelector(`.Rating__star svg svg:last-child:not(.${TAG}-star)`, blue => {
    blue.classList.add(`${TAG}-hidden`);
    blue.insertAdjacentHTML("afterend", blueStarSVG);

    const percent = blue.getAttribute("width");
    blue.nextElementSibling.setAttribute("style", `clip-path: polygon(0 0, 0 100%, ${percent} 100%, ${percent} 0)`);
  });

  // TpT -> TPT
  utils.waitForElement(".DiscountsBespoke--responsive__help a")
    .then(help => help.innerHTML = help.innerHTML.replace("TpT", "TPT"))
    .catch(error);

  // Remove grid lines between after a bundled resource
  utils.waitForElement(".ParentBundlesPrefab__content")
    .then(bundle => {
      const parent = bundle.parentElement.parentElement.parentElement.parentElement.parentElement;
      window.setTimeout(() => {
        if (parent.nextElementSibling) {
          parent.nextElementSibling.classList.add(`${TAG}-bundle`);
        }
      });
    })
    .catch(error);

  // Remove paginator "Next" and "Previous" text
  utils.observeSelector(".PaginatorControls > li:first-child, .PaginatorControls > li:last-child", controls => {
    const replace = () => {
      const next = document.querySelector(".PaginatorControls__next button");
      const previous = document.querySelector(".PaginatorControls__previous button");
      window.setTimeout(() => {
        if (next) {
          next.innerHTML = next.innerHTML.replace("Next", "");
        }

        if (previous) {
          previous.innerHTML = previous.innerHTML.replace("Previous", "");
        }
      }, 0);
    };
    replace();

    new MutationObserver(replace).observe(controls, { attributes: true });
  });

  // Remove log in link when cart is empty
  utils.waitForElement(".EmptyState")
    .then(() => {
      utils.waitForElement(".DiscountsBespoke--responsive").then(link => link.classList.add(`${TAG}-hidden`)).catch(error);
    })
    .catch(error);

  // Update account balance view
  utils.observeSelector(".RedeemAccountBalance__amountInput #label_AmountInput:first-child", label => {
    label.innerHTML = label.innerHTML.replace("Account balance:", `<span class="${TAG}-cart-account-label">Account balance:</span>`);
  });
  utils.observeSelector(".RedeemAccountBalance__amountInput #label_AmountInput:last-child span", input => {
    input.insertAdjacentHTML("afterbegin", dollarSVG);
  });

  utils.observeSelector(".ProductRowStoreBespoke", row => {
    row.insertAdjacentHTML("afterbegin", "<span>Created by</span>");
  });
};

export const cart = {
  name: "cart",
  applyMetrics,
  applyTreatment,
  checkURL: () => window.location.pathname === "/Cart"
};