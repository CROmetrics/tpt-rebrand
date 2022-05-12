// eslint-disable-next-line no-unused-vars
import { utils, log, error, sendEvent } from "base";
import { observeClick } from "../../metrics";
import grayStarSVG from "../shared-assets/gray-star.svg";
import blueStarSVG from "../shared-assets/blue-star.svg";
import facebookSVG from "./assets/facebook.svg";
//import instagramSVG from "./assets/instagram.svg";
import pinterestSVG from "./assets/pinterest.svg";
import infoSVG from "./assets/info.svg";
import reportFlagSVG from "./assets/report-flag.svg";
//import reportFlag2SVG from "./assets/report-flag-2.svg";

const applyMetrics = () => {
  // [TPT1134] PDP | Clicks on Buy licenses to share
  observeClick(`[data-testid="pricebox-license-button"] button`, "tpt1134-pdp-clicks-on-buy-licenses-to-share");
  // [TPT1134] PDP | Bundle | Clicks on products in this bundle OR Also included in upsell
  observeClick(`.BundledResourceCardPrefab__discount a, .BundledResourceCardPrefab .ProductRowImageBespoke a, .BundledResourceCardPrefab__details__title a, .BundledResourceCardPrefab__preview button`, "tpt1134-pdp-bundle-clicks-on-bundle-products-or-upsell");
  // [TPT1134] PDP | Clicks on More from Seller resources
  observeClick(`.AboutAuthorResponsive__seeAll, .ProductPageLayout__authorSection .MoreProductsLayout a`, "tpt1134-pdp-clicks-on-more-from-seller-resources");
  // [TPT1134] PDP | TPTSA Banner | Clicks on CTA
  observeClick(`.price-box__tptsa a, .tpt1015-box a, .tpt960-box a`, "tpt1134-pdp-tptsa-banner-clicks-on-cta");
  // [TPT1134] PDP | Follow Seller Click
  observeClick(`.AboutAuthorV2__followButton a, .AboutAuthorV2__followButton button, .AboutAuthorResponsive__followButton a, .AboutAuthorResponsive__followButton button`, "tpt1134-pdp-follow-seller-click");
};

