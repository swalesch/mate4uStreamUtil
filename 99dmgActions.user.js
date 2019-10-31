// ==UserScript==
// @name         99dmgActions
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Show only the Map Vote on a 99dmg match site.
// @author       Hive
// @match        https://csgo.99damage.de/de/leagues/matches/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    var li = document.createElement('li');
    li.setAttribute("class", "");
    li.append(createStreamLink());
    li.append(createActions());
    document.getElementById('nav').append(li);

    function createStreamLink(){
        var span = document.createElement('span');
        span.innerHTML = "Stream";
        var a = document.createElement('a');
        a.append(span);
        a.addEventListener("click", toggleActive)
        return a;
    }

    function toggleActive(caller){
        Array.prototype.slice.call(caller.path[3].getElementsByTagName("li")).forEach(
            function(item){
            item.classList.remove('active');
            })

        caller.path[2].classList.add('active');
    }

    function createActions(){
        var aVote = document.createElement('a');
        aVote.addEventListener("click", hideAll)
        aVote.innerHTML = "MapVote";
        var li = document.createElement('li')
        li.append(aVote);
        var ul = document.createElement('ul')
        ul.append(li);
        return ul;
    }

    function hideAll(){
        var mapvote = document.getElementById('mapvote');

        document.body.append(mapvote);
        document.body.childNodes.forEach(function(item){
            if(item.style != undefined) {
                item.style.display = 'none'};
        });

        document.body.lastChild.style.display = 'block';
        document.body.style.background = "#008000 no-repeat right top";
    }
})();
