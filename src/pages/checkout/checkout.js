// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";
import checkSVG from "./assets/check.svg";
import grayStarSVG from "../shared-assets/gray-star.svg";
import blueStarSVG from "../shared-assets/blue-star.svg";
import dollarSVG from "../shared-assets/dollar.svg";

const applyMetrics = () => {

};

const applyTreatment = () => {
  // TpT -> TPT
  utils.observeSelector(".DiscountsBespoke--responsive__help a", help => help.innerHTML = help.innerHTML.replace("TpT", "TPT"));

  // "Required" -> "*"
  utils.observeSelector(".Label__caption", required => {
    if (required.textContent === "Required") {
      required.textContent = "*";
      required.classList.add(`${TAG}-asterisk`);
    }
  });

  // Update payment method checkmark
  utils.observeSelector(".braintree-method__icon.braintree-method__check", check => {
    check.classList.add(`${TAG}-hidden`);
    check.insertAdjacentHTML("afterend", checkSVG);
  });

  // Class added for ease of usability
  utils.observeSelector("#label_saveAddress", label => label.parentElement.classList.add(`${TAG}-cart-checkbox`));

  // Add asterisks to payment method
  utils.observeSelector(`[data-braintree-id="cvv-field-group"] .braintree-form__label, [data-braintree-id="expiration-date-field-group"] .braintree-form__label, [data-braintree-id="number-field-group"] .braintree-form__label`, label => {
    label.insertAdjacentHTML("beforeend", `<span class="${TAG}-asterisk>*</span>`);
  });

  // Remove styles when going to the purchase order page
  utils.observeSelector(".CardInformationBespoke__purchaseOrderButton, .PurchaseOrderLayout--responsive__toggle-text", purchaseOrder => {
    purchaseOrder.addEventListener("click", () => document.body.classList.toggle("no-rebrand-styles"));
  });

  // Update account balance view
  utils.observeSelector(".RedeemAccountBalance__amountInput #label_AmountInput:first-child", label => {
    label.innerHTML = label.innerHTML.replace("Account balance:", `<span class="${TAG}-cart-account-label">Account balance:</span>`);
  });
  utils.observeSelector(".RedeemAccountBalance__amountInput #label_AmountInput:last-child span.InputWrapper", input => {
    input.insertAdjacentHTML("afterbegin", dollarSVG);
  });

  // Update em dash to double dash
  utils.observeSelector(".OrderActionsSummary--responsive__lineItems__taxPlaceholder__dash span", dash => dash.innerHTML = dash.innerHTML.replace("—", "--"));

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

  // Update store layout
  utils.observeSelector(".CartProductRowLayout--responsive .ProductRowStoreBespoke", store => {
    store.innerHTML = store.innerHTML.replace("by", "<span>Created by</span>");
  });
};

export const checkout = {
  name: "checkout",
  applyMetrics,
  applyTreatment,
  checkURL: () => window.location.pathname === "/Cart/Checkout"
};