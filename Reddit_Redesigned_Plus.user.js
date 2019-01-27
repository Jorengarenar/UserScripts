// ==UserScript==
// @name         Reddit Redesigned+
// @description  Works with old Reddit
// @run-at       document-end
// @grant        GM_addStyle
// @require      https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @include      *reddit.com/*
// @exclude      *reddit.com/prefs*
// ==/UserScript==


GM_addStyle (`
    textarea {
        background: var(--gray-0) !important;
        border: 1px solid var(--gray-1) !important;
        border-radius: 2px !important;
    }
    .md-spoiler-text:not(.revealed) {
        background: var(--text-med) !important;
    }
    .pagename {
        color: var(--text-normal) !important;
    }
`);

// CSS does not want to work for 'code' tag
$('code').attr('style', "color: #444 !important;");

window.setTimeout(function(){
    $('.play-pause').click();
}, 1000);

let tabMenu = document.getElementsByClassName('tabmenu')[0];
$('<span class="separator">-</span>').insertBefore( $(tabMenu).children().not(":eq(0)") );
tabMenu.className = "flat-list sr-bar hover";
tabMenu.classList.remove('tabmenu');
let srList = document.getElementsByClassName('sr-list')[0];
let separator = document.createElement('span');
separator.setAttribute('class', 'separator');
separator.innerHTML = '&nbsp;|&nbsp;';
srList.insertBefore(tabMenu, document.getElementsByClassName('flat-list')[1]);
srList.insertBefore(separator, document.getElementsByClassName('flat-list')[2]);

if ( document.URL.indexOf("/comments/") >= 0 ) {
    let title = "<p style='color:#444; font-size:12px'>" + document.querySelector('a.title').innerHTML + "</p>";
    $(title).insertAfter('span.domain');
}

var buttons = document.querySelectorAll('.expando-button');
if ( document.URL.indexOf("/comments/") < 0 ) {
    for(let i = 0; i < buttons.length; i++) {
        buttons[i].click();
    }
    var expandoBool = true;
}

if (expandoBool) {
    let headerBottomLeft = document.querySelector("#header-bottom-left");
    let expandButton = document.createElement('button');
    expandButton.style = "margin-left: 10px;";
    expandButton.innerHTML = "Collapse All";
    expandButton.onclick = function() {
        if (expandButton.innerHTML == "Expand All") {
            for(let i = 0; i < buttons.length; i++) {
                if ($(buttons[i]).hasClass("collapsed")) {
                    buttons[i].click();
                }
            }
            expandButton.innerHTML = "Collapse All";
        } else {
            for(let i = 0; i < buttons.length; i++) {
                if ($(buttons[i]).hasClass("expanded")) {
                    buttons[i].click();
                }
            }
            expandButton.innerHTML = "Expand All";
        }
    };
    headerBottomLeft.appendChild(expandButton);
}

let post = document.getElementsByClassName("link");
post.style = "overflow:hidden"
for(let i = 0; i < post.length; i++) {
    let space = document.createElement('div');
    space.style = "flex: 1";
    space.class = "emptySpace";
    space.onclick = function() {
        space.parentNode.querySelector('.expando-button').click();
    }
    post[i].appendChild(space);
}

let navButtons = document.querySelector('.nav-buttons');
navButtons.style = "margin-top:20px; margin-bottom:20px; margin-left: 20px; margin-right: 20px";

try {
    let prevButton = document.querySelector('.prev-button');
    prevButton.firstChild.style = "padding: 10px 100px 10px 100px; margin-right:10px";
    $(prevButton).addClass("nextprev");
    navButtons.appendChild(prevButton);
} finally {
    let nextButton = document.querySelector('.next-button');
    nextButton.firstChild.style = "padding: 10px 100px 10px 100px;margin-left: 10px";
    $(nextButton).addClass("nextprev");
    navButtons.appendChild(nextButton);

    document.querySelector('.nextprev').remove();
};
