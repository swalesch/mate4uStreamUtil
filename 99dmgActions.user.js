// ==UserScript==
// @name         99dmgActions
// @namespace    http://tampermonkey.net/
// @version      0.5
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
        document.body.childNodes.forEach(function(item){
            if(item.style != undefined) {
                item.style.display = 'none'};
        });
        document.body.style.background = "#00ff00 no-repeat right top";

        if(document.getElementById('mapvote')==null){
            var interval = setInterval(() => {
                console.log("look for vote");
                if(document.getElementById('mapvote')!=null){
                    moveAndShowVote();
                    changeImage();
                    clearInterval(interval);
                }
            }, 3000);
        }else{
            moveAndShowVote();
            changeImage();
        }
    }

    function moveAndShowVote(){
        var mapvote = document.getElementById('mapvote');
        document.body.append(mapvote);
        document.body.lastChild.style.display = 'block';
    }

    function changeImage(){
        var mapvote = document.getElementById('mapvote');

        Array.prototype.slice.call(mapvote.getElementsByTagName('li')).forEach(
            function(item){
                if(item.innerHTML!=undefined){
                    var mapItem = findObjectByAttribute(maps,'name',item.innerHTML);
                    item.style.backgroundImage = "url("+mapItem.image+")";
                    item.style.backgroundSize = mapItem.size;
                    item.style.width = "200px";
                    item.style.height = "200px";
                    item.style.border = "none";
                    item.innerHTML = "";
                }
            });
    }

    function findObjectByAttribute (items, attribute, value) {
        for (var i = 0; i < items.length; i++) {
            if (items[i][attribute] === value) {
                return items[i];
            }
        }
        return null;
    }

    var maps =
        [{
            name: 'de_dust2',
            image: 'https://www.csgodatabase.com/images/pins/Dust_II_Pin.png',
            size:"200px 200px"},
         {
             name: 'de_inferno',
             image: 'https://www.csgodatabase.com/images/pins/Inferno_Pin.png',
             size:"200px 200px"},

         {
             name: 'de_mirage',
             image: 'https://www.csgodatabase.com/images/pins/Mirage_Pin.png',
             size:"200px 200px"},
         {
             name: 'de_nuke',
             image: 'https://www.csgodatabase.com/images/pins/Nuke_Pin.png',
             size:"200px 200px"},
         {
             name: 'de_overpass',
             image: 'https://www.csgodatabase.com/images/pins/Overpass_Pin.png',
             size:"200px 200px"},
         {
             name: 'de_train',
             image: 'https://www.csgodatabase.com/images/pins/Train_Pin.png',
             size:"200px 200px"},
         {
             name: 'de_vertigo',
             image: 'https://www.csgodatabase.com/images/collections/Vertigo.png',
             size:"200px 182px"},
         {
             name: 'de_cache',
             image: 'https://www.csgodatabase.com/images/pins/Cache_Pin.png',
             size:"200px 200px"},
         {
             name: 'de_cbble',
             image: 'https://www.csgodatabase.com/images/pins/Cobblestone_Pin.png',
             size:"200px 200px"}];

})();
