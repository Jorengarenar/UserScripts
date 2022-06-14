// ==UserScript==
// @name         Gmail - Show Archived
// @version      1.0.0
// @description  A folder-looking button to show archivized emails
// @author       Jorengarenar
// @run-at       document-end
// @match        https://mail.google.com/*
// ==/UserScript==

"use strict";

const url = "https://mail.google.com/mail/u/0/#search/has%3Anouserlabels+-in%3AInbox+-in%3ASent+-in%3ADraft+-in%3AChat";

const btn = document.createElement("div");
btn.classList.add("aim");
btn.onclick = () => { window.location = url; }
btn.innerHTML = `
<div class="TO" data-tooltip="Archived">
  <div class="TN">
    <div class="qj brq"></div>
    <span class="nU">
      <a href="${url}" class="n0">Archived</a>
    </span>
  </div>
</div>
`

const interval = setInterval(function() {
  if (document.querySelector(".byl .TK")?.appendChild(btn)) {
    clearInterval(interval);
  }
}, 100);
