// ==UserScript==
// @name         Pocket - Items Counter
// @description  Works only for small number of items
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      1.8.1
// @include      /https?:\/\/(app\.)?getpocket.com.*/
// @include      https://getpocket.com
// @exclude      /https?:\/\/(app\.)?getpocket.com\/read\/.*/
// @run-at       document-end
// ==/UserScript==

const config = {
    childList: true,
    subtree: true
};

function countItems(){
    window.setTimeout(function(){
        try {
            document.querySelector('#counter').remove();
        } finally {
            if (!window.location.href.match(/https?:\/\/(app\.)?getpocket.com\/read\/.*/)) {
                let number = document.getElementsByClassName('css-d4njwk').length;
                let intext = document.createElement('li');
                let bar = document.createElement('a');
                intext.id = "counter";
                intext.className = "css-1q7nt9b";
                intext.innerHTML = '<a><span style="padding: 5px">Count:</span><span style="font-weight:bold; color: red;">' + number + '</span></a>';
                document.querySelector('.css-7gaew3').appendChild(intext);
            }
        }
    }, 500);
}

const observer = new MutationObserver(countItems);

countItems();

observer.observe(document.body, config);
