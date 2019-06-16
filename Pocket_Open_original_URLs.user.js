// ==UserScript==
// @name         Pocket - Open original URLs
// @description  Opens original links instead of article view
// @author       Jorengarenar
// @version      0.2
// @include      /https?:\/\/(app\.)?getpocket.com.*/
// @include      https://getpocket.com
// @run-at       document-end
// ==/UserScript==


const config = {
    childList: true,
    subtree: true
};

function change(queue, observer) {
    window.setTimeout(function() {
        let articles_list = document.querySelectorAll('article');
        for (let link of articles_list) {
            let originalURL = link.querySelector('.css-1fzr42x > a');
            if (originalURL) {
                let articleURL = link.querySelector('.css-7zhfhb > a');
                let originalCopy = originalURL.cloneNode(1);
                originalCopy.innerHTML = articleURL.innerHTML;
                link.querySelector('.css-7zhfhb').replaceChild(originalCopy, articleURL);
            }
        }
    }, 1000);
};

const observer = new MutationObserver(change);

change(document.body, config);

observer.observe(document.body, config);
