// eslint-disable-next-line no-unused-vars
import { utils, log, error } from "base";
import { waitForClick, observeClick } from "../../../metrics";
import logoSVG from "./assets/logo.svg";
import facebookSVG from "./assets/facebook.svg";
import pinterestSVG from "./assets/pinterest.svg";
import instagramSVG from "./assets/instagram.svg";
import twitterSVG from "./assets/twitter.svg";

const applyMetrics = () => {
  // [TPT1134] Global Footer | Clicks on Sign Up
  waitForClick(".FooterLayout [href='/My-Account/Email_Preferences']", "tpt1134-global-footer-clicks-on-sign-up");
  // [TPT1134] Global Footer | Engages with About Links
  observeClick(`.FooterLayout .FooterLayout__leftContainer + div .row > div:nth-child(1) a, .FooterLayout .FooterLayout__leftContainer a[href="/About-Us"]`, "tpt1134-global-footer-engages-with-about-links");
  // [TPT1134] Global Footer | Engages with Support Links
  observeClick(".FooterLayout .FooterLayout__leftContainer + div .row > div:nth-child(2) a", "tpt1134-global-footer-engages-with-support-links");
  // [TPT1134] Global Footer | Engages with Social Icons
  observeClick(".FooterLayout [class*='SocialRow'] a", "tpt1134-global-footer-engages-with-social-icons");
};

const applyTreatment = () => {
  utils.waitForElement(".FooterLayout, .LegacyEntry .FooterEntry").then(oldFooter => {
    oldFooter.classList.add(`${TAG}-global-footer`);

    // Pushes content down on PHP pages
    utils.waitForElement(".legacy-content").then(() => document.body.classList.add(`${TAG}-php-page`)).catch(error);

    // Add an additional contact link
    oldFooter.querySelector("[href='/Help']")?.parentElement?.insertAdjacentHTML("afterend", `
      <li>
        <a class="Anchor Anchor--inherit" href="/Contact"/>Contact Us</a>
      </li>
    `);

    // Update the social icon images
    const images = [
      {
        selector: "img",
        svg: logoSVG
      },
      {
        selector: "[class*='SocialRow-module__container'] .tpticon-facebook",
        svg: facebookSVG
      },
      {
        selector: "[class*='SocialRow-module__container'] .tpticon-pinterest-p",
        svg: instagramSVG
      },
      {
        selector: "[class*='SocialRow-module__container'] .tpticon-instagram",
        svg: pinterestSVG
      },
      {
        selector: "[class*='SocialRow-module__container'] .tpticon-twitter",
        svg: twitterSVG
      },
    ];

    for (const data of images) {
      const original = oldFooter.querySelector(data.selector);
      original.classList.add(`${TAG}-hidden`);
      original.insertAdjacentHTML("afterend", data.svg);
    }
  }).catch(error);
};

export const globalFooter = {
  name: "footer",
  applyMetrics,
  applyTreatment,
  checkURL: () => true
};