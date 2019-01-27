// ==UserScript==
// @name         Pocket - Items Counter
// @description  As more items load when you scroll down, you can refresh the countItems hitting Control-Backspace.
// @author       Jorengarenar
// @verison      1.0
// @match        *://getpocket.com/a/*/list/*
// @run-at       document-end
// ==/UserScript==

function countItems(){
    $('#counter').remove();
    $('.item_type_spoc').remove();
    let number = document.getElementsByClassName('item').length - $('li.tf-hidden').length;
    let intext = '<li id="counter" style="color: white;">Count: <span style="font-weight:bold; color: red;">' + number + '</span></li>';
    $(intext).insertBefore($("#pagenav_searchicon"));
}

// refresh using control + backspace
$(document).keydown(function(e) {
    if (e.keyCode == 8 && e.ctrlKey) {
        countItems();
    }
});

$('div, a').parent().click(function() {
    window.setTimeout(function(){
        countItems();
    }, 500);
});

$('.wrapper_tag').parent().click(function() {
    countItems();
});

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

$('.pocket_logo, .section-mylist').click(function() {
    countItems2();
});

window.onload = countItems2();
