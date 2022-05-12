// eslint-disable-next-line no-unused-vars
import { utils, log, error, sendEvent } from 'base';
import { setAttributes } from "cromedics/optimizely/attributes";
// import newHeaderHTML from "./assets/html/new-header.html";
import newHeaderHTML from "./assets/html/new-header";
// import v2SearchFiltersHTML from "./assets/html/v2-search-filters.html";
import v2SearchFiltersHTML from "./assets/html/v2-search-filters";
// import module1LoggedOutHTML from "./assets/html/module-1-logged-out.html";
import module1LoggedOutHTML from "./assets/html/module-1-logged-out";
// import module1LoggedInHTML from "./assets/html/module-1-logged-in.html";
import module1LoggedInHTML from "./assets/html/module-1-logged-in";
// import module1HTML from "./assets/html/module-1.html";
import module1HTML from "./assets/html/module-1";
// import module2HTML from "./assets/html/module-2.html";
import module2HTML from "./assets/html/module-2";
// import module3HTML from "./assets/html/module-3.html";
import module3HTML from "./assets/html/module-3";
import arcSVG from "./assets/arc.svg";

const isTrustedEvent = event => {
  return event.isTrusted || (event.clientX !== 0 && event.clientY !== 0);
};

const applyMetrics = variation => {
  const addClickListener = (element, event, onlyTrusted) => {
    element.addEventListener("click", clickEvent => {
      if (onlyTrusted && !isTrustedEvent(clickEvent)) {
        return;
      }

      sendEvent(event);
      window.heap.track(event);
    });
  };

  const waitForListener = (selector, event) => {
    utils.waitForElement(selector)
      .then(link => addClickListener(link, event))
      .catch(error);
  };

  const checkSearchbarInput = search => {
    return search.querySelector("input").value !== "";
  };

  const lastPage = sessionStorage.getItem(`${TAG}-last-page`);
  if (lastPage !== window.location.pathname) {
    const pagesVisited = parseInt(sessionStorage.getItem(`${TAG}-pages-visited`) ?? "0") + 1;
    sessionStorage.setItem(`${TAG}-pages-visited`, pagesVisited);
    sessionStorage.setItem(`${TAG}-last-page`, window.location.pathname);

    if (pagesVisited >= 2 && pagesVisited <= 5) {
      sendEvent("tpt1069-sitewide-2-5-pages-visited");
      window.heap.track("tpt1069-sitewide-2-5-pages-visited");
    } else if (pagesVisited >= 6 && pagesVisited <= 10) {
      sendEvent("tpt1069-sitewide-6-10-pages-visited");
      window.heap.track("tpt1069-sitewide-6-10-pages-visited");
    } else if (pagesVisited > 10) {
      sendEvent("tpt1069-sitewide-11-plus-pages-visited");
      window.heap.track("tpt1069-sitewide-11-plus-pages-visited");
    }
  }

  // Set attribute for users who start their session on the homepage
  if (window.sessionStorage.getItem(`${TAG}-pages-visited`) === "1") {
    setAttributes({ "tpt1069-session-start-on-homepage": window.location.pathname === "/" });
  }

  // [TPT968] Header | Search Bar Interactions
  const sendInteractionEvent = () => {
    sendEvent("tpt968-header-search-bar-interactions");
    window.heap.track("tpt968-header-search-bar-interactions");
  };

  // [TPT1134] Header | All Search Bar Interactions
  const sendInteractionEvent2 = () => {
    sendEvent("tpt1134-header-all-search-bar-interactions");
    window.heap.track("tpt1134-header-all-search-bar-interactions");
  };

  utils.observeSelector(".SearchAutosuggestBespoke form", search => {
    search.querySelector("input").addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.code !== "Enter") {
        return;
      }

      if (checkSearchbarInput(search)) {
        sendInteractionEvent();
        sendInteractionEvent2();
        // [TPT968] Search Bar | Type + Press Enter
        sendEvent("tpt968-search-bar-type-press-enter");
        window.heap.track("tpt968-search-bar-type-press-enter");
      }
    });

    search.nextElementSibling.addEventListener("click", () => {
      if (checkSearchbarInput(search)) {
        sendInteractionEvent();
        sendInteractionEvent2();
        // [TPT968] Search Bar | Type + Click Icon
        sendEvent("tpt968-search-bar-type-click-icon");
        window.heap.track("tpt968-search-bar-type-click-icon");
      }
    });
  });

  // [TPT1134] Header | All Search Bar Interactions
  utils.observeSelector(".SearchAutosuggestBespoke ul li", suggestedItem => {
    suggestedItem.addEventListener("click", sendInteractionEvent2);
    addClickListener(suggestedItem, "tpt1134-header-all-search-bar-interactions");
  });

  // [TPT968] Search Bar | Clicks Into Search Field
  utils.waitForElement(".SearchAutosuggestBespoke form input")
    .then(input => input.addEventListener("click", () => {
      sendInteractionEvent();
      sendInteractionEvent2();
      sendEvent("tpt968-search-bar-clicks-into-search-field");
      window.heap.track("tpt968-search-bar-clicks-into-search-field");
    }))
    .catch(error);

  const dropdownMetrics = {
    // [TPT968] Search Dropdown | Clicks on "Popular Now" Suggestion
    "Popular Now": "tpt968-search-dropdown-clicks-on-popular-now-suggestion",
    // [TPT968] Search Dropdown | Clicks on "Suggestions" Suggestion
    "Suggestions": "tpt968-search-dropdown-clicks-on-suggestions-suggestion",
    // [TPT968] Search Dropdown | Clicks on "Sellers" Suggestion
    "Sellers": "tpt968-search-dropdown-clicks-on-sellers-suggestion",
    // [TPT968] Search Dropdown | Clicks on "Resources" Suggestion
    "Resources": "tpt968-search-dropdown-clicks-on-resources-suggestion"
  };
  const applyDropdownListMetrics = list => {
    for (const listItem of list.querySelectorAll("li")) {
      listItem.addEventListener("click", event => {
        const title = event.target.closest("ul")?.previousElementSibling.querySelector("span")?.textContent;
        if (title === null || title === "") {
          if (list.parentElement.classList.contains("react-autosuggest__section-container--first")) {
            if (checkSearchbarInput(list.closest(".SearchAutosuggestBespoke"))) {
              // [TPT968] Search Dropdown | Clicks on "Show Me Digital Resources for {Search Term}"
              sendEvent("tpt968-search-dropdown-clicks-on-show-me-digital-resources-for-x");
              window.heap.track("tpt968-search-dropdown-clicks-on-show-me-digital-resources-for-x");
            } else {
              // [TPT968] Search Dropdown | Clicks on "Show Me Digital Resources"
              sendEvent("tpt968-search-dropdown-clicks-on-show-me-digital-resources");
              window.heap.track("tpt968-search-dropdown-clicks-on-show-me-digital-resources");
            }
          } else {
            // [TPT968] Search Dropdown | Clicks on "See All Results for {Search Term}"
            sendEvent("tpt968-search-dropdown-clicks-on-see-all-results-for-x");
            window.heap.track("tpt968-search-dropdown-clicks-on-see-all-results-for-x");
          }
        } else {
          const metric = dropdownMetrics[title];
          sendInteractionEvent();
          sendInteractionEvent2();
          sendEvent(metric);
          window.heap.track(metric);
        }
      });
    }
  };
  utils.observeSelector(".SearchAutosuggestBespoke .react-autosuggest__section-container ul", list => applyDropdownListMetrics(list));

  // [TPT968] Interacts with Left Filter Rail | Homepage
  if (!(window.location.pathname.includes("/Browse") || window.location.pathname.includes("/Browse/Search"))) {
    utils.observeSelector(".MobileSearchMenu input", input => addClickListener(input, "tpt968-interacts-with-left-filter-rail-homepage"));
  }

  // [TPT-968] Clicks on resource in “Resources you may like” section
  utils.observeSelector(".ResourcesYouMayLikeLayout a", youMayLike => addClickListener(youMayLike, "tpt968-clicks-on-resource-in-resources-you-may-like-section"));
  // [TPT-968] Clicks on resource in “Device and hybrid resources” section
  utils.observeSelector(".TpTDAEnabledResourcesLayout a", devices => addClickListener(devices, "tpt968-clicks-on-resource-in-device-and-hybrid-resources-section"));

  // [TPT1069] Homepage | Clicks on resource in “Explore High School Resources” section
  utils.observeSelector(".ExploreResourcesLayout .CardRowLayout:first-child a.ProductCard", card => addClickListener(card, "tpt1069-homepage-clicks-on-resource-high-school-section"));
  // [TPT1069] Homepage | Clicks on resource in “Explore Middle School Resources” section
  utils.observeSelector(".ExploreResourcesLayout .CardRowLayout:not(:first-child):not(:last-child) a.ProductCard", card => addClickListener(card, "tpt1069-homepage-clicks-on-resource-in-middle-school-section"));
  // [TPT1069] Homepage | Clicks on resource in “Explore Elementary School Resources” section
  utils.observeSelector(".ExploreResourcesLayout .CardRowLayout:last-child a.ProductCard", card => addClickListener(card, "tpt1069-homepage-clicks-on-resource-in-elementary-section"));
  // [TPT1069] Homepage | Clicks on resource in “New from your favorite Teacher-Authors” section
  utils.observeSelector(".NewFromYourFavoriteTeacherAuthorsLayout a.ProductCard", card => addClickListener(card, "tpt1069-homepage-clicks-on-resource-in-teachers-section"));

  utils.observeSelector(".MobileSearchMenu label, .MobileSearchMenu input, .MobileSearchMenu select option", filter => {
    // [TPT1069] Homepage | Filter Applied
    addClickListener(filter, "tpt1069-homepage-filter-applied");
    // [TPT1069] Homepage | Filter Applied From Left Rail
    addClickListener(filter, "tpt10690-homepage-filter-applied-from-left-rail");
  });
  // [TPT1069] Homepage | Grade Filter Applied
  utils.observeSelector(".MobileSearchMenu .SpecificGradesSearchContainer label, .MobileSearchMenu .SpecificGradesSearchContainer input", filter => addClickListener(filter, "tpt1069-homepage-grade-filter-applied"));
  // [TPT1069] Homepage | Subject Filter Applied
  utils.observeSelector(".MobileSearchMenu .SearchMenuSubjectAreaLayout label, .MobileSearchMenu .SearchMenuSubjectAreaLayout input", filter => addClickListener(filter, "tpt1069-homepage-subject-filter-applied"));
  // [TPT1069] Homepage | Price Filter Applied
  utils.observeSelector(".MobileSearchMenu .SearchMenuSubjectAreaLayout + .FilterMenuLayout label, .MobileSearchMenu .SearchMenuSubjectAreaLayout + .FilterMenuLayout input", filter => addClickListener(filter, "tpt1069-homepage-price-filter-applied"));

  // [TPT1134] Global Nav | User Dropdown Engagement
  utils.observeSelector(".tpt1134-header-nav-right-user-dropdown-default li:not([class]), .tpt1134-header-nav-right-user-dropdown-default ul:last-child li:last-child, .BuyerDropdownBespoke__content a", link => {
    addClickListener(link, "tpt1134-global-nav-user-dropdown-engagement");
  });

  if (variation === "v0") {
    // [TPT968] Header | Clicks on Filter Link | Catalog or Browse
    utils.observeSelector(".CategoryMenu__content a", link => addClickListener(link, "tpt968-header-clicks-on-filter-link-catalog-or-browse"));
    // [TPT968] Header | Clicks on Easel by TPT
    waitForListener(".EaselHeaderBespoke .EaselHeaderBespoke__label a", "tpt968-header-clicks-on-easel-by-tpt");
    // [TPT968] Header | Clicks on Activities/Assessments | Easel by TPT
    utils.observeSelector(".EaselHeaderMenu .EaselHeaderMenu__col--tools a", link => addClickListener(link, "tpt968-header-clicks-on-activites-assessments-easel-by-tpt"));
    // [TPT968] Header | Clicks on TPT School Access
    waitForListener(".HeaderLayout__linkList a[href='/TpTSchoolAccess/Teachers']", "tpt968-header-clicks-on-tpt-school-access");
    waitForListener(".HeaderLayout__linkList a[href='/TpTSchoolAccess/Teachers']", "tpt1134-header-clicks-on-tpt-school-access-2");
    waitForListener(".HeaderLayout__linkList a[href='/TpTSchoolAccess/Teachers']", "tpt1134-header-clicks-on-tpt-school-access-3");
    waitForListener(".HeaderLayout__linkList a[href='/TpTSchoolAccess/Teachers']", "tpt1134-header-tpt-school-access-engagement");
    // [TPT968] Header | Clicks on Cart
    waitForListener(".HeaderCartBespoke", "tpt968-header-clicks-on-cart");
    // [TPT968] Header | Clicks on User Profile
    const mouseOverEvent = () => {
      document.querySelector(".SellerDropdownBespoke, .BuyerDropdownBespoke").removeEventListener("mouseover", mouseOverEvent, true);
      sendEvent("tpt968-header-opens-user-profile");
      window.heap.track("tpt968-header-opens-user-profile");
    };
    utils.waitForElement(".SellerDropdownBespoke, .BuyerDropdownBespoke")
      .then(profile => profile.addEventListener("mouseover", mouseOverEvent, true))
      .catch(error);
    // [TPT968] Header | Clicks on About Us
    waitForListener(".HeaderLayout__linkList a[href='/About-Us']", "tpt968-header-clicks-on-about-us");
    // [TPT968] Header | Clicks on Gift Cards
    waitForListener(".HeaderLayout__linkList a[href='/Gift-Card']", "tpt968-header-clicks-on-gift-cards");
    // [TPT968] Header | Clicks on Help
    waitForListener(".HeaderLayout__linkList a[href='/Help']", "tpt968-header-clicks-on-help");
    // [TPT968] Header | Clicks on TPT ClassFund
    waitForListener(".HeaderLayout__linkList a[href='/ClassFund']", "tpt968-header-clicks-on-tpt-classfund");
    utils.observeSelector(".tpt1173-tooltip a", link => {
      // [TPT968] Header | Clicks on TPT School Access Dropdown CTA
      addClickListener(link, "tpt968-header-clicks-on-tptsa-dropdown-cta");
      // [TPT1134] Header | TPT School Access Engagement
      addClickListener(link, "tpt1134-header-tpt-school-access-engagement");
    });

    // [TPT1069] Header | Expand Browse/Catalog Dropdown
    utils.waitForElement(".SecondaryHeaderLayout .CategoryMenu")
      .then(menu => menu.addEventListener("mouseenter", () => {
        sendEvent("tpt1069-header-expand-browse-catalog-dropdown");
        window.heap.track("tpt1069-header-expand-browse-catalog-dropdown");
      }))
      .catch(error);
    // [TPT1069] Header | Easel by TPT Dropdown | Clicks on Easel Activities
    waitForListener(".EaselHeaderBespoke .EaselHeaderMenu__subcol:first-child a", "tpt1069-header-easel-by-tpt-dropdown-clicks-on-easel-activities");
    // [TPT1069] Header | Easel by TPT Dropdown | Clicks on Easel Assessments
    waitForListener(".EaselHeaderBespoke .EaselHeaderMenu__subcol:last-child a", "tpt1069-header-easel-by-tpt-dropdown-clicks-on-easel-assessments");
    // [TPT1069] Header | Easel Dropdown | Clicks on Interactive Tutorial Link
    waitForListener(".EaselHeaderMenu .EaselHeaderMenu__link a[href*='https://easel.teacherspayteachers.com/import']", "tpt1069-header-easel-dropdown-clicks-on-interactive-tutorial");
    // [TPT1069] Header | Easel Dropdown | Clicks on Go to Easel
    waitForListener(".EaselHeaderMenu a[href='https://easel.teacherspayteachers.com']", "tpt1069-header-easel-dropdown-clicks-on-go-to-easel");
    // [TPT1069] Header | Easel Dropdown | Clicks on Learn More
    waitForListener(".EaselHeaderMenu a[href='https://www.easelbytpt.com']", "tpt1069-header-easel-dropdown-clicks-on-learn-more");
    // [TPT1069] Header + Footer | Clicks on Help
    waitForListener(".HeaderLayout__linkList a[href='/Help']", "tpt1069-header-footer-clicks-on-help");
    waitForListener(".FooterLayout__list a[href='/Help']", "tpt1069-header-footer-clicks-on-help");
  } else {
    // [TPT968] Header | Clicks on Catalog
    utils.observeSelector(".tpt1134-header-nav-left-catalog > button", link => addClickListener(link, "tpt968-header-clicks-on-catalog"));
    // [TPT968] Header | Clicks on Filter Link | Catalog or Browse
    utils.observeSelector(".tpt1134-header-nav-left-catalog-dropdown a", link => addClickListener(link, "tpt968-header-clicks-on-filter-link-catalog-or-browse"));
    // [TPT968] Header | Clicks on Easel by TPT
    utils.observeSelector(".tpt1134-header-nav-left-easel > button", link => addClickListener(link, "tpt968-header-clicks-on-easel-by-tpt"));
    // [TPT968] Header | Clicks on Activities/Assessments | Easel by TPT
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-activities a, .tpt1069-header-nav-left-easel-dropdown-assessments a", link => addClickListener(link, "tpt968-header-clicks-on-activites-assessments-easel-by-tpt"));
    // [TPT968] Header | Clicks on TPT School Access
    utils.observeSelector(".tpt1134-header-nav-right-tptsa > a", link => addClickListener(link, "tpt968-header-clicks-on-tpt-school-access"));
    utils.observeSelector(".tpt1134-header-nav-right-tptsa > a", link => addClickListener(link, "tpt1134-header-clicks-on-tpt-school-access-2"));
    utils.observeSelector(".tpt1134-header-nav-right-tptsa > a", link => addClickListener(link, "tpt1134-header-clicks-on-tpt-school-access-3"));
    // [TPT1134] Header | TPT School Access Engagement
    utils.observeSelector(".tpt1134-header-nav-right-tptsa > a", link => addClickListener(link, "tpt1134-header-tpt-school-access-engagement"));
    utils.observeSelector(".tpt1134-header-nav-right-tptsa-dropdown a", link => addClickListener(link, "tpt1134-header-tpt-school-access-engagement"));
    // [TPT968] Header | Clicks on TPT School Access Dropdown CTA
    utils.observeSelector(".tpt1134-header-nav-right-tptsa-dropdown a", link => addClickListener(link, "tpt968-header-clicks-on-tptsa-dropdown-cta"));
    // [TPT968] Header | Clicks on Cart
    utils.observeSelector(".tpt1134-header-nav-right-cart", link => addClickListener(link, "tpt968-header-clicks-on-cart"));
    // [TPT968] Header | Clicks on User Profile
    utils.observeSelector(".tpt1134-header-nav-right-user", link => addClickListener(link, "tpt968-header-opens-user-profile"));
    // [TPT968] Header | Clicks on Gift Cards
    utils.observeSelector(".tpt1134-header-nav-right-user-dropdown a[href='/gift-card']", link => addClickListener(link, "tpt968-header-clicks-on-gift-cards"));
    // [TPT968] Header | Clicks on TPT ClassFund
    utils.observeSelector(".tpt1134-header-nav-right-user-dropdown a[href='/TpTClassFund'], .tpt1069-wrapper .SellerDropdownBespoke a[href='/ClassFund']", link => addClickListener(link, "tpt968-header-clicks-on-tpt-classfund"));

    // [TPT1069] Header | Expand Browse/Catalog Dropdown
    utils.observeSelector(".tpt1134-header-nav-left-catalog", link => addClickListener(link, "tpt1069-header-expand-browse-catalog-dropdown"));
    // [TPT1069] Header | Easel by TPT Dropdown | Clicks on Easel Activities
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-activities a", link => addClickListener(link, "tpt1069-header-easel-by-tpt-dropdown-clicks-on-easel-activities"));
    // [TPT1069] Header | Easel by TPT Dropdown | Clicks on Easel Assessments
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-assessments a", link => addClickListener(link, "tpt1069-header-easel-by-tpt-dropdown-clicks-on-easel-assessments"));
    // [TPT1069] Header | Easel Dropdown | Clicks on Top Easel Resources
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-intro-link", link => addClickListener(link, "tpt1069-header-easel-dropdown-clicks-on-top-easel-resources"));
    // [TPT1069] Header | Easel Dropdown | Clicks on Interactive Tutorial Link
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-intro-link2", link => addClickListener(link, "tpt1069-header-easel-dropdown-clicks-on-interactive-tutorial"));
    // [TPT1069] Header | Easel Dropdown | Clicks on Go to Easel
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-intro-button[href='https://easel.teacherspayteachers.com/']", link => addClickListener(link, "tpt1069-header-easel-dropdown-clicks-on-go-to-easel"));
    // [TPT1069] Header | Easel Dropdown | Clicks on Learn More
    utils.observeSelector(".tpt1134-header-nav-left-easel-dropdown-intro-button[href='/easel/learn-more']", link => addClickListener(link, "tpt1069-header-easel-dropdown-clicks-on-learn-more"));
    // [TPT1069] Header + Footer | Clicks on Help
    utils.observeSelector(".FooterLayout a[href='/Help']", link => addClickListener(link, "tpt1069-header-footer-clicks-on-help"));
    // [TPT1069] Homepage | Editorial Module 1 | Clicks on Refer Your Principal
    utils.observeSelector(".tpt1134-module-top a", link => addClickListener(link, "tpt1069-homepage-editorial-1-clicks-on-refer-your-principal"));
    // [TPT1069] Homepage | Editorial Module 2 | Clicks on Learn More
    utils.observeSelector(".tpt1134-module-middle a", link => addClickListener(link, "tpt1069-homepage-editorial-2-clicks-on-learn-more"));
    utils.waitForElement(".tpt1134-module-bottom a")
      .then(link => {
        if (link.textContent === "Learn More") {
          // [TPT1069] Homepage | Editorial Module 3 | Clicks on Learn More
          waitForListener(".tpt1134-module-bottom a", "tpt1069-homepage-editorial-3-clicks-on-learn-more");
        } else {
          // [TPT1069] Logged out | Homepage | Editorial Module 3 | Clicks on Discover Our Community
          waitForListener(".tpt1134-module-bottom a", "tpt1069-logged-out-homepage-editorial-3-clicks-cta");
        }
      })
      .catch(error);
    // [TPT1069] Search Bar | Clicks Into Filter Field
    waitForListener(".tpt1134-new-inputs-grade", "tpt1069-search-bar-clicks-into-filter-field");
    utils.waitForElement(".tpt1134-new-inputs-grade")
      .then(inputs => inputs.addEventListener("click", sendInteractionEvent2))
      .catch(error);
    waitForListener(".tpt1134-new-inputs-subject", "tpt1069-search-bar-clicks-into-filter-field");
    utils.waitForElement(".tpt1134-new-inputs-subject")
      .then(inputs => inputs.addEventListener("click", sendInteractionEvent2))
      .catch(error);
    waitForListener(".tpt1134-new-inputs-price", "tpt1069-search-bar-clicks-into-filter-field");
    utils.waitForElement(".tpt1134-new-inputs-price")
      .then(inputs => inputs.addEventListener("click", sendInteractionEvent2))
      .catch(error);
    // [TPT1069] Search Bar | Filter Applied + Submit
    utils.observeSelector(".SearchAutosuggestBespoke form", search => {
      const input = search.querySelector("input");
      input.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.code !== "Enter") {
          return;
        }

        if (getFilterStringWithoutSearch(input) !== "") {
          sendEvent("tpt1069-search-bar-filter-applied-submit");
          window.heap.track("tpt1069-search-bar-filter-applied-submit");
        }
      });

      search.nextElementSibling.addEventListener("click", () => {
        if (getFilterStringWithoutSearch(input) !== "") {
          sendEvent("tpt1069-search-bar-filter-applied-submit");
          window.heap.track("tpt1069-search-bar-filter-applied-submit");
        }
      });
    });
    utils.observeSelector(".tpt1134-new-inputs-dropdown label", label => {
      // [TPT1069] Homepage | Filter Applied
      addClickListener(label, "tpt1069-homepage-filter-applied", true);
      // [TPT1069] Homepage | Filter Applied From Header
      addClickListener(label, "tpt1069-homepage-filter-applied-from-header", true);
      label.addEventListener("click", sendInteractionEvent2);
    });
    // [TPT1069] Homepage | Grade Filter Applied
    utils.observeSelector(".tpt1134-new-inputs-grade-dropdown label, .tpt1134-new-inputs-grade-dropdown label input, .tpt1134-new-inputs-grade-dropdown label span", label => addClickListener(label, "tpt1069-homepage-grade-filter-applied", true));
    // [TPT1069] Homepage | Subject Filter Applied
    utils.observeSelector(".tpt1134-new-inputs-subject-dropdown label, .tpt1134-new-inputs-subject-dropdown label input, .tpt1134-new-inputs-subject-dropdown label span", label => addClickListener(label, "tpt1069-homepage-subject-filter-applied", true));
    // [TPT1069] Homepage | Price Filter Applied
    utils.observeSelector(".tpt1134-new-inputs-price-dropdown label, .tpt1134-new-inputs-price-dropdown label input, .tpt1134-new-inputs-price-dropdown label span", label => addClickListener(label, "tpt1069-homepage-price-filter-applied", true));
  }
};

