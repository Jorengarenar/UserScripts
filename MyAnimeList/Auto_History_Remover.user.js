// ==UserScript==
// @name         MAL Auto History Remover
// @description  Cleans your MAL history every time you refresh website. Does NOT affect RSS and Last Updated on profile!
// @version      1.0.1
// @author       Jorengarenar
// @namespace    https://joren.ga
// @run-at       document-end
// @match        https://myanimelist.net/*
// @grant        GM_addStyle
// @grant        unsafeWindow
// ==/UserScript==

GM_addStyle(".history, .icon-history, .updates h5 a { display: none !important; }");

const parser = new DOMParser();

function clearEntry(context) {
  parser.parseFromString(context, "text/html").querySelectorAll("a").forEach((a) => {
    let entry = a.getAttribute("onclick");
    $.ajax({
      type:     "POST",
      url:      `/includes/ajax.inc.php?t=${entry.match(/removeEp/) ? 58 : 60}`,
      dataType: "text",
      data:     `id=${entry.match(/\d+/)}`,
    });
  });
}

function clearHistory() {
  fetch(`/history/${unsafeWindow.MAL.USER_NAME}`).then((res) => res.text()).then((html) => {
    parser.parseFromString(html, "text/html").querySelectorAll("a.lightbox").forEach((a) => {
      fetch(a.href).then((res) => res.text()).then((data) => clearEntry(data));
    });
  });
}

if (!document.querySelector("#malLogin")) { clearHistory(); }
