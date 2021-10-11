// ==UserScript==
// @name         Reddit Expando Button
// @author       Jorengarenar
// @namespace    https://joren.ga
// @version      0.0.2
// @run-at       document-end
// @include      https?:\/\/(www\.|old\.)?reddit.com.*
// ==/UserScript==

const btn = document.createElement("button");
btn.innerHTML = "Expando Button";
btn.onclick = function() {
  $(".expando-button.collapsed").click();
};
document.querySelector("#header-bottom-left").appendChild(btn);