const getFilterStringWithoutSearch = () => {
  const eventMap = {
    grade: "Grade-Level",
    subject: "PreK-12-Subject-Area",
    price: "Price-Range"
  };

  let filterString = "";
  for (const key in eventMap) {
    const input = document.querySelector(`.${TAG}-new-inputs-${key}`);
    if (input) {
      const value = input.getAttribute("search-value");
      if (value === null || value === undefined || value === "") {
        continue;
      }
      filterString += `/${eventMap[key]}/${value}`;
    }
  }

  return filterString;
};

const getFilterString = searchInput => {
  let filterString = getFilterStringWithoutSearch();

  if (searchInput.value !== "") {
    filterString += `/Search:${searchInput.value}`;
  }

  return filterString;
};

const getFilterStringFromObject = object => {
  let filterString = "";

  if (object) {
    const grades = (object.grades ?? []).join(",");
    if (grades !== "") {
      filterString += `/Grade-Level/${grades}`;
    }

    if (object.subject) {
      filterString += `/PreK-12-Subject-Area/${object.subject}`;
    }

    if (object.price) {
      filterString += `/Price-Range/${object.price}`;
    }
  }

  const search = window.sessionStorage.getItem(`${TAG}-last-search`);
  if (search) {
    filterString += `/Search:${search}`;
  }

  return filterString;
};

