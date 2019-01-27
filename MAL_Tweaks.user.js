// ==UserScript==
// @name       MAL Tweaks
// @version    0.0.1
// @run-at     document-end
// @include    *myanimelist.net/*
// ==/UserScript==

if ( document.URL == "https://myanimelist.net/"  ) {
    window.setTimeout(function() {
        window.location = $('.header-profile-button').attr('href');
    }, 100);
}

if ( document.URL.indexOf("animelist") >= 0 || document.URL.indexOf("mangalist") >= 0 ) {
    $('tbody.list-item').attr('onmouseover', 'this.style = "background-color: #333"').attr('onmouseout', 'this.style = "background-color: initial"');
}

if (document.URL.indexOf("status=6") >= 0 && document.URL.indexOf("mangalist") < 0) {
    let onlyAired = document.createElement('a');
    onlyAired.innerHTML = '<i class="fa fa-square"></i>'
    onlyAired.innerHTML += " Hide not yet aried";
    onlyAired.href = "javascript: void(0);";
    onlyAired.onclick = function() {
        $('tbody:contains(Not Yet Aired)').toggle();
    }
    $(onlyAired).insertBefore('#show-stats-button');
}

/*
if ((document.URL.indexOf("status=1") >= 0 || document.URL.indexOf("status=3") >= 0 || document.URL.indexOf("status=4") >= 0)&& document.URL.indexOf("mangalist") < 0) {
    let exceptAiring = document.createElement('a');
    exceptAiring.innerHTML = '<i class="fa fa-square"></i>'
    exceptAiring.innerHTML += " Hide \"Airing\"";
    exceptAiring.href = "javascript: void(0);";
    exceptAiring.onclick = function() {
        $('tbody:contains(Airing)').toggle();
    }
    $(exceptAiring).insertBefore('#show-stats-button');
}
*/

if (document.URL.indexOf("status=6") >= 0 && document.URL.indexOf("mangalist") >= 0) {
    let onlyPublishing = document.createElement('a');
    onlyPublishing.innerHTML = '<i class="fa fa-square"></i>'
    onlyPublishing.innerHTML += " Show only \"Publishing\"";
    onlyPublishing.href = "javascript: void(0);";
    onlyPublishing.onclick = function() {
        $('tbody:not(:contains(Publishing)):not(:not(.list-item))').toggle();
    }
    $(onlyPublishing).insertBefore('#show-stats-button');
}

if ((document.URL.indexOf("status=1") >= 0 || document.URL.indexOf("status=3") >= 0 || document.URL.indexOf("status=4") >= 0)&& document.URL.indexOf("mangalist") >= 0) {
    let exceptPublishing = document.createElement('a');
    exceptPublishing.innerHTML = '<i class="fa fa-square"></i>'
    exceptPublishing.innerHTML += " Hide \"Publishing\"";
    exceptPublishing.href = "javascript: void(0);";
    exceptPublishing.onclick = function() {
        $('tbody:contains(Publishing)').toggle();
    }
    $(exceptPublishing).insertBefore('#show-stats-button');
}

if ((document.URL.indexOf("status=1") >= 0 || document.URL.indexOf("status=3") >= 0 || document.URL.indexOf("status=4") >= 0)&& document.URL.indexOf("mangalist") >= 0) {
    let exceptPublishing = document.createElement('a');
    exceptPublishing.innerHTML = '<i class="fa fa-square"></i>'
    exceptPublishing.innerHTML += " Show only novels";
    exceptPublishing.href = "javascript: void(0);";
    exceptPublishing.onclick = function() {
        $('tbody:not(:contains(Novel)):not(:not(.list-item))').toggle();
    }
    $(exceptPublishing).insertBefore('#show-stats-button');
}

$('.link-mal-logo').attr("href", $('.header-profile-button').attr('href'));

$('#contentWrapper').style = "min-height: initial; padding-bottom: initial;";

if ($("h2:contains(Manga Store)").text() != "") {
    $("tr:nth-of-type(2) > .pb24").remove();
}
$("h2:contains(Reviews)").remove();

// vi: set filetype=javascript:
