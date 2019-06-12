
// ==UserScript==
// @name         Pocket - Items Counter
// @description  DROPPED | As more items load when you scroll down, you can refresh the countItems hitting Control-Backspace.
// @author       Jorengarenar
// @version      1.2.2
// @include      *://app.getpocket.com*
// @run-at       document-end
// ==/UserScript==

function countItems(){
    // document.querySelector('.item_type_spoc').remove();
    let number = document.getElementsByClassName('css-d4njwk').length;
    console.log(number);
    let intext = document.createElement('li');
    intext.id = "counter";
    intext.className = "css-1q7nt9b";
    intext.innerHTML = 'Count: <span style="font-weight:bold; color: red;">' + number + '</span>';
    document.querySelector('.css-7gaew3').appendChild(intext);
}

// Refreshing using control + backspace
// $(document).keydown(function(e) {
//     if (e.keyCode == 8 && e.ctrlKey) {
//         countItems();
//     }
// });

// $('div, a').parent().click(function() {
//     window.setTimeout(function(){
//         countItems();
//     }, 500);
// });
//
// $('.wrapper_tag').parent().click(function() {
//     countItems();
// });

function countItems2() {
    window.setTimeout(function(){
        if (document.getElementsByClassName('item_content').length - document.getElementsByClassName('tf-hidden').length < 30) {
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

// $('.pocket_logo, .section-mylist').click(function() {
//     countItems2();
// });

window.onload = countItems2();
