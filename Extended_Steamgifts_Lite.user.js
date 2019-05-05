// ==UserScript==
// @name         Extended Steamgifts Lite
// @description  Endless scroll, scroll to top, hide entered and enter/remove buttons
// @author       Jorengarenar
// @include      *steamgifts.com*
// @version      1.7.0
// @grant        GM_addStyle
// ==/UserScript==

// Styles
$("body").prepend("                                                                                \
<style>                                                                                            \
.sidebar__entry-custom                                                                             \
{                                                                                                  \
    display: inline-block;                                                                         \
    margin: 0 -10px 0 -10px !important;                                                            \
    padding: 0 8px 0 8px !important;                                                               \
    min-width: 50px;                                                                               \
    font-family: 'Arial',sans-serif;                                                               \
    font-size: 11px;                                                                               \
    line-height: 26px;                                                                             \
}                                                                                                  \
.sidebar__navigation__itemz:hover .sidebar__navigation__item__underline                            \
{                                                                                                  \
    border-bottom:2px solid transparent !important;                                                \
}                                                                                                  \
.sidebar__navigation__item__title                                                                  \
{                                                                                                  \
    font-weight:bold;                                                                              \
    font-size: 15px;                                                                               \
}                                                                                                  \
.sidebar__navigation__itemz                                                                        \
{                                                                                                  \
    font-size: 13px;                                                                               \
}                                                                                                  \
.scroll-top                                                                                        \
{                                                                                                  \
    cursor: pointer;                                                                               \
    position: fixed;                                                                               \
    bottom: 10px;                                                                                  \
    right: 40px;                                                                                   \
    transform: rotate(-90deg);                                                                     \
    opacity: 0.75;                                                                                 \
    z-index: 50;                                                                                   \
    padding: 10px !important;                                                                      \
    display: block;                                                                                \
}                                                                                                  \
.page-loading                                                                                      \
{                                                                                                  \
    width: 160px;                                                                                  \
    height:24px;                                                                                   \
    margin: 5px auto 5px auto;                                                                     \
    display:block;                                                                                 \
}                                                                                                  \
.floating-pagination                                                                               \
{                                                                                                  \
    position:fixed;                                                                                \
    bottom:45px;                                                                                   \
    width:" + $(".sidebar").width() + "px;                                                         \
    text-align:center;                                                                             \
    z-index:99999;                                                                                 \
}                                                                                                  \
.e-embed-frame,.e-widget-preloader                                                                 \
{                                                                                                  \
    margin:5px 0 5px 0 !important;                                                                 \
    .global__image-outer-wrap;                                                                     \
}                                                                                                  \
.no-user-select                                                                                    \
{                                                                                                  \
    -webkit-user-select: none;                                                                     \
    -moz-user-select: none;                                                                        \
}                                                                                                  \
.serperator                                                                                        \
{                                                                                                  \
    margin-left: 10px !important;                                                                  \
}                                                                                                  \
.advanced_search                                                                                   \
{                                                                                                  \
    padding:5px 20px 5px 20px;                                                                     \
}                                                                                                  \
.sidebar__navigation__itemz,.sidebar__navigation__item__link,.sidebar__navigation__item__underline \
{                                                                                                  \
    max-width:9999px !important;                                                                   \
}                                                                                                  \
</style>");

// Essential variables
var path = window.location.pathname;
var xsrf = $('input[type=hidden][name=xsrf_token]').val();
var lastpage = ($(".pagination__navigation:contains('Next')").length === 0);
var currentpage = Number($('.pagination__navigation').find('.is-selected').attr('data-page-number')?$('.pagination__navigation').find('.is-selected').attr('data-page-number'):1);
var hash = $(location).attr('hash');
var ver = GM_info.script.version;
var username = $(".nav__avatar-outer-wrap").attr("href").replace("/user/", "");
var pagename = $('.page__heading__breadcrumbs:first').html();
var pagination_url = "https://" + window.location.hostname + $(".pagination__navigation").find("a:last").attr("href");
var regex_pagination_results = /Displaying <strong>([0-9]{1,10})<\/strong> to <strong>([0-9]{1,10})<\/strong>/;

var rx = (regex_pagination_results).exec($(".pagination__results").html());
var pagination_min = 0,
    pagination_max = 0;
if (rx) {
    pagination_min = rx[1];
    pagination_max = rx[2];
}

// Essential functions
function getPos(str, m, i) {
    return str.split(m, i).join(m).length;
}

