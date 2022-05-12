// eslint-disable-next-line no-unused-vars
import { SHARED, utils, log, error, init } from "base";
import { setAttributes } from "cromedics/optimizely/attributes";
import { globalHeader } from "./pages/global/header/header.js";
import { globalFooter } from "./pages/global/footer/footer.js";
import { homepage } from "./pages/homepage/homepage.js";
import { cart } from "./pages/cart/cart.js";
import { checkout } from "./pages/checkout/checkout.js";
import { pdp } from "./pages/pdp/pdp.js";
import { postPurchase } from "./pages/post-purchase/post-purchase.js";
import { atcModal } from "./pages/atc-modal/atc-modal.js";
import { searchBrowse } from "./pages/search-browse/search-browse";
const waitForReact = utils.waitForElement(".tpt-frontend").then(root => utils.waitUntil(() => root._reactRootContainer)).catch(error);
log('v2');

const modules = [
  searchBrowse,
  homepage,
  cart,
  checkout,
  pdp,
  postPurchase,
  atcModal,
  globalHeader,
  globalFooter,
];

SHARED.applyMetrics = variation => {
  waitForReact.then(() => {
    for (const module of modules) {
      if (module.checkURL()) {
        module.applyMetrics(variation);
      }
    }
  }).catch(error);
};

SHARED.applyTreatment = (variation, page) => {
  init(variation, page);

  waitForReact.then(() => {
    for (const module of modules) {
      if (module.checkURL()) {
        document.body.classList.add(`${TAG}-${module.name}`);
        module.applyTreatment(variation);
      }
    }
  }).catch(error);

  if (!window.sessionStorage.getItem(`${TAG}-entry-page`)) {
    let entryPage = "Other";

    const path = window.location.pathname;
    if (path === "/") {
      entryPage = "Homepage";
    } else if (path.startsWith("/Product")) {
      entryPage = "PDP";
    } else if (path.startsWith("/Browse")) {
      entryPage = "Search/Browse";
    }

    setAttributes({ "tpt1134-entry-page": entryPage });
    window.sessionStorage.setItem(`${TAG}-entry-page`, entryPage);
  }
};

SHARED.applyExperiments = variation => {
  log("inserting CSS");
  const element = document.createElement("style");
  element.setAttribute("type", "text/css");
  document.head.appendChild(element);

  element.appendChild(document.createTextNode(`
  .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access {
    position: relative !important;
    clear: both !important;
    padding-top: 10px !important;
 }
  .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access p {
    font-size: 14px !important;
    display: block !important;
    text-align: left !important;
    margin-bottom: 5px !important;
    margin-top: 20px !important;
 }
  .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access img {
    width: auto !important;
    height: 20px !important;
    margin-right: 50px !important;
    position: relative !important;
    top: -1px !important;
 }
  .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access .Button {
    background-color: #41539d !important;
    color: #fff !important;
    padding: 8px 10px !important;
    position: relative !important;
    top: -10px !important;
    margin-left: 10px !important;
 }
  .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
    font-size: 11px !important;
    margin-left: 10px !important;
 }
  @media only screen and (min-width: 780px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 14px !important;
   }
 }
  @media only screen and (min-width: 980px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 9px !important;
   }
 }
  @media only screen and (min-width: 995px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 10px !important;
   }
 }
  @media only screen and (min-width: 1019px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 11px !important;
   }
 }
  @media only screen and (min-width: 1042px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 12px !important;
   }
 }
  @media only screen and (min-width: 1065px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 13px !important;
   }
 }
  @media only screen and (min-width: 1088px) {
    .tpt-frontend .SearchProductRowLayout[data-crometrics-isavailableonschoolaccess="true"] .tpt-school-access a.Button {
      font-size: 14px !important;
   }
 }
  .tpt-frontend .tpt661-banner.price-box__tptsa {
    font-family: "Proxima Nova" !important;
    margin-bottom: 17px !important;
    background-color: #e8edf7 !important;
    border-radius: 3px !important;
    padding: 24px !important;
    text-align: center !important;
 }
  .tpt-frontend .tpt661-banner.price-box__tptsa p {
    font-family: "Proxima Nova" !important;
    font-size: 14px !important;
    font-weight: 700 !important;
    margin: 12px 0 !important;
    color: #1e1c4d !important;
 }
  .tpt-frontend .tpt661-banner.price-box__tptsa .cta-link {
    font-family: "Proxima Nova" !important;
    background-color: #3e51a2 !important;
    color: #fff !important;
    padding: 12px 18px !important;
    font-size: 16px !important;
    display: inline-block !important;
    width: 100% !important;
    border-radius: 28px !important;
    line-height: 1 !important;
    font-weight: 600 !important;
 }
  `));

  waitForReact.then(() => {
    for (const module of modules) {
      if (!module.applyExperiments) {
        return;
      }

      if (module.checkURL()) {
        module.applyExperiments(variation);
      }
    }
  }).catch(error);
};
