// ==UserScript==
// @name           MAL - Japanese Titles
// @version        0.6.7
// @description    Titles in Japanese for anime/manga lists on MyAnimeList
// @include        /^https?://myanimelist.net/(anime|manga)list/\w+/
// @grant          GM_xmlhttpRequest
// ==/UserScript==

var pattern = /<span class=\"dark_text\">Japanese:<\/span> (.*?)(?:<\/div>|\n)/

var titles = document.querySelectorAll("td.title > a, .statistics-updates > .data > a");

for (let title of titles) {
    GM_xmlhttpRequest({
        method: "GET",
        url: title.getAttribute("href"),
        onload: function(response) {
            var japanese = pattern.exec(response.responseText)[1];
            if (typeof japanese != 'undefined' && japanese != '')
                title.innerText = japanese;
        }
    });
}