const apply968 = variation => {
  utils.observeSelector(".tpt1134-header-search .react-autosuggest__section-container .react-autosuggest__suggestion", suggestion => {
    suggestion.addEventListener("click", () => window.sessionStorage.removeItem(`${TAG}-last-search`));
  });

  utils.waitForElement(".tpt-frontend > div > div > .responsive, .tpt-frontend .HeaderLayout")
    .then(header => {
      if (document.querySelector(`.${TAG}-wrapper`)) {
        return;
      }

      // Hide the previous header
      header.classList.add(`${TAG}-hidden`);
      // Append the new header
      header.insertAdjacentHTML("afterend", newHeaderHTML);
      // Add UTM parameters to TPTSA links
      for (const selector of [`.${TAG}-header-nav-right-tptsa-dropdown a`, `.${TAG}-header-nav-right-user-dropdown-focused a[href='/TpTSchoolAccess/Teachers']`]) {
        const link = document.querySelector(selector);
        if (link) {
          link.setAttribute("href", `${link.getAttribute("href")}?utm_source=marketplaceutm_medium=optimizely&utm_campaign=${TAG}${variation}`);
        } else {
          log("Could not find TPTSA link:", selector);
        }
      }

      const parent = header.parentElement.querySelector(`.${TAG}-header`);

      // Surface the admin toolbox if it is present
      utils.waitForElement(".AdminToolbox--userWarning")
        .then(admin => {
          document.body.insertAdjacentHTML("afterbegin", `
            <div class="${TAG}-admin-panel">
              <div>${admin.textContent.replace(/Back to admin panel/, "")}</div>
              <a href="https://www.teacherspayteachers.com/users/back_to_admin">Back to admin panel</a>
            </div>
          `);
        })
        .catch(error);

      // Pull up the default search bar so it can be restyled (don't want to remake it)
      const search = header.querySelector(".SearchAutosuggestBespoke");
      parent.querySelector(`.${TAG}-header-search`)?.appendChild(search);

      // Set new aria attributes and placeholder text
      const input = search.querySelector(`input[type="search"]:first-child`);
      const submit = search.querySelector("button");
      const placeholder = "Search";
      input.setAttribute("aria-label", placeholder);
      input.setAttribute("placeholder", placeholder);
      submit.setAttribute("aria-label", placeholder);

      const onSearch = (event, isEnter) => {
        const searchInput = search.querySelector(`input[type="search"]:first-child`);
        event.stopPropagation();
        event.stopImmediatePropagation();
        event.preventDefault();

        const filterString = getFilterString(searchInput);
        window.sessionStorage.setItem(`${TAG}-last-search`, searchInput.value);
        if (filterString !== "") {
          if (isEnter) {
            window.sessionStorage.setItem(`${TAG}-enter-redirect`, true);
          } else {
            window.location.href = `https://www.teacherspayteachers.com/Browse${filterString}`;
          }
        }
      };

      submit.addEventListener("click", event => onSearch(event, false));

      const enterInput = event => {
        if (event.key === "Enter" && event.code === "Enter") {
          onSearch(event, true);
        }
      };
      input.addEventListener("keydown", enterInput);
      input.parentElement.addEventListener("keydown", enterInput);
      utils.observeSelector(".react-autosuggest__suggestions-container li.react-autosuggest__suggestion", suggestion => {
        suggestion.addEventListener("keydown", event => enterInput(event));
      });

      // Dropdown functionality could be done programatically, easier to copy/paste for now

      // Wire up dropdown functionality
      const catalog = parent.querySelector(`.${TAG}-header-nav-left-catalog`);
      const catalogButton = catalog.querySelector("button");
      catalogButton.addEventListener("click", () => catalog.classList.toggle(`${TAG}-active`));

      // Wire up Easel dropdown functionality
      const easelByTPT = parent.querySelector(`.${TAG}-header-nav-left-easel`);
      const easelByTPTButton = easelByTPT.querySelector("button");
      easelByTPTButton.addEventListener("click", () => easelByTPT.classList.toggle(`${TAG}-active`));
      utils.waitUntil(() => window.sessionStorage.getItem("cro_matched_complete"))
        .then(() => {
          const button = document.querySelector(`.${TAG}-header-nav-left-easel-dropdown-intro-button`);
          button.textContent = "Go to Easel";
          button.setAttribute("href", "https://easel.teacherspayteachers.com/");

          utils.waitForElement(`.${TAG}-header-nav-left-easel-dropdown-intro-link2`)
            .then(link => link.classList.remove(`${TAG}-hidden`))
            .catch(error);
        })
        .catch(error);

      // Wire up School Access dropdown functioanlity
      const schoolAccess = parent.querySelector(`.${TAG}-header-nav-right-tptsa`);

      // Wire up cart functionality
      const cart = parent.querySelector(`.${TAG}-header-nav-right-cart`);
      // Special remove function since we clone site elements
      const removeCartDropdown = () => cart.querySelector(".HeaderCartBespoke__content")?.remove();
      cart.addEventListener("click", () => {
        cart.classList.toggle(`${TAG}-active`);

        const menu = cart.querySelector(".HeaderCartBespoke__content");
        if (menu) {
          menu.remove();
        } else {
          const oldCart = header.querySelector(".HeaderCartBespoke__content").cloneNode(true);
          const total = oldCart.querySelector(".HeaderCartBespoke__total");
          // Remove the colon from the total price text
          total.innerHTML = total.innerHTML.replace(":", "");
          cart.appendChild(oldCart);
        }
      });
      // Pulls the cart count from control
      const setCartCount = () => {
        const newCartCount = cart.querySelector(`.${TAG}-header-nav-right-cart-count`);
        const oldCartCount = header.querySelector(".HeaderCartBespoke__badgeCountText");

        // Set the cart count bubble, if it's 0 then hide the bubble
        if (oldCartCount) {
          newCartCount.classList.remove(`${TAG}-hidden`);
          newCartCount.textContent = oldCartCount.textContent;
        } else {
          newCartCount.classList.add(`${TAG}-hidden`);
        }
      };
      setCartCount();

      // This handles cases where the cart is updated without a page reload, ex: clicking add to cart on the search page
      // We observe the selector for the case of 1 item in cart -> 0 items in cart -> 1 item in cart; this is because the element is removed at 0
      utils.observeSelector(".HeaderCartBespoke__badgeCountText, .HeaderCartBespoke__badgeIcon", count => {
        setCartCount();
        new MutationObserver(setCartCount).observe(count, { subtree: true, childList: true, characterData: true });
      });

      // Wire up seller functionality
      const seller = parent.querySelector(`.${TAG}-header-nav-right-seller`);
      seller.addEventListener("click", () => {
        seller.classList.toggle(`${TAG}-active`);
      });
      // Hide seller tab if the user is not a seller or is not logged in
      const isSeller = header.querySelector(".SellerDropdownBespoke__content");
      if (!isSeller) {
        seller.classList.add(`${TAG}-hidden`);
      } else {
        // Set seller store links -- Figma style
        const storeLink = header.querySelector(".SellerDropdownBespoke__content .row > div:nth-child(2) [href^='/Store']").getAttribute("href");
        seller.querySelector(`.${TAG}-header-nav-right-seller-dropdown-store`).setAttribute("href", storeLink);
        seller.querySelector(`.${TAG}-header-nav-right-seller-dropdown-store-q-and-a`).setAttribute("href", storeLink + "#tab_ask_a_question");
        seller.querySelector(`.${TAG}-header-nav-right-seller-dropdown-store-comments`).setAttribute("href", storeLink + "#tab_ratings_feedback");
      }

      // Wire up user functionality
      const user = parent.querySelector(`.${TAG}-header-nav-right-user`);
      user.addEventListener("click", () => user.classList.toggle(`${TAG}-active`));
      // Hide log in/join links if user is logged in
      const oldUserContent = header.querySelector(".BuyerDropdownBespoke__content, .SellerDropdownBespoke__content");
      if (oldUserContent) {
        parent.querySelector(`.${TAG}-header-nav-right-log-in-or-join`).classList.add(`${TAG}-hidden`);

        // Display control seller user dropdown
        if (isSeller) {
          // Clear dropdown children
          user.querySelector("a[href='/My-Account/Upgrade/Basic']").parentElement.classList.add(`${TAG}-hidden`);
        }

        // Hide "VA Dashboard" link if it isn't available for the user
        if (!oldUserContent.querySelector("a[href='/Assistant-Dashboard']")) {
          parent.querySelector(`.${TAG}-header-nav-right-user-dropdown a[href='/Assistant-Dashboard']`).parentElement.classList.add(`${TAG}-hidden`);
        }
      } else {
        user.classList.add(`${TAG}-hidden`);
      }

      // Display 'My School' link if the user has access to TPT for Schools
      utils.waitForElement(".HeaderLayout__link a[href='/My-School']")
        .then(() => user.querySelector(`.${TAG}-header-nav-right-user-dropdown-default-my-school`).parentElement.classList.remove(`${TAG}-hidden`))
        .catch(error);

      // Pulls inbox count from control
      const setInboxCount = () => {
        const newInboxCount = user.querySelector(`.${TAG}-header-nav-right-user-dropdown-counter`);
        const newInboxBubble = user.querySelector(`.${TAG}-header-nav-right-user-bubble`);
        const oldInboxCount = document.querySelector(".StorePostsUnreadCounter__counter");

        if (oldInboxCount) {
          newInboxCount.classList.remove(`${TAG}-hidden`);
          newInboxBubble.classList.remove(`${TAG}-hidden`);
          newInboxCount.textContent = oldInboxCount.textContent;
          newInboxBubble.textContent = oldInboxCount.textContent;
        } else {
          newInboxCount.classList.add(`${TAG}-hidden`);
          newInboxBubble.classList.add(`${TAG}-hidden`);
        }
      };
      setInboxCount();

      // Used to catch cases where the inbox updates with a page reload, similar to above
      let inboxObserver;
      utils.observeSelector(".StorePostsUnreadCounter__counter", count => {
        setInboxCount();

        inboxObserver?.disconnect();
        inboxObserver = new MutationObserver(setInboxCount).observe(count, { subtree: true, childList: true, characterData: true });
      });

      // Close any active dropdowns if a click was not on an ancestor element of the dropdown
      const dropdowns = [catalog, easelByTPT, schoolAccess, cart, seller, user];
      document.body.addEventListener("click", event => {
        for (const dropdown of dropdowns) {
          if (!dropdown.contains(event.target)) {
            dropdown.classList.remove(`${TAG}-active`);

            if (dropdown === cart) {
              removeCartDropdown();
            }
          }
        }
      });

      // Mark legacy pages
      const legacy = document.querySelector(".tpt-frontend .HeaderLayout");
      if (legacy) {
        try {
          document.querySelector(".legacy-content, #TptFrontend").classList.add(`${TAG}-legacy-body`);
          document.querySelector(`.${TAG}-wrapper`).classList.add(`${TAG}-legacy-header`);
        } catch (e) {}
      }
    })
    .catch(error);
};

