// ==UserScript==
// @name         Reddit Old - Comment collapser
// @description  Collapse comment trees in fashion similar to New Reddit
// @version      1.0.0
// @author       Jorengarenar
// @match        https://*.reddit.com/r/*/comments/*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
  .comment               { position: relative;               }
  .comment > .entry      { margin-left: 35px;                }
  .comment > .midcol     { position: absolute; height: 100%; }
  .comment > .child      { border: none;                     }
  .comment.deleted > .midcol          { visibility: visible; }
  .comment.deleted > .midcol > .arrow { visibility: hidden;  }

  .comment > .midcol::after {
    border-left: 1px dotted;
    content: '';
    display: block;
    height: 100%;
    margin: 10px auto;
    width: 1px;
  }

  .comment > .midcol:hover::after {
    border-width: 3px;
  }
`);

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