function updateURLParameter(url, param, paramVal) {
    var newAdditionalURL = "";
    var tempArray = url.split("?");
    var baseURL = tempArray[0];
    var additionalURL = tempArray[1];
    var temp = "";
    if (additionalURL) {
        tempArray = additionalURL.split("&");
        for (let i = 0; i < tempArray.length; i++) {
            if (tempArray[i].split('=')[0] != param) {
                newAdditionalURL += temp + tempArray[i];
                temp = "&";
            }
        }
    }

    var rows_txt = temp + "" + param + "=" + paramVal;
    return baseURL + "?" + newAdditionalURL + rows_txt;
}

function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (let i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}

// Main page button
$("header .nav__left-container").prepend('<div id="main-page-button" class="nav__button-container"><a class="nav__button" href="https://www.steamgifts.com">SteamGifts</a></div>');

// Points in page title
document.title = "(" + document.querySelector(".nav__points").innerText + "P) SteamGifts";
window.setTimeout(function() {
    $('.sidebar__entry-custom').click(function() {
        window.setTimeout(function() {
            document.title = "(" + document.querySelector(".nav__points").innerText + "P) SteamGifts";
        }, 500);
    });
}, 100);
$(document).on('scroll', function() {
    $('.sidebar__entry-custom').click(function() {
        window.setTimeout(function() {
            document.title = "(" + document.querySelector(".nav__points").innerText + "P) SteamGifts";
        }, 500);
    });
});

// Endless scroll
if ($(".pagination").length > 0 ) {
    var loading = false;
    $('.widget-container--margin-top').remove();
    $('.giveaway__row-outer-wrap:last').parent().after('<img src="https://raw.githubusercontent.com/nandee95/Extended_Steamgifts/master/img/loading.gif" class="page-loading"></div>');
    $('.table:last').after('<br><img src="https://raw.githubusercontent.com/nandee95/Extended_Steamgifts/master/img/loading.gif" class="page-loading"></div>');
    if($(".comments__entity").length === 0) $('.comments:last').after('<br><img src="https://raw.githubusercontent.com/nandee95/Extended_Steamgifts/master/img/loading.gif" class="page-loading"></div>');
    else $('.comments__entity:last').parent().after('<br><img src="https://raw.githubusercontent.com/nandee95/Extended_Steamgifts/master/img/loading.gif" class="page-loading"></div>');
    $('.page-loading').hide();
    var page = currentpage;
    $('.page__heading__breadcrumbs:first').append('<i class="fa fa-angle-right"></i><a href="' + window.location.href + '"> Page ' + page + '</a>');
    if ($('.comment--submit').length > 0) {
        $('.comment--submit').insertAfter(".page__heading:contains('Comment')");
    }

    $(document).on("click",".js__comment-reply-cancel",function () {
        $('.comment--submit').insertAfter(".page__heading:contains('Comment')");
    });

    $(".sidebar").append("<span class=\"fp-mark\" height=0></span><div class=\"floating-pagination global__image-outer-wrap\">"+($(".comment--submit").length >0? '<div class="sidebar__action-button jump_to_comment no-user-select">Write a comment</div>':'') + $('.pagination').html().replace("Previous", "").replace("...", "").replace("...", "").replace("Next", "").replace("First", "").replace("Last", "") + "</div>");
    $('.pagination').remove();
    if ($(".fp-mark").offset().top-$(window).height()+150<$(window).scrollTop()) $(".floating-pagination").show();
    else $(".floating-pagination").hide();

    $(window).scroll(function() {
        if ($(".fp-mark").offset().top-$(window).height()+150<$(window).scrollTop()) $(".floating-pagination").show();
        else $(".floating-pagination").hide();
        if (!loading && $(window).scrollTop() + $(window).height() > $(document).height() - 1000 && !lastpage) {
            loading = true;
            $('.page-loading').show();
            var pageurl = updateURLParameter(pagination_url, "page", page + 1);
            $.ajax({
                url: pageurl,
                success: function(source) {
                    lastpage = (source.indexOf('<span>Next</span>') == -1);
                    var mainurl;
                    pageurl.substring(0, pageurl.indexOf('&'));
                    if ($('.table').length > 0) {
                        $('.table:last').after('<div class="page__heading"><div class="page__heading__breadcrumbs">' + pagename + ' <i class="fa fa-angle-right"></i> <a href="' + pageurl + '">Page ' + (page + 1) + '</a></div></div><div class="table">' + $(source).find('.table').html() + '</div>');
                        check_entered_chances();
                        if(path=="/giveaways/wishlist")
                        {
                            $(".table:last").find(".table__column__heading").each(function () {
                                var title=$(this).html();
                                $(this).html("<a href=\"/giveaways/search?q="+encodeURI(title)+"\">"+title+"</a>");
                            });
                        }

                    } else if ($(".giveaway__row-outer-wrap").length > 0) {

                        $('.giveaway__row-outer-wrap:last').parent().after('<div class="page__heading"><div class="page__heading__breadcrumbs"><a href="/">Giveaways</a> <i class="fa fa-angle-right"></i> <a href="' + pageurl + '">Page ' + (page + 1) + '</a></div></div>');
                        $(source).find(".giveaway__row-outer-wrap:last").parent().insertAfter(".page__heading:last");
                        $(".giveaway__row-outer-wrap:last").parent().find(".giveaway__row-outer-wrap").format_ga().filter_ga();
                    } else if ($('.comments__entity').length > 0) { //messages page
                        $(".comments__entity:last").parent().after('<div class="page__heading"><div class="page__heading__breadcrumbs">'+pagename+' <i class="fa fa-angle-right"></i> <a href="' + pageurl + '">Page ' + (page + 1) + '</a></div></div><div>' + $(source).find('.comments__entity:first').parent().html() + '</div>');
                        $(".comments__entity:last").parent().find(".comment").find("div[class='comment__description markdown markdown--resize-body']").format_comment();
                    } else if ($('.comments').length > 0) {
                        $('.comments:last').after('<div class="page__heading"><div class="page__heading__breadcrumbs"><a href="' + mainurl + '">Comments </a> <i class="fa fa-angle-right"></i> <a href="' + pageurl + '">Page ' + (page + 1) + '</a></div></div><div class="comments">' + $(source).find('.comments:last').html() + '</div>');
                        $(".comments:last").find(".comment").find("div[class='comment__description markdown markdown--resize-body']").format_comment();
                    }
                    page++;
                    rx = (regex_pagination_results).exec($(source).find(".pagination__results").html());
                    if (rx)
                        pagination_max = rx[2];

                    $(".floating-pagination").html(($(".comment--submit").length >0? '<div class="sidebar__action-button jump_to_comment">Write a comment</div>':'') + $(source).find('.pagination').html().replace("Previous", "").replace("...", "").replace("...", "").replace("Next", "").replace("First", "").replace("Last", ""));
                    $(".pagination__results strong:first").html(pagination_min);
                    $(".pagination__results strong:nth-child(2)").html(pagination_max);
                },
                complete: function() {
                    loading = false;
                    $('.page-loading').hide();
                    $(window).trigger('scroll');
                }
            });
        }
    });
}