const apply = variation => {
  // Remove left rail and header content
  if (window.location.pathname === "/") {
    utils.waitForElement("[data-testid='MobileSearchMenu']")
      .then(rail => {
        rail.parentElement.nextElementSibling.classList.add(`${TAG}-resize`);
        rail.parentElement.remove();
      })
      .catch(error);
  }

  //
  // Search bar changes
  //

  utils.waitForElement(`.${TAG}-header-search`)
    .then(search => {
      const oldSearch = search.querySelector("form > div > input:first-child");
      oldSearch.setAttribute("placeholder", "Search");
      oldSearch.setAttribute("aria-label", "Search");

      search.querySelector("form").classList.add(`${TAG}-new-inputs`);
      search.querySelector("form > div").insertAdjacentHTML("beforeend", v2SearchFiltersHTML);
    })
    .catch(error);

  // Set old filters
  if (!window.location.pathname.includes("/Browse") && !window.location.pathname.includes("/Product")) {
    window.sessionStorage.removeItem(`${TAG}-filters`);
    window.sessionStorage.removeItem(`${TAG}-last-search`);
  }
  const filterState = JSON.parse(window.sessionStorage.getItem(`${TAG}-filters`)) ?? {
    grades: [],
    subject: null,
    price: null
  };

  if (window.sessionStorage.getItem(`${TAG}-last-search`)) {
    utils.waitForElement(`.${TAG}-header-search form > div > input`)
      .then(search => search.value = window.sessionStorage.getItem(`${TAG}-last-search`))
      .catch(error);
  }

  // Set old filters
  for (const filter of [...filterState.grades, filterState.subject, filterState.price]) {
    if (filter) {
      utils.waitForElement(`.${TAG}-new-inputs-holder label[search-value="${filter}"] input`)
        .then(filter => filter.click())
        .catch(error);
    }
  }

  const getLabel = original => {
    let newLabel = original.toLowerCase()
      .replace(/'/g, "")
      .replace(/\(/g, "")
      .replace(/\)/g, "")
      .replace(/\./g, "")
      .replace("all ", "")
      .replace(/\&/g, "and")
      .replace(/\//g, " and ")
      .replace(/\$/g, "-")
      .replace(/ /g, "-");

    switch (newLabel) {
      // Grade replacements
    case "prek":
      newLabel = "pre-k";
      break;
      // Subject replacements
    case "holidays-and-seasonal":
      newLabel = "holiday-and-seasonal";
      break;
    case "social-studies---history":
      newLabel = "social-studies-and-history";
      break;
      // Price replacements
    case "under--5":
      newLabel = "under-5";
      break;
    case "-5----10":
      newLabel = "5-10";
      break;
    case "-10-and-up":
      newLabel = "10-and-up";
      break;
    }

    return newLabel;
  };

  const updateCheckbox = (labelText, key) => {
    const checkbox = document.querySelector(`.${TAG}-new-inputs-${key}-dropdown-${getLabel(labelText)}`);
    if (checkbox) {
      checkbox.click();
    }
  };

  const breadcrumbUpdate = () => {
    for (const input of document.querySelectorAll(".tpt1134-new-inputs-holder input:checked")) {
      input.click();
    }

    for (const grade of document.querySelectorAll(".SearchBreadcrumbsGradesContainer__grades a span:first-child")) {
      updateCheckbox(grade.textContent, "grade");
    }

    for (const sectionHeader of document.querySelectorAll(".SearchBreadcrumbsFacetSection .SearchBreadcrumbsFacetSection__title")) {
      const section = sectionHeader.nextElementSibling;
      const sectionKey = sectionHeader.textContent === "Subjects" ? "subject" : "price";

      updateCheckbox(section.querySelector("a").textContent, sectionKey);
    }
  };

  utils.waitForElement(".SearchBreadcrumbsBox")
    .then(section => new MutationObserver(breadcrumbUpdate).observe(section, { childList: true, subtree: true }))
    .catch(error);

  utils.observeSelector(".SearchBreadcrumbsFacetSection .SearchBreadcrumbsFacetSection__title", title => {
    if (title.textContent !== "Prices") {
      return;
    }

    const price = title.nextElementSibling.querySelector("a");
    new MutationObserver(breadcrumbUpdate).observe(price, { childList: true, subtree: true, characterData: true });
  });

  utils.observeSelector(".SearchBreadcrumbsBox__keywordSection .SelectedKeyword a", remove => {
    remove.addEventListener("click", () => window.sessionStorage.removeItem(`${TAG}-last-search`));
  });

  const sections = ["grade", "subject", "price"];
  for (const section of sections) {
    // Wire up dropdown functionality
    utils.waitForElement(`.${TAG}-new-inputs-${section}`)
      .then(element => element.addEventListener("click", () => element.nextElementSibling.classList.add(`${TAG}-active`)))
      .catch(error);
  }

  utils.observeSelector(`.${TAG}-grade-holder label`, label => {
    const dropdown = label.parentElement.parentElement;
    const input = dropdown.parentElement.querySelector("input");

    label.addEventListener("click", () => {
      filterState.grades = [];

      let checkedBoxes = [];
      for (const checkbox of dropdown.querySelectorAll("input:checked")) {
        const searchValue = checkbox.parentElement.getAttribute("search-value");
        filterState.grades.push(searchValue);

        checkedBoxes.push({
          text: checkbox.nextElementSibling.textContent,
          search: searchValue
        });
      }

      sessionStorage.setItem(`${TAG}-filters`, JSON.stringify(filterState));

      input.setAttribute("search-value", checkedBoxes.map(data => data.search).join(","));

      let overThree = false;
      if (checkedBoxes.length > 3) {
        overThree = true;
        checkedBoxes.length = 3;
      }

      let display = checkedBoxes.map(data => data.text).join(", ");
      if (overThree) {
        display += "...";
      }

      input.value = display;
    });
  });

  const removeDropdown = dropdown => {
    dropdown.classList.remove(`${TAG}-active`);
    dropdown.querySelector(`.${TAG}-active`)?.classList.remove(`${TAG}-active`);
    for (const checked of dropdown.querySelectorAll("input:checked")) {
      checked.checked = false;
    }
  };

  utils.observeSelector(`.${TAG}-subject-holder label, .${TAG}-price-holder label`, label => {
    label.addEventListener("click", event => {
      if (event.target.nodeName === "SPAN") {
        event.preventDefault();
        event.stopPropagation();
      }

      const dropdown = label.parentElement;
      const input = dropdown.parentElement.querySelector("input");

      const filterKey = dropdown.className.includes("subject") ? "subject" : "price";
      if (!label.classList.contains(`${TAG}-active`)) {
        removeDropdown(dropdown);
      } else {
        input.value = "";
        input.setAttribute("search-value", "");
        filterState[filterKey] = null;
        sessionStorage.setItem(`${TAG}-filters`, JSON.stringify(filterState));
        removeDropdown(dropdown);
        return;
      }

      label.classList.add(`${TAG}-active`);
      label.querySelector("input").checked = true;

      input.value = label.querySelector("span").textContent;
      const searchValue = label.getAttribute("search-value");
      input.setAttribute("search-value", searchValue);

      filterState[filterKey] = searchValue;
      sessionStorage.setItem(`${TAG}-filters`, JSON.stringify(filterState));
    });
  });

  // Close any active dropdowns if a click was not on an ancestor element of the dropdown
  document.body.addEventListener("click", event => {
    for (const section of sections) {
      const dropdown = document.querySelector(`.${TAG}-${section}-holder`);
      if (dropdown && !dropdown.contains(event.target)) {
        const sectionElement = dropdown.querySelector(`#${section}-dropdown`);
        if (sectionElement) {
          sectionElement.classList.remove(`${TAG}-active`);
        }
      }
    }
  });

  //
  // Editorial modules
  //
  const isPremiumSeller = utils.cookie.get("TPT-GROUP") === "4";

  const firstSelector = ".CardRowLayout";
  utils.waitForElement(firstSelector)
    .then(section => {
      window.setTimeout(() => {
        if (TAG !== 'tpt1259' && variation === "v1") {
          section.insertAdjacentHTML("beforebegin", module1HTML);
          return;
        }

        if (document.querySelector(".LoggedOutHomePageLayout")) {
          section.insertAdjacentHTML("beforebegin", module1LoggedOutHTML);
          section.previousElementSibling.querySelector("img").insertAdjacentHTML("afterend", arcSVG);
        } else {
          section.insertAdjacentHTML("beforebegin", module1LoggedInHTML);
        }

        const link = document.querySelector(`.${TAG}-module-top a`);
        const href = link.getAttribute("href");
        if (href.includes("prep")) {
          return;
        }
        link.setAttribute("href", href + variation);
      }, 0);
    })
    .catch(error);

  const secondSelector = isPremiumSeller ? ".ResourcesYouMayLikeLayout" : ".ExploreResourcesLayout .CardRowLayout:nth-child(2), .TpTDAEnabledResourcesLayout";
  utils.waitForElement(secondSelector)
    .then(section => section.insertAdjacentHTML("beforebegin", module2HTML))
    .catch(error);

  const thirdSelector = ".ExploreResourcesLayout .CardRowLayout:nth-child(3), .NewFromYourFavoriteTeacherAuthorsLayout, .TpTDAEnabledResourcesLayout + div";
  utils.waitForElement(thirdSelector)
    .then(section => {
      const beforeOrAfter = section.previousElementSibling.classList.contains("TpTDAEnabledResourcesLayout");
      section.insertAdjacentHTML(beforeOrAfter ? "afterend" : "beforebegin", module3HTML);

      utils.waitUntil(() => window.sessionStorage.getItem("cro_matched_complete"))
        .then(() => document.querySelector(`.${TAG}-module-bottom a`).textContent = "Learn More")
        .catch(error);
    })
    .catch(error);
};

const applyIteration = () => {
  utils.waitForElement(`.${TAG}-header-nav-left-catalog > button`)
    .then(catalog => catalog.textContent = "Browse Catalog")
    .catch(error);
  utils.waitForElement(`.${TAG}-header-nav-right-user-dropdown-username`)
    .then(name => {
      const displayName = document.querySelector(".BuyerDropdownBespoke__labelName, .SellerDropdownBespoke__labelName");
      if (displayName) {
        name.textContent = displayName.textContent;
      }
    })
    .catch(error);
};

const applyTreatment = variation => {
  if (window.sessionStorage.getItem(`${TAG}-enter-redirect`)) {
    window.sessionStorage.removeItem(`${TAG}-enter-redirect`);

    if (!window.location.pathname.includes("/Browse")) {
      return;
    }

    const filters = JSON.parse(window.sessionStorage.getItem(`${TAG}-filters`));
    window.location.assign(`https://www.teacherspayteachers.com/Browse${getFilterStringFromObject(filters)}`);
    return;
  }

  apply968(variation);
  apply(variation);
  applyIteration();

  // Used to immediately remove the header depending on screen size (client request) 1/2
  window.setTimeout(() => window.dispatchEvent(new Event("resize"), 0));

  // Attribute for logged in/out users
  setAttributes({
    [`${TAG}-logged-out-users`]: true
  });
  utils.waitUntil(() => window.sessionStorage.getItem("cro_matched_complete"))
    .then(() => {
      setAttributes({
        [`${TAG}-logged-out-users`]: false,
        [`${TAG}-logged-in-users`]: true
      });
    })
    .catch(error);

  // Dynamically hide the new header under 980px
  let previousWidth = window.innerWidth;
  window.addEventListener("resize", () => {
    const newWidth = window.innerWidth;
    const newHeader = document.querySelector(`.${TAG}-header`);
    const oldHeader = document.querySelector(".tpt-frontend > div > div > .responsive, .tpt-frontend .HeaderLayout");

    if (newWidth >= 980) {
      if (newHeader) {
        newHeader.classList.remove(`${TAG}-hidden`);
        const search = oldHeader.querySelector(".SearchAutosuggestBespoke");
        if (search) {
          newHeader.querySelector(`.${TAG}-header-search`)?.appendChild(search);
        }

        for (const newInput of document.querySelectorAll(`.${TAG}-new-inputs-holder`)) {
          newInput.classList.remove(`${TAG}-hidden`);
        }

        for (const editorial of document.querySelectorAll(`.${TAG}-module-top, .${TAG}-module-middle, .${TAG}-module-bottom`)) {
          editorial.classList.remove(`${TAG}-hidden`);
        }
      }
      oldHeader?.classList.add(`${TAG}-hidden`);

      if (previousWidth < 980) {
        setAttributes({ "tpt968-resized-below-980px-then-back-up": true });
      }
    } else {
      if (newHeader) {
        newHeader.classList.add(`${TAG}-hidden`);
        const search = newHeader.querySelector(".SearchAutosuggestBespoke");
        if (search) {
          oldHeader.querySelector(".SecondaryHeaderLayout > div:nth-child(2)")?.appendChild(search);
        }

        for (const newInput of document.querySelectorAll(`.${TAG}-new-inputs-holder`)) {
          newInput.classList.add(`${TAG}-hidden`);
        }

        for (const editorial of document.querySelectorAll(`.${TAG}-module-top, .${TAG}-module-middle, .${TAG}-module-bottom`)) {
          editorial.classList.add(`${TAG}-hidden`);
        }
      }
      oldHeader?.classList.remove(`${TAG}-hidden`);

      if (previousWidth >= 980) {
        setAttributes({ "tpt968-resized-below-980px": true });
        window.location.reload();
      }
    }

    previousWidth = newWidth;
  });

  // Used to immediately remove the header depending on screen size (client request) 2/2
  window.setTimeout(() => window.dispatchEvent(new Event("resize"), 0));
};

export const globalHeader = {
  name: "1069-header",
  applyMetrics,
  applyTreatment,
  checkURL: () => true
};
