// ==UserScript==
// @name         Twitter - RSS Buttons
// @author       Jorengarenar
// @version      0.2.4
// @run-at       document-end
// @include      *twitter.com/*
// ==/UserScript==

let rssButton = document.createElement('span');
var rss;
if (document.URL.indexOf("/status/") >= 0) {
    rss = "https://twitrss.me/twitter_user_to_rss/?user=" + document.querySelector(".permalink-header .username > b").innerText;
} else {
    rss = window.location.toString().replace(/twitter.com\//, 'twitrss.me/twitter_user_to_rss/?user=');
}
rssButton.innerHTML = "<a href=" + rss + " target='_blank' class='EdgeButton EdgeButton--secondary EdgeButton--medium  button-text follow-text'>RSS</a>";
rssButton.style = "padding-left:10px";
document.querySelector(".user-actions").appendChild(rssButton);
