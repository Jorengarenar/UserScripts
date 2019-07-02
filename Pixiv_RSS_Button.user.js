// ==UserScript==
// @name         Pixiv - RSS Button
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.3.1
// @run-at       document-end
// @include      /https?:\/\/www\.pixiv\.net\/member\.php\?id=\d+/
// ==/UserScript==

let rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "_2Of8xxg");
rssButton.style = "margin-right: 10px; margin-left: 20px";
let id = window.location.href.match(/id=(\d+)/)[1];
rssButton.href = "https://rsshub.app/pixiv/user/" + id;
window.onload = function() {
  let bar = document.querySelector('._310Z6Ex')
  if (bar) {
    bar.insertBefore(rssButton, bar.childNodes[0]);
  } else {
    document.querySelector('.userdata').insertBefore(rssButton, document.querySelector('.count-container'));
  }
};
