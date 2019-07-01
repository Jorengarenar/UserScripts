// ==UserScript==
// @name         MAL - Filter by airing/publishing status
// @description  Simple menu to filter entries on MAL by airing/publishing status
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      1.0.2
// @include      /^https?:\/\/myanimelist\.net\/(anime|manga)list\/\w+/
// @grant        GM_addStyle
// ==/UserScript==

GM_addStyle(`
    .status-filter {
        display: none;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }

    .status-filter input {
        vertical-align: middle;
    }
`)

// Add button to show/hide "Status filters" menu
var filterButton = document.createElement('a');
filterButton.innerHTML = '<i class="fa fa-filter"></i> Status filters';
filterButton.href = "javascript: void(0);"
$(filterButton).click(function() {
    let e = $(".status-filter");
    e.is(":visible") ? e.slideUp(100) : e.slideDown(100)
});
$('.stats').append(filterButton);

// Create menu
var menu = document.createElement('div');
menu.setAttribute('class', 'status-filter');
menu.innerHTML = "<span><b>Hide:</b></span>"

// Values of checkboxes contains jQuery selectors
if (document.URL.indexOf("/animelist/") >= 0) {
    menu.innerHTML += `
    <label><input type="checkbox" name="airing" value=":contains(Airing)"> Currently Airing</label>
    <label><input type="checkbox" name="finished" value=":not(:contains(Airing)):not(:contains(Not Yet Aired))"> Finished Airing</label>
    <label><input type="checkbox" name="not_yet" value=":contains(Not Yet Aired)"> Not Yet Aried</label>
    `;
} else {
    menu.innerHTML += `
    <label><input type="checkbox" name="publishing" value=":contains(Publishing)"> Currently Publishing</label>
    <label><input type="checkbox" name="finished" value=":not(:contains(Publishing)):not(:contains(Not Yet Published))"> Finished Publishing</label>
    <label><input type="checkbox" name="not_yet" value=":contains(Not Yet Published)"> Not Yet Published</label>
    `;
}

// "Below" Stats will be "Status filter" menu
$(menu).insertAfter('.list-stats');

let filters = $('.status-filter input');

// jQuery selectors are in values of menu checkboxes
for (let filter of filters) {
    if (filter.type === 'checkbox') {
        filter.onclick = function() {
            if (this.checked) {
                $('tbody.list-item' + this.value).hide();
            } else {
                $('tbody.list-item' + this.value).show();
            }
        }
    }
}
