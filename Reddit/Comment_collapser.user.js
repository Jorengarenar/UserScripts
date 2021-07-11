// ==UserScript==
// @name         Reddit Old - Comment collapser
// @description  Collapse comment trees in fashion similar to New Reddit
// @version      0.9.0
// @author       Jorengarenar
// @match        https://*.reddit.com/r/*/comments/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
  .comment        { position: relative; width: max-content;  }
  .comment .entry        { margin-left: 25px;                }
  .comment .midcol       { position: absolute; height: 100%; }
  .comment .midcol:hover { background: rgba(0, 0, 0, 0.4);   }
  .comment.deleted > .midcol          { visibility: visible; }
  .comment.deleted > .midcol > .arrow { visibility: hidden;  }
`)

window.addEventListener("click", (e) => {
  if (e.target.matches(".comment .midcol")) {
    let comment = e.target.closest(".comment");
    comment.querySelector(".entry .tagline .expand").click();

    let top = comment.getBoundingClientRect().top;
    if (top < 0) { // if top of comment is out of viewport, scroll to it
      window.scrollTo(null, window.scrollY + top - 10);
    }
  }
});
