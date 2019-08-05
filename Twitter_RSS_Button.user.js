// ==UserScript==
// @name         Twitter - RSS Buttons
// @description  DOES NOT WORK ANYMORE | RSS using TwitRSS.me
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.2.5
// @run-at       document-end
// @include      /https?:\/\/twitter.com\/.+/
// ==/UserScript==

if (document.URL.indexOf("/status/") >= 0) {
  var rss = "https://twitrss.me/twitter_user_to_rss/?user=" + document.querySelector(".permalink-header .username > b").innerText;
} else {
  var rss = window.location.toString().replace(/twitter.com\//, 'twitrss.me/twitter_user_to_rss/?user=');
}
let rssButton = document.createElement('span');
rssButton.innerHTML = "<a href=" + rss + " target='_blank' class='EdgeButton EdgeButton--secondary EdgeButton--medium  button-text follow-text'>RSS</a>";
rssButton.style = "padding-left:10px";
document.querySelector(".user-actions").appendChild(rssButton);
