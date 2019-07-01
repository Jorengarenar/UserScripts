// ==UserScript==
// @name         Reddit Expando Button
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.0.2
// @run-at       document-end
// @include      *reddit.com/*
// ==/UserScript==

var btn = document.createElement("button");
btn.innerHTML = "Expando Button";
btn.onclick = function() {
    $('.expando-button.collapsed').click()
}
document.querySelector('#header-bottom-left').appendChild(btn);
