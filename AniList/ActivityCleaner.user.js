// ==UserScript==
// @name         AniList: Activity Cleaner
// @description  Automatically deletes all new list activity entries from your profile
// @version      1.0.1
// @author       Jorengarenar
// @namespace    https://joren.ga
// @run-at       document-start
// @match        https://anilist.co/*
// @grant        GM_getValue
// @grant        GM_setValue
// ==/UserScript==

"use strict";

if (!window.localStorage.auth) { return; }

const userId = JSON.parse(window.localStorage.auth).id;

if (window.Date.now() > (GM_getValue("jwt")?.expires || 0)) {
  if (window.location.pathname.indexOf("home") === 1) {
    if (window.location.hash.length === 0) {
      window.location.replace("https://anilist.co/api/v2/oauth/authorize?client_id=6628&response_type=token");
    } else {
      let urlSearch = new URLSearchParams(window.location.hash.substring(1));
      window.history.replaceState({}, document.title, "/home");
      GM_setValue("jwt", {
        token: urlSearch.get("access_token"),
        expires: Date.now() + urlSearch.get("expires_in"),
      });
    }
  } else {
    window.onload = () => {
      let warning = document.createElement("span");
      warning.innerHTML = "<b>[Activity Cleaner]</b><br>Access token expired<br>Visit <i>Home</i> and refresh page";
      warning.style = "color: red; text-align: right; position: absolute; top: 10px; right: 10px;";
      document.querySelector("#nav").append(warning);
    }
  }
}

const accessToken = GM_getValue("jwt")?.token;
if (!accessToken) {
  console.error("Was not able to find access token");
  return;
}

const url = "https://graphql.anilist.co";
const handleResponse = (response) => response.json().then((json) => response.ok ? json : Promise.reject(json));

const headers = {
  "Authorization": "Bearer " + accessToken,
  "Content-Type": "application/json",
  "Accept": "application/json",
};

function deleteActivities(json) {
  let query = "mutation {\n";
  json.data.Page.activities.forEach((activity) => {
    query += `del${activity.id} : DeleteActivity (id: ${activity.id}) { deleted }\n`;
  });
  query += "}";

  if (query.length === 12) { return; }

  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ query: query })
  }).then(handleResponse).catch(console.error);
}

function start() { // get IDs of activities then delete them
  fetch(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify({
      query: `query {
                Page (page: 0, perPage: 10) {
                  activities (userId: ${userId}, type: MEDIA_LIST) {
                    ... on ListActivity { id }
                  }
                }
              }`
    })
  }).then(handleResponse).then(deleteActivities).catch(console.error);
}

document.addEventListener("click", (el) => {
  let cl = el.target.className;
  if (cl === "plus-progress" || cl === "save-btn") { start(); }
});

document.addEventListener("click", (el) => {
  if (el.target.textContent === "Set as Planning") { window.setTimeout(start, 500); }
}, true);
