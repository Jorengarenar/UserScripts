// ==UserScript==
// @name         RSS Buttons
// @author       Jorengarenar
// @version      1.2.4
// @run-at       document-end

// @include      *instagram.com*
// @include      *twitter.com/*

// ==/UserScript==

if (document.URL.indexOf("instagram.com") >= 0) {
    let rssButton = document.createElement('a');
    rssButton.target = "_blank";
    rssButton.innerHTML = "<b>RSS</b>";
    rssButton.setAttribute('class', "BY3EC _0mzm- sqdOP  L3NKy");
    window.onload = function() {
        rssButton.href = "https://rsshub.app/instagram/user/" + document.querySelector('._7UhW9.fKFbl.yUEEX.KV-D4.fDxYl').innerText;
        document.querySelector('.nZSzR').appendChild(rssButton);
    };
}


if (document.URL.indexOf("twitter.com") >= 0) {
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
}
