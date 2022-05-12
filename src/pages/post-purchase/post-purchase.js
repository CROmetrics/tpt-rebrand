// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";
import { waitForClick } from "../../metrics";

// Author: Michael Verthein

const applyMetrics = () => {
  // [TPT1134] Post Purchase | TPTSA Banner | Clicks on CTA
  waitForClick(".cro-post-purchase-banner a", "tpt1134-post-purchase-tptsa-banner-clicks-on-cta");
};

const applyTreatment = () => {
  let newHeader = `<h1 class="${TAG}-post-purchase-header">Order Confirmation</h1>`;

  document.querySelectorAll('body')[0].classList.add(`${TAG}-post-purchase-cart`);

  let layoutParent = document.querySelectorAll('.col-xs-12.col-lg-10')[0];

  layoutParent.classList.remove('col-lg-10');
  layoutParent.classList.add('col-lg-12');

  let title = document.querySelectorAll('.OrderReceiptPageLayout__title')[0];

  title.insertAdjacentHTML('beforebegin', newHeader);

  let titleText = title.innerHTML;
  titleText = titleText.replace("Order Confirmation:", "Order");
  title.innerHTML = titleText;

  let productRows = document.querySelectorAll('.tpt-frontend .OrderItemProductRow');
  let cartCheckout = document.querySelectorAll('.tpt-frontend .OrderReceiptSummary')[0];

  let checkoutLayout = `
    <div class="row justify-content-between">
      <div class="col-xs-12 col-lg-8 ${TAG}-post-purchase-products"></div>
      <div class="col-xs-12 col-lg-4 ${TAG}-post-purchase-checkout"></div>
    </div>
  `;

  // let footer = document.querySelectorAll('.OrderReceiptPageLayout__footer')[0];
  let top = document.querySelectorAll('.OrderReceiptPageLayout__thankYou')[0].nextElementSibling;

  
  top.insertAdjacentHTML("afterend", checkoutLayout);

  for (let i = 0; i < productRows.length; i++) {
    document.getElementsByClassName(`${TAG}-post-purchase-products`)[0].appendChild(productRows[i]);
    productRows[i].getElementsByClassName('col-xs-3')[0].classList.add('col-md-4');
    productRows[i].getElementsByClassName('col-xs-9')[0].classList.add('col-md-8');
  }

  document.getElementsByClassName(`${TAG}-post-purchase-checkout`)[0].appendChild(cartCheckout);

  let createdBy = document.querySelectorAll('.ProductRowStoreBespoke');

  for (let i = 0; i < createdBy.length; i++) {
    let avatar = createdBy[i].getElementsByClassName('Avatar')[0].outerHTML;
    let store = createdBy[i].getElementsByClassName('ProductRowStoreBespoke__storeName')[0].outerHTML;
    createdBy[i].innerHTML = `Created by ${avatar} ${store}`;
  }


  let summaryTitle = `<div class="OrderReceiptSummary__header">Order Summary</div>`;
  let summary = document.querySelectorAll('.OrderReceiptSummary')[0];
  summary.insertAdjacentHTML('afterbegin', summaryTitle);
};

export const postPurchase = {
  name: "post-purchase",
  applyMetrics,
  applyTreatment,
  checkURL: () => window.location.pathname.includes("/Cart/Checkout/Done/")
};