// ==UserScript==
// @name         Hacker News - comment collapse
// @description  Collapse comment tree without scrolling to its root (similar as on Reddit New)
// @version      0.4.0
// @author       Jorengarenar
// @match        https://news.ycombinator.com/item?id=*
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
  .comment-collapser { position: absolute; width: 5px; margin-left: 5px; margin-top: 7px; }
  .comment-collapser:hover { background: rgba(0, 0, 0, 0.4);   }
`);

function countHeight(comments, i) {
  let height = comments[i].offsetHeight;
  let ind = comments[i].querySelector("td.ind > img").width;
  for (let j = i+1; j < comments.length; ++j) {
    if (comments[j].querySelector("td.ind > img").width > ind) {
      height += comments[j].offsetHeight;
    } else {
      break;
    }
  }
  return height;
}

function generateCollapsers() {
  document.querySelectorAll(".comment-collapser").forEach((cl) => {
    cl.parentNode.removeChild(cl);
  });

  let comments = document.querySelectorAll(".comment-tree .athing.comtr");
  for (let i = 0; i < comments.length; ++i) {
    let div = document.createElement("div");
    div.className = "comment-collapser";
    div.style = "height: " + (countHeight(comments, i) - 30) + "";
    comments[i].querySelector("td.votelinks").appendChild(div);
  }
}

window.addEventListener("click", (e) => {
  if (e.target.matches(".comment-collapser")) {
    let comment = e.target.closest(".athing.comtr");
    comment.querySelector(".default .comhead .togg").click();

    let top = comment.getBoundingClientRect().top;
    if (top < 0) { // if top of comment is out of viewport, scroll to it
      window.scrollTo(null, window.scrollY + top - 10);
    }

    generateCollapsers();
  }
});

document.querySelectorAll(".athing.comtr .default .comhead .togg").forEach((t) => {
  t.addEventListener("click", generateCollapsers);
});
generateCollapsers();