// Recollapse pinned giveaways
if($(".pinned-giveaways__button").length>0)
{
    $(".pinned-giveaways__button").find("i").removeClass("fa-angle-down").addClass("fa-chevron-down");
    $(document).on("click",".pinned-giveaways__button",function () {
        $(this).show();
        var collapsed = $(this).attr("collapsed");
        if(collapsed == 1)
            $(".pinned-giveaways__inner-wrap").addClass("pinned-giveaways__inner-wrap--minimized");
        else
            $(".pinned-giveaways__inner-wrap").removeClass("pinned-giveaways__inner-wrap--minimized");
        $(".pinned-giveaways__inner-wrap").css("border-bottom-left-radius","0");
        $(".pinned-giveaways__inner-wrap").css("border-bottom-right-radius","0");
        $(this).attr("collapsed",collapsed=="1"?"0":"1");
        $(this).find(".fa").toggleClass("fa-chevron-down").toggleClass("fa-chevron-up");
    });
}

// Filter
$.fn.filter_ga = function() {
    if (path != "/")
        return $(this);
    return $(this).each(function() {
        var ga = $(this);
        if ($(ga).closest(".pinned-giveaways__outer-wrap").length !== 0)
            return;

        // Read some data
        var url = $(ga).find('.giveaway__heading__name').attr('href');
        var c = $(ga).find('.giveaway__heading__thin').text();
        var copies = 1,
            e = 0;
        if (c.indexOf('Copies') > -1) {
            copies = Number(c.substring(1, getPos(c, ' ', 1)).replace("(", "").replace("(", "").replace(",", ""));
        }

        var entered = $(ga).find('.giveaway__row-inner-wrap').hasClass('is-faded');
        e = $(ga).find('.giveaway__links').find('span:first').text().replace(/\,/g, '');
        e = e.substring(0, getPos(e, ' ', 1));
        var entries = Number(e);

        var chance = 0;
        if (entries <= 0)
            chance = 100;
        else
            chance = Math.round(copies / (entries + (entered?0:1)) * 10000) / 100;
        if (chance > 100)
            chance = 100;

        var req = Number($(ga).find(".giveaway__heading__thin:last").text().replace("(", "").replace(")", "").replace("P", ""));
        var has = Number($(".nav__points").text());
        var enough = req <= has ? true : false;

        var group = $(ga).find('.giveaway__column--group').length > 0 ? 1 : 0;
        var whitelist = $(ga).find('.giveaway__column--whitelist').length > 0 ? 1 : 0;
        var regionrestricted = $(ga).find('.giveaway__column--region-restricted').length > 0 ? 1 : 0;
        var communityvoted = $(ga).find('.giveaway__column--community-voted').length > 0 ? 1 : 0;
        var level = 0;
        if ($(ga).find(".giveaway__column--contributor-level").length !== 0)
            level = Number($(ga).find(".giveaway__column--contributor-level").text().replace("Level", "").replace("+", "").trim());

        $(window).trigger('scroll');
    });
};


