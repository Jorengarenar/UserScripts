// ==UserScript==
// @name         Pixiv - RSS Button
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @version      0.1
// @run-at       document-end
// @include      https://www.pixiv.net
// @include      *pixiv.net*
// ==/UserScript==

let rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "_2Of8xxg");
let id = window.location.href.match(/id=(\d+)/)[1];
rssButton.href = "https://rsshub.app/pixiv/user/" + id;
window.onload = function() {
    document.querySelector('._310Z6Ex').appendChild(rssButton);
};
