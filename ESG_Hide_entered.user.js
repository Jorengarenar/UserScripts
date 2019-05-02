// ==UserScript==
// @name         ESG - Hide entered
// @description  Adds checkbox on the main page to hide/unhide entered giveaways while using Extended Steamgifts. Do not use with default ESG "Hide entered giveaways" option
// @author       Jorengarenar
// $version      1.0
// @include      https://www.steamgifts.com/giveaways/search*
// @include      https://www.steamgifts.com
// ==/UserScript==

let checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.id = "hide-entered";
checkbox.onclick = function() {
    if (this.checked) {
        $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").hide()
        $(document).on('scroll', function() {
            $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").hide()
        });
    } else {
        $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").show()
        $(document).on('scroll', function() {
            $(".sidebar__entry-insert.is-hidden").closest(".giveaway__row-outer-wrap").show()
        });
    }
}

let div_hidder = document.createElement('div');
div_hidder.style = "display: inline-flex";
div_hidder.appendChild(checkbox);

let label = document.createElement('label');
label.className = "sidebar__navigation__item__name"
label.innerText = "Hide entered"
label.htmlFor = "hide-entered";

div_hidder.appendChild(label);

$(".sidebar__navigation:last").after(div_hidder);

$(function() {
    checkbox.click();
});
