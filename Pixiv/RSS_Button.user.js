// ==UserScript==
// @name         Pixiv - RSS Button
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      1.5.0
// @run-at       document-end
// @match        https://www.pixiv.net/*
// ==/UserScript==

const rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "_2Of8xxg");

window.onload = function() {
  new MutationObserver(function() {
    if (! /users\/\d+/.test(window.location.pathname)) { return; }

    const id = window.location.href.match(/users\/(\d+)/)[1];
    rssButton.href = "https://rsshub.app/pixiv/user/" + id;

    const bar = Array.from(document.querySelectorAll('button:first-child'))
      .find(el => el.textContent.match(/Follow(ing)?/))?.parentNode;

    if (!bar || bar.childNodes.length < 3) { return; }

    bar.prepend(rssButton);
  }).observe( document.body, { childList: true, subtree: true } );
};
