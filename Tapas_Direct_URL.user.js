// ==UserScript==
// @name         Tapas - Direct URL
// @description  Get direct link to your comic to post, for example, on Reddit
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.1.2
// @run-at       document-end
// @include      /https?:\/\/tapas\.io\/episode\/.+/
// ==/UserScript==

let directButton = document.createElement("a");
directButton.className = "mix-btn large copy-btn js-copy-link";
directButton.href = "#!/copy-link";
directButton.setAttribute("data-copy-url", document.querySelector("img.art-image").src);
directButton.innerHTML = '<i class="sp-btn-link"></i><span class="btn-label small">copy direct link</span>'
directButton.style = "width: initial; padding-right: 10px; margin-left: 5px";
document.querySelector("div.left-side.like-info").style = "width: initial";
let rightButtonsContainer = document.querySelector("div.right-side.share-box")
rightButtonsContainer.style = "width: initial";
rightButtonsContainer.appendChild(directButton);
