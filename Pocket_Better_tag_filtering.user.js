// ==UserScript==
// @name         Pocket - Better tag filtering
// @description  DEPRECATED | Shows tags toward the top that you can select to filter the list of links. Click tag to show only links that contain that tag; shift-click tag to hide links that contain it.
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      1.1.3
// @include      http*://getpocket.com/*
// @grant        none
// ==/UserScript==

const onLoad = cb => /interactive|complete/.test(document.readyState) ? setTimeout(cb, 0) : document.addEventListener('DOMContentLoaded', cb);
const sel = document.querySelector.bind(document);
const selAll = document.querySelectorAll.bind(document);
const makeEl = (tag, attrs, ...children) => {
    const el = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(attr => el.setAttribute(attr, attrs[attr]));
    children.map(obj => typeof obj === 'string' ? document.createTextNode(obj) : obj)
        .forEach(node => el.appendChild(node));
    return el;
};
const eq = a => b => b === a;
const not = f => (...args) => !f(...args);
const has = a => list => list.includes(a);
const isIn = list => obj => list.some(a => a === obj);
const toggle = a => list => has(a)(list) ? list.filter(not(eq(a))) : list.concat([a]);
const without = a => list => list.filter(b => b !== a);
const tap = f => (...args) => { f(...args); return args[0] };
const log = tap(console.log);
const onChanged = (el, cb) => {
    const observer = new MutationObserver(cb);
    observer.observe(el, { childList: true });
    return observer.disconnect.bind(observer);
};

const styles = `
.tf-tag-list {
display: block;
text-align: left;
padding-bottom: 0.5em;
padding-left: 10px;
font-size: 12pt;
line-height: 1.6;
min-width: 100%;
max-height: 70%;
overflow-y: auto;
}

.tf-tag {
margin-right: 0.2em;
margin-bottom: 0.2em;
background-color: gray;
padding: 0 0.3em;
white-space: nowrap;
border-radius: 0.2em;
cursor: pointer;
-moz-user-select: none;
-ms-user-select: none;
-webkit-user-select: none;
user-select: none;
color: white;
text-overflow: ellipsis;
overflow: hidden;
}

.tf-tag.tf-selected {
background-color: red;
color: white;
}

.tf-tag.tf-exclude {
color: silver;
}

.tf-tag.tf-hidden {
color: silver;
}

.item.tf-hidden {
display: none;
}

li[val='all'], li[val='untagged'] {
display: none;
}
`;


onLoad(() => {

    sel('head').appendChild(makeEl('style', null, styles));

    sel('.nav-default .filter-tags').click();
    setTimeout(() => sel('.side-nav').click(), 5);

    const checkTagsLoaded = () => {
        const tagsLoaded = !!sel('#pagenav_tagfilter .popover-new-list > li.editdelete');
        if (tagsLoaded) init();
    };
    const initted = onChanged(sel('#pagenav_tagfilter .popover-new-list'), checkTagsLoaded);
    checkTagsLoaded();

    const init = () => {
        initted();
        let tagsSelected = [];
        const storageTagsHidden = localStorage.getItem('tagsHidden');

        let tagsHidden = storageTagsHidden ? storageTagsHidden.split('\t') : [];
        const tagClicked = (tag, positive) => {
            if (positive) {
                tagsHidden = without(tag)(tagsHidden);
                tagsSelected = toggle(tag)(tagsSelected);
            } else {
                tagsSelected = without(tag)(tagsSelected);
                tagsHidden = toggle(tag)(tagsHidden);
            }
            localStorage.setItem('tagsHidden', tagsHidden.join('\t'));
            updateView();
        };

        const updateView = () => {
            const items = Array.from(selAll('#queue > .item'));
            items.forEach(el => el.classList.remove('tf-hidden'));
            items.filter(el => !hasAllTags(tagsSelected)(el) || hasAnyTags(tagsHidden)(el)).forEach(el => el.classList.add('tf-hidden'));
            Array.from(selAll('.tf-tag')).forEach(el => { el.classList.remove('tf-selected'); el.classList.remove('tf-hidden') });
            tagsSelected.forEach(t => sel(`.tf-tag[data-tag="${ t }"]`).classList.add('tf-selected'));
            tagsHidden.forEach(t => sel(`.tf-tag[data-tag="${ t }"]`).classList.add('tf-hidden'));
            document.dispatchEvent(new Event('scroll'));
        };

        const elTags = el => Array.from(el.querySelectorAll('.tag')).map(el => el.textContent);
        const elHasTag = el => tag => elTags(el).some(t => t === tag);
        const hasAllTags = tags => el => without('untagged')(tags).every(elHasTag(el)) && (!has('untagged')(tags) || elTags(el).length === 0);
        const hasAnyTags = tags => el => without('untagged')(tags).some(elHasTag(el))  || ( has('untagged')(tags) && elTags(el).length === 0);

        var tags =
            Array.from(selAll('#pagenav_tagfilter .popover-new-list > li'))
        .map(el => el.getAttribute('val'))
        .filter(not(isIn(['all', 'edit'])));

        for (let i=0; i<tags.length; ++i) {
            tags[i] = decodeURIComponent(tags[i]);
        }

        const tagEls =
              tags
        .map(tag => {
            const el = makeEl('div', { 'class': 'tf-tag', 'data-tag': tag, 'title': tag}, tag);
            el.addEventListener('click', e => tagClicked(tag, !e.shiftKey));
            return el;
        });

        const tagListEl =
              makeEl('div', { 'class': 'tf-tag-list', 'title': 'Shift+click to hide' },
                     ...tagEls);
        sel('.side-nav').append(tagListEl);
        updateView();

        onChanged(sel('#queue'), updateView);
    };
});

/*
window.setTimeout(function(){
    $('.tf-tag').click(function(e){
        if (e.shiftKey) {
            if ($(this).hasClass('tf-exclude')) {
                $(this).removeClass('tf-exclude');
            } else {
                $(this).addClass('tf-exclude');
            }
        } else {
            $(this).removeClass('tf-exclude');
        }
    });
}, 1000);
*/

window.setTimeout(function(){
    $('.tf-hidden').click();
    $('.tf-selected').click();
}, 1000);


$('.pocket_logo, .section-mylist').click(function() {
    // $('.tf-exclude').click();
    $('.tf-hidden').click();
    $('.tf-selected').click();
});

window.setTimeout(function(){
    let number = document.getElementsByClassName('tf-tag').length - 1;
    $('.filter-tags').text("Tags (" + number + ")");
}, 1500);

// vi: set filetype=javascript:
