// ==UserScript==
// @name         ESLActions
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Show only the Map Vote
// @author       Hive
// @match        https://liga.esl-meisterschaft.de/leagues/matches/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=esl-meisterschaft.de
// @grant        none
// ==/UserScript==

(function() {
    'use strict';//league-match-draft-content

    var li = document.createElement('li');
    li.setAttribute("class", "");
    li.append(createStreamLink());
    li.append(createActions());
    var elements = document.getElementById('container').getElementsByTagName('ul')[0].getElementsByTagName('li').length;
    var list = document.getElementById('container').getElementsByTagName('ul')[0];
    list.insertBefore(li, list.children[elements-2]);


    function createStreamLink(){
        var span = document.createElement('span');
        span.innerHTML = "Stream";
        var div = document.createElement('div');
        div.setAttribute("class", "a");
        div.append(span);
        return div;
    }

    function createActions(){
        var aVote = document.createElement('a');
        aVote.addEventListener("click", activateSkript)
        aVote.innerHTML = "MapVote";
        var li = document.createElement('li')
        li.append(aVote);
        var ul = document.createElement('ul')
        ul.append(li);
        return ul;
    }

    function activateSkript(){
        document.body.childNodes.forEach((item) => {
            if(item.style != undefined) {
                item.style.display = 'none';
            }
        });
        document.body.style.background = "#00ff00 no-repeat right top";

        if(document.getElementById('league-match-draft-content')!=null){
             moveAndShowVote();
        }
     }

    function moveAndShowVote(){
        var mapvote = document.getElementById('league-match-draft-content');
        document.body.append(mapvote);
        document.body.setAttribute("class", "a");
        document.body.lastChild.style.display = 'block';
        mapvote.style.marginTop = "100px";
        mapvote.style.marginBottom = "300px";
        document.window.onbeforeunload = function() {
                    return "Dude, are you sure you want to leave? Think of the kittens!";
                }
    }

})();
