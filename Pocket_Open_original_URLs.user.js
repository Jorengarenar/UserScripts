// ==UserScript==
// @name         Pocket - Open original URLs
// @description  Opens original links instead of article view
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.4.1
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
        let newURL = document.createElement('a');
        newURL.href = decodeURIComponent(originalURL.href.replace("https://getpocket.com/redirect?url=", ''));
        newURL.target = "_blank";
        newURL.style = "font-size: 20px; line-height: 1.2em; max-height: 2.4em;";
        newURL.className = "css-7d05mi";

        let articleURL = link.querySelector('.css-7zhfhb > a');
        newURL.innerText = articleURL.querySelector('div').innerText;
        articleURL.replaceWith(newURL);
      }
    }
  }, 1000);
};

const observer = new MutationObserver(change);

change(document.body, config);

observer.observe(document.body, config);
