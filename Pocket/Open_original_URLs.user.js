// ==UserScript==
// @name         Pocket - Open original URLs
// @description  Opens original links instead of article view
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      0.6.0
// @match        https://getpocket.com/*
// @run-at       document-end
// ==/UserScript==

new MutationObserver(function() {
  document.querySelectorAll("article").forEach((article) => {
    let originalURL = article.querySelector("a.publisher");
    let link = article.querySelector(".content > h2.title");
    if (originalURL && link.querySelector("a[tabindex=\"0\"]")) {
      let newURL = document.createElement("a");
      newURL.textContent = link.querySelector("a").textContent;
      newURL.href = originalURL.href;
      link.replaceChild(newURL, link.childNodes[0]);
    }
  });
}).observe(document.body, { childList: true, subtree: true });
