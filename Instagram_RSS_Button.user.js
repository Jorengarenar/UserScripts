// ==UserScript==
// @name         Instagram - RSS Buttons
// @description  RSS using RSSHub.app
// @author       Jorengarenar
// @version      0.2.5
// @run-at       document-end
// @include      *instagram.com*
// ==/UserScript==

let rssButton = document.createElement('a');
rssButton.target = "_blank";
rssButton.innerHTML = "<b>RSS</b>";
rssButton.setAttribute('class', "BY3EC _0mzm- sqdOP  L3NKy");
window.onload = function() {
    rssButton.href = "https://rsshub.app/instagram/user/" + document.querySelector('._7UhW9.fKFbl.yUEEX.KV-D4.fDxYl').innerText;
    document.querySelector('.nZSzR').appendChild(rssButton);
};