const applyTreatment = () => {
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

  // Remove "to TpT" text
  utils.waitForElement(".StickyProductPageSideColumnLayout a.CopyRightInfringement")
    .then(text => text.innerHTML = text.innerHTML.replace(" to TpT", ""))
    .catch(error);

  utils.observeSelector(".BarChart__yTitle", text => text.textContent = "Reviews");

  utils.waitForElement(".ReportInappropriate__header")
    .then(header => header.textContent = header.textContent.replace("TpT", "TPT"))
    .catch(error);

  utils.observeSelector(".StandardPill__jurisdiction", pill => pill.textContent = pill.textContent + " | ");

  utils.waitForElement(".DigitalActivityBlurb .DigitalActivityBlurb__body strong")
    .then(text => text.textContent = text.textContent.replace("TpT", "TPT"))
    .catch(error);

  utils.waitForElement(".ReportInappropriate__anchorGuideline")
    .then(text => text.textContent = text.textContent.replace("TpT", "TPT"))
    .catch(error);

  utils.waitForElement(".CommentLegacyContainer__loadMore button")
    .then(text => {
      text.textContent = "Show more Q&A's";
      text.insertAdjacentHTML("beforeend", "<img src='//cdn.optimizely.com/img/11000223989/f4e927b5b7554c15a8a0881ef38feeec.png'/>");
    })
    .catch(error);

  utils.observeSelector(`[data-testid="toggleAnchorText"]`, text => text.textContent = text.textContent.replace("Translate", "Change").replace(".", ""));

  utils.waitForElement(`[data-testid="toggleCrosswalkLink"]`)
    .then(text => text.textContent = text.textContent.replace("(", "").replace(")", "").replace("see", "See"))
    .catch(error);

  utils.waitForElement(".ProductSocialButton.FacebookButton a span")
    .then(button => {
      button.insertAdjacentHTML("afterend", facebookSVG);
      button.remove();
    })
    .catch(error);

  utils.waitForElement(".ProductSocialButton.PinterestButton a span")
    .then(button => {
      button.insertAdjacentHTML("afterend", pinterestSVG);
      button.remove();
    })
    .catch(error);

  utils.observeSelector(".CopyRightInfringement__reportInfringementFlag", button => {
    button.insertAdjacentHTML("afterend", reportFlagSVG);
    button.remove();
  });

  utils.observeSelector(".CommentFlagButton span", icon => {
    icon.insertAdjacentHTML("afterend", "<img src='//cdn.optimizely.com/img/11000223989/32c00bf94b0c4287b838754d3bc39c9a.png'/>");
    icon.remove();
  });

  utils.waitForElement(".ReportInappropriate__header")
    .then(header => {
      header.textContent = "Report resource";
      header.insertAdjacentHTML("afterbegin", "<img src='//cdn.optimizely.com/img/11000223989/32c00bf94b0c4287b838754d3bc39c9a.png'/>");
    })
    .catch(error);

  utils.waitForElement(".CrosswalkConfig__icon")
    .then(button => {
      button.insertAdjacentHTML("afterend", infoSVG);
      button.remove();
    })
    .catch(error);

  utils.waitForElement(`[data-testid="showCrosswalkText"]`)
    .then(text => {
      if (text.textContent === "Showing CCSS.") {
        text.textContent = "Showing CCSS standards.";
      }
    })
    .catch(error);

  utils.waitForElement(".DigitalActivityBadge__section span")
    .then(easel => easel.textContent = "Easel Activity")
    .catch(error);

  utils.waitForElement(".EaselAssessmentBadge span")
    .then(easel => easel.textContent = "Easel Assessment")
    .catch(error);

  utils.waitForElement(".FrequentlyAssignedBadge--badge")
    .then(badge => {
      badge.parentElement.parentElement.parentElement.insertAdjacentElement("afterend", badge);
      badge.querySelector(".FrequentlyAssignedBadge__text").textContent = "Frequently assigned in Easel";
      const icon = badge.querySelector(".tpticon");
      icon.insertAdjacentHTML("afterend", "<img src='//cdn.optimizely.com/img/11000223989/46a467425e1342948a0ef5644a2c685e.png'/>");
      icon.remove();
    })
    .catch(error);

  utils.observeSelector(`[data-testid="CommentsLoadMoreButton"]`, button => {
    button.insertAdjacentHTML("beforeend", "<img src='//cdn.optimizely.com/img/11000223989/f4e927b5b7554c15a8a0881ef38feeec.png'/>");
  });

  utils.waitForElement(".ProductStandardsTabLayout__seeMore .DSButton__text")
    .then(text => text.textContent = "Show more standards")
    .catch(error);

  utils.observeSelector("#q-and-a .CollapsibleContent__toggle button div div div", button => {
    button.insertAdjacentHTML("beforeend", `<span class="Button-module__iconRight--CfgLf"><span class="tpticon tpticon-angle-down"></span></span>`);
  });

  utils.waitForElement(".ProductPageSummary .ResourceDetailsLayout .PreviewButton__Button")
    .then(button => {
      if (button.textContent === "Preview") {
        button.textContent = "View Preview";
      }
    })
    .catch(error);

  utils.waitForElement(".tpt661-banner.price-box__tptsa .cta-link")
    .then(cta => cta.replaceWith(cta.cloneNode(true)))
    .catch(error);

  utils.observeSelector(`.EvaluationsContainer__comment .ReplyContainer__content .EvaluationAvatarByline__displayName`, name => {
    name.insertAdjacentHTML("afterbegin", "<span>Response from </span>");
  });

  utils.waitForElement(".CommentLegacyContainer__noCommentsPadding")
    .then(noComments => noComments.previousElementSibling.classList.add(`${TAG}-no-comments`))
    .catch(error);
};

const applyExperiments = () => {
  let experiments = [];

  // TPT-661
  experiments.push(() => {
    utils.waitForElement(`.StickyProductPageSideColumnLayout [data-testid="sticky-price-box-wrapper"]`)
      .then(parent => {
        if (parent.parentElement.querySelector(".price-box__tptsa")) {
          return;
        }

        parent.insertAdjacentHTML("beforebegin", `
          <div class="tpt661-banner price-box__tptsa">
            <img src="//cdn.optimizely.com/img/11000223989/2a950034f69f4696853cb15b1b84646b.svg" class="banner-logo" alt="TPT School Access">
            <p>Get a school-funded subscription</p>
            <a href="https://www.teacherspayteachers.com/TpTSchoolAccess/Teachers?utm_source=marketplace&utm_medium=optimizely&utm_campaign=tpt1096v0" class="cta-link" target="_blank">Learn More</a>
          </div>
        `);
        const box = parent.previousElementSibling;

        new MutationObserver(mutations => {
          for (const mutation of mutations) {
            if (mutation.target && mutation.target.classList.contains(".price-box__tptsa")) {
              box.classList.add(`${TAG}-hidden`);
            }
          }
        });
      })
      .catch(error);
  });

  for (const apply of experiments) {
    apply();
  }
};

export const pdp = {
  name: "pdp",
  applyMetrics,
  applyTreatment,
  applyExperiments,
  checkURL: () => window.location.pathname.includes("/Product/")
};