// Giveaway function
$.fn.format_ga = function() {
    return $(this).each(function() {
        var ga = $(this);

        // Read some data
        var url = $(ga).find('.giveaway__heading__name').attr('href');
        var code = 0;
        if (url) code = url.substring(getPos(url, '/', 2) + 1, getPos(url, '/', 3));
        var c = $(ga).find('.giveaway__heading__thin').text();
        var copies = 1,
            e = 0;
        if (c.indexOf('Copies') > -1) {
            copies = Number(c.substring(1, getPos(c, ' ', 1)).replace("(", "").replace("(", "").replace(",", ""));
        }

        var entered = $(ga).find('.giveaway__row-inner-wrap').hasClass('is-faded');
        e = $(ga).find('.giveaway__links').find('span:first').text().replace(/\,/g, '');
        e = e.substring(0, getPos(e, ' ', 1));
        var entries = Number(e);

        if (entered)
            ga.addClass("entered-giveaway");

        var chance = 0;
        if (entries <= 0)
            chance = 100;
        else
            chance = Math.round(copies / (entries + (entered?0:1)) * 10000) / 100;
        if (chance > 100)
            chance = 100;

        var time = $(ga).find(".giveaway__columns").find("div:first");
        var active = (time.text().indexOf('ago') > -1) ? 0 : 1;
        var time2 = $(ga).find(".giveaway__column--width-fill span");
        var newga = (time2.text().indexOf('minute') > -1 || time.text().indexOf('second') > -1) ? 1 : 0;

        var req = Number($(ga).find(".giveaway__heading__thin:last").text().replace("(", "").replace(")", "").replace("P", ""));
        var has = Number($(".nav__points").text());
        var enough = req <= has ? true : false;
        var user = $(ga).find(".giveaway__username").text();

        var title=$(ga).find(".giveaway__heading__name").text();

        var pinned=$(ga).closest(".pinned-giveaways__outer-wrap").length!==0?1:0;

        // Enter/Remove button
        if ( active && user != username && title!="Invite Only" && $(ga).find('.giveaway__column--contributor-level--negative').length === 0) {
            $(ga).find('.giveaway__row-inner-wrap').removeClass('is-faded');
            $(ga).find(".giveaway__columns").append("<div><form>    \
                <input type=\"hidden\" name=\"xsrf_token\" value=\"" + xsrf + "\" />    \
                <input type=\"hidden\" name=\"do\" value=\"\" />    \
                <input type=\"hidden\" name=\"code\" value=\"" + code + "\" />  \
                <div data-do=\"entry_insert\" class=\"sidebar__entry-custom sidebar__entry-insert" + (!entered && enough ? "" : " is-hidden") + "\"><i class=\"fa fa-plus-circle\"></i> Enter</div> \
                <div data-do=\"entry_delete\" class=\"sidebar__entry-custom sidebar__entry-delete" + (entered ? "" : " is-hidden") + "\"><i class=\"fa fa-minus-circle\"></i> Remove</div>  \
                <div class=\"sidebar__entry-custom sidebar__entry-loading is-hidden\"><i class=\"fa fa-refresh fa-spin\"></i> Wait</div>    \
                <div class=\"sidebar__entry-custom sidebar__error " + (!enough && !entered ? "" : " is-hidden") + "\">" + (!enough && !entered ? "<i class=\"fa fa-exclamation-circle\"></i> Not enough points" : "") + "</div> \
                </form></div>");
        }

    });
};

setTimeout(function () {  $(window).trigger('scroll'); }, 200);

// Format giveaways (on load)
$('.giveaway__row-outer-wrap').format_ga();


