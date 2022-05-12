// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";
import { waitForClick, observeClick } from "../../metrics";
// import signupModule from "./assets/html/signup-module.html";
import signupModule from "./assets/html/signup-module";
import arrowSVG from "./assets/arrow.svg"; // no harded tag on this one
// import grayStarSVG from "../tpt1134/shared-assets/gray-star.svg";
import grayStarSVG from "../tpt1134/shared-assets/gray-star";
// import blueStarSVG from "../tpt1134/shared-assets/blue-star.svg";
import blueStarSVG from "../tpt1134/shared-assets/blue-star";

const applyMetrics = () => {
  // [TPT1134] Homepage | Editorial Module 1 | Clicks on CTA
  waitForClick(".tpt1134-module-top-left a", "tpt1134-homepage-editorial-1-clicks-on-cta");
  // [TPT1134] Homepage | Editorial Module 2 | Clicks on CTA
  waitForClick(".tpt1134-module-middle-left a", "tpt1134-homepage-editorial-2-clicks-on-cta");
  // [TPT1134] Homepage | Editorial Module 3 | Clicks on CTA
  waitForClick(".tpt1134-module-bottom a", "tpt1134-homepage-editorial-3-clicks-on-cta");
  // [TPT1134] Homepage | Editorial Module 4 | Clicks on CTA
  waitForClick(".tpt1134-signup-module a", "tpt1134-homepage-editorial-4-clicks-on-cta");

  // [TPT1134] Hompage | Filter Applied
  observeClick(".tpt1134-new-inputs-grade-dropdown label, .SpecificGradesMenuLayout__mainGradeColumn label, .tpt1134-new-inputs-subject-dropdown label, .SearchMenuSubjectAreaLayout label, .tpt1134-new-inputs-price-dropdown label, .SearchMenuSubjectAreaLayout + .FilterMenuLayout label", "tpt1134-homepage-filter-applied");
  // [TPT1134] Homepage | Grade Filter Applied
  observeClick(".tpt1134-new-inputs-grade-dropdown label, .SpecificGradesMenuLayout__mainGradeColumn label", "tpt1134-homepage-grade-filter-applied");
  // [TPT1134] Homepage | Subject Filter Applied
  observeClick(".tpt1134-new-inputs-subject-dropdown label, .SearchMenuSubjectAreaLayout label", "tpt1134-homepage-subject-filter-applied");
  // [TPT1134] Homepage | Price Filter Applied
  observeClick(".tpt1134-new-inputs-price-dropdown label, .SearchMenuSubjectAreaLayout + .FilterMenuLayout label", "tpt1134-homepage-price-filter-applied");

  // [TPT1134] Homepage | Resource Card Engagement
  observeClick(".ProductCard", "tpt1134-homepage-resource-card-engagement");
  // [TPT1134] Homepage | RYML Resource Card Engagement
  observeClick(".ResourcesYouMayLikeLayout .ProductCard", "tpt1134-homepage-ryml-resource-card-engagement");
  // [TPT1134] Homepage | Device and Hybrid Resource Card Engagement
  observeClick(".TpTDAEnabledResourcesLayout .ProductCard", "tpt1134-homepage-device-hybrid-card-engagement");
};

const applyTreatment = () => {
  // Move footer links into the header and update copy
  utils.observeSelector(".CardRowLayout .CardRowLayout__footerLink", footer => {
    if (footer.parentElement.querySelector(".Carousel")) {
      return;
    }

    footer.innerHTML = footer.innerHTML.replace("See more", "View All");
    footer.previousElementSibling.previousElementSibling?.querySelector(".CardRowLayout__title").appendChild(footer);
  });

  // Insert logged out signup module
  Promise.all([utils.waitForElement(".LoggedOutHomePageLayout"), utils.waitForElement(`.${TAG}-global-footer`)])
    .then(([, footer]) => footer.insertAdjacentHTML("beforebegin", signupModule))
    .catch(error);

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

  // Update the view all arrow
  utils.observeSelector(".CardRowLayout .CardRowLayout__header .CardRowLayout__footerLink a span", arrow => {
    arrow.insertAdjacentHTML("beforebegin", arrowSVG);
    arrow.remove();
  });

  // Remove easel activity image
  utils.observeSelector(`.DigitalActivityBadge__section > [data-testid="tpt-easel-badge"]`, badge => {
    badge.textContent = "Easel";
  });
};

export const homepage = {
  name: "homepage",
  applyMetrics,
  applyTreatment,
  checkURL: () => window.location.pathname === "/"
};
