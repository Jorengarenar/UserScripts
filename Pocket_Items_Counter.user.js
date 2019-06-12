// ==UserScript==
// @name         Pocket - Items Counter
// @description  Works only if there is nothing more to load during being on site
// @author       Jorengarenar
// @version      1.5
// @include      *://app.getpocket.com*
// @run-at       document-end
// ==/UserScript==

function countItems(){
    try {
        document.querySelector('#counter').remove();
    } finally {
        let number = document.getElementsByClassName('css-d4njwk').length;
        let intext = document.createElement('li');
        let bar = document.createElement('a');
        intext.id = "counter";
        intext.className = "css-1q7nt9b";
        intext.innerHTML = '<a><span style="padding: 5px">Count:</span><span style="font-weight:bold; color: red;">' + number + '</span></a>';
        document.querySelector('.css-7gaew3').appendChild(intext);
    }
}

function foo() {
    window.setTimeout(function(){
        let test = document.querySelectorAll('.css-1s7mmnq a, .css-1ugsi33 a, .css-7gaew3 a')
        test.forEach(function(a) {
            a.addEventListener('click', function(){
                window.setTimeout(function(){
                    countItems();
                    foo();
                }, 500);
            }, false);
        });
    }, 1000);
}

function initialize() {
    window.setTimeout(function(){
        if (document.getElementsByClassName('css-d4njwk').length < 30) {
            window.setTimeout(function(){
                countItems();
            }, 500);
        } else {
            window.scrollTo(0,document.body.scrollHeight);
            window.setTimeout(function(){
                countItems();
            }, 500);
            window.setTimeout(function(){
                window.scrollTo(0,0);
            }, 500);
        }
    }, 500);
}

window.onload = function() {
    initialize();
    foo();
}