// Enter/Remove Button click
function update_gas(p) {
    if (p == -1)
        p = Number($(".nav__points").text());
    $('.giveaway__row-outer-wrap').each(function() {
        if(!$(this).find(".sidebar__error").hasClass("is-hidden")&&$(this).find(".sidebar__error").text()!=" Not enough points") return;
        var req = Number($(this).find(".giveaway__heading__thin:last").text().replace("(", "").replace(")", "").replace("P", ""));
        var entered = !$(this).find(".sidebar__entry-delete").hasClass('is-hidden');
        if (req > p && !entered) {
            $(this).find(".sidebar__entry-delete").addClass("is-hidden");
            $(this).find(".sidebar__entry-insert").addClass("is-hidden");
            $(this).find(".sidebar__entry-loading").addClass("is-hidden");
            $(this).find(".sidebar__error").removeClass("is-hidden").html('<i class="fa fa-exclamation-circle"></i> Not enough points');
        } else if (entered) {
            $(this).addClass("entered-giveaway");
            $(this).find(".sidebar__entry-delete").removeClass("is-hidden");
            $(this).find(".sidebar__entry-insert").addClass("is-hidden");
            $(this).find(".sidebar__entry-loading").addClass("is-hidden");
            $(this).find(".sidebar__error").addClass("is-hidden");
        } else {
            $(this).removeClass("entered-giveaway");
            $(this).find(".sidebar__entry-delete").addClass("is-hidden");
            $(this).find(".sidebar__entry-insert").removeClass("is-hidden");
            $(this).find(".sidebar__entry-loading").addClass("is-hidden");
            $(this).find(".sidebar__error").addClass("is-hidden");
        }
    });
}

setTimeout(function() {
    if (path.match('^/giveaway/')) return;
    $(".sidebar__entry-insert, .sidebar__entry-delete").unbind("click");
    $(document).on('click', '.sidebar__entry-insert:not(.enterall), .sidebar__entry-delete', function() {
        var t = $(this);
        t.addClass("is-hidden");
        t.closest("form").find(".sidebar__entry-loading").removeClass("is-hidden");
        t.closest("form").find("input[name=do]").val(t.attr("data-do"));
        $.ajax({
            url: "/ajax.php",
            type: "POST",
            dataType: "json",
            data: t.closest("form").serialize(),
            success: function(e) {
                t.closest("form").find(".sidebar__entry-loading").addClass("is-hidden");
                if("success" === e.type)
                {
                    if(t.hasClass("sidebar__entry-insert"))t.closest("form").find(".sidebar__entry-delete").removeClass("is-hidden");
                    else if(t.hasClass("sidebar__entry-delete")) t.closest("form").find(".sidebar__entry-insert").removeClass("is-hidden");
                } else if("error" === e.type) t.closest("form").find(".sidebar__error").removeClass("is-hidden").html("undefined" != typeof e.link && e.link !== 0 ? '<a href="' + e.link + '"><i class="fa fa-exclamation-circle"></i> ' + e.msg + "</a>" : '<i class="fa fa-exclamation-circle"></i> ' + e.msg);
                $(".live__entry-count").text(e.entry_count);
                $(".nav__points").text(e.points);
                var pinned=$(t).closest(".pinned-giveaways__outer-wrap").length!==0?1:0;
                update_gas(e.points);
            }
        });
    });
}, 10);

//Scroll to top
$("body").prepend("<div class=\"scroll-top form__submit-button\">&gt;</div>");
$(".scroll-top").hide();
$(".scroll-top").click(function() {
    $('html, body').animate({
        scrollTop: 0
    }, 'fast');
});
var state = 0;
$(window).scroll(function() {
    var st = $(window).scrollTop();
    if (st > 500 && !state) {
        $(".scroll-top").fadeIn("fast");
        state = 1;
    } else if (st <= 500 && state) {
        $(".scroll-top").fadeOut("fast");
        state = 0;
    }
});

// Hide entered
let checkbox = document.createElement('input');
checkbox.type = "checkbox";
checkbox.id = "hide-entered";
checkbox.style = "width: initial"
checkbox.checked = true;
checkbox.onclick = function() {
    if (this.checked) {
        GM_addStyle(` .entered-giveaway { display: none } `);
    } else {
        GM_addStyle(` .entered-giveaway { display: initial } `);
    }
}
GM_addStyle(` .entered-giveaway { display: none } `);

let button_div = document.createElement('div');
button_div.style = "display: inline-flex; position: sticky; top:15px";
button_div.appendChild(checkbox);
$(button_div).append('<label for="hide-entered" class="sidebar__navigation__item__name" style="padding-left: 5px">Hide entered</label>');

$(".sidebar__navigation:last").after(button_div);
