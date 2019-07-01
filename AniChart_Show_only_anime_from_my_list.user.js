// ==UserScript==
// @name         AniChart - Show only anime from my list
// @description  Hide anime which isn't on your AniList watching/planning list
// @author       Jorengarenar
// @homepageURL  https://joren.ga
// @version      0.3
// @run-at       document-end
// @include      anichart.net
// @include      /https?:\/\/anichart\.net\/(Spring|Summer|Fall|Winter)-\d{4}/
// @grant        GM_xmlhttpRequest
// ==/UserScript==

var myUserName = "Jorengarenar";

var query = `
query ListView($userName: String!, $statuses: [MediaListStatus!] = [CURRENT PLANNING]) {
  listCollection: MediaListCollection(userName: $userName, type: ANIME, forceSingleCompletedList: true, status_in: $statuses) {
    lists {
      entries {
        anime: media {
          id
        }
      }
    }
  }
}
`;

var variables = {
    userName: myUserName
};

// Define the config we'll need for our Api request
var url = 'https://graphql.anilist.co',
    options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        body: JSON.stringify({
            query: query,
            variables: variables
        })
    };


// Make the HTTP Api request
fetch(url, options).then(handleResponse)
    .then(handleData)
    .catch(handleError);

function handleResponse(response) {
    return response.json().then(function(json) {
        return response.ok ? json : Promise.reject(json);
    });
}

var myAnimeIDs = [];

function handleData(data) {
    for (let status of data.data.listCollection.lists) {
        for (let anime of status.entries) {
            let id = anime.anime.id;
            myAnimeIDs.push(id);
        }
    }
}

function handleError(error) {
    alert('Error, check console');
    console.error(error);
}

function removeUnlisted() {
    let animeCards = document.querySelectorAll('div.media-card')

    for (let card of animeCards) {
        let link = card.querySelector('a.title');
        let id = link.href.match(/\/(\d+)\//)[1];
        if (!myAnimeIDs.includes(parseInt(id))) {
            card.style = "display: none";
        }
    }
}

const config = {
    childList: true,
    subtree: true
};

const observer = new MutationObserver(removeUnlisted);

removeUnlisted();

observer.observe(document.body, config);
