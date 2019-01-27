// ==UserScript==
// @name         RSS Buttons
// @description  A bulk script which adds RSS Button to sites I decided at some point need it
// @author       Jorengarenar
// @version      1.1
// @run-at       document-end
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js

// @include      *instagram.com*
// @include      *twitter.com/*

// ==/UserScript==

if ( document.URL.indexOf("instagram") >= 0 ) {
    let url = window.location.toString();
    let rss = url.replace(/www.instagram.com\//, 'rsshub.app/instagram/user/');
    let rssButton = document.createElement('a');
    rssButton.href = rss.substring(0, rss.length - 1);
    rssButton.target = "_blank";
    rssButton.innerHTML = "<b>RSS</b>";
    rssButton.setAttribute('class',"BY3EC _0mzm- sqdOP  L3NKy");
    window.setTimeout(function(){
        $('.BY3EC').replaceWith(rssButton);
    }, 1000);
}


if ( document.URL.indexOf("twitter.com") >= 0 ) {
    let url = window.location.toString();
    let rss = url.replace(/twitter.com\//, 'twitrss.me/twitter_user_to_rss/?user=');
    let headerBottomLeft = document.querySelector(".user-actions");
    let rssButton = document.createElement('a');
    rssButton.href = rss;
    rssButton.target = "_blank";
    rssButton.innerHTML = "<b>RSS</b>";
    rssButton.style = "display:inline-block;padding-left:10px";
    headerBottomLeft.appendChild(rssButton);
}