import { utils, error, sendEvent } from "base";

const sendClickEvent = eventName => {
  sendEvent(eventName);
  window.heap.track(eventName);
};

export const waitForClick = (selector, eventName) => {
  utils.waitForElement(selector)
    .then(element => element.addEventListener("click", () => sendClickEvent(eventName)))
    .catch(error);
};

export const observeClick = (selector, eventName) => {
  utils.observeSelector(selector, element => element.addEventListener("click", () => sendClickEvent(eventName)));
};