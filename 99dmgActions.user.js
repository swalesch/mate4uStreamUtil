// ==UserScript==
// @name         99dmgActions
// @namespace    http://tampermonkey.net/
// @version      0.6
// @description  Show only the Map Vote on a 99dmg match site.
// @author       Hive
// @match        https://csgo.99damage.de/de/leagues/matches/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle ( `
.line1 {
width: 260px;
height: 100px;
border-bottom: 4px solid red;
-webkit-transform: translateX(10px) translateY(10px) rotate(45deg);
position: absolute;
}
.line2 {
width: 260px;
height: 100px;
border-bottom: 4px solid red;
-webkit-transform: translateX(-70px) translateY(10px)rotate(-45deg);
position: absolute;
}
.strich1 {
width: 40px;
height: 101px;
border-bottom: 6px solid blue;
-webkit-transform: translateX(94px) translateY(26px)rotate(45deg);
position: absolute;
}
.strich2 {
width: 80px;
height: 101px;
border-bottom: 6px solid blue;
-webkit-transform: translateX(43px) translateY(14px) rotate(-45deg);
position: absolute;
}
`);

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
        Array.prototype.slice.call(caller.path[3].getElementsByTagName("li")).forEach((item) => {
            item.classList.remove('active');
        })
        caller.path[2].classList.add('active');
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
                item.style.display = 'none'};
        });
        document.body.style.background = "#00ff00 no-repeat right top";

        if(document.getElementById('mapvote')==null || document.getElementsByClassName('mapvote-maps-done').length == 0){
            var intervalChangeHeader = setInterval(() => {
                console.log("look for header");
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote-d-info') != null){
                    var infoText = document.getElementById('mapvote-d-info'); //größer fett und weiß
                    infoText.style.color = "#fff";
                    infoText.style.fontSize = "20px";
                    infoText.style.fontWeight = "bold";

                    document.getElementById('mapvote-d-timer').style.color = "#fff"; // weiß

                    Array.prototype.slice.call(document.getElementById('mapvote').getElementsByClassName('mapvote-head-team')).forEach((item) => {
                        item.style.display = 'none';
                    });
                    clearInterval(intervalChangeHeader);
                }
            },100);

            var intervalAfterVote = setInterval(() => {
                console.log("look for vote end");
                if(document.getElementById('mapvote')!=null && document.getElementsByClassName('mapvote-maps-done').length != 0){
                    changeImage();
                    clearInterval(intervalAfterVote);
                }
            }, 100);

            var intervalChangeImage = setInterval(() => {
                console.log("look for vote");
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote').getElementsByTagName('ul').length != 0){
                    moveAndShowVote();
                    changeImage();
                    clearInterval(intervalChangeImage);
                }
            }, 100);

            var intervalBanned = setInterval(() => {
                console.log("look for banned");
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote').getElementsByClassName('banned').length != 0){
                    Array.prototype.slice.call(document.getElementById('mapvote').getElementsByClassName('banned')).forEach((item) => {
                        item.style.opacity = "1";
                        item.innerHTML = '<div class="line1"></div><div class="line2"></div>'
                    });
                }
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote').getElementsByClassName('picked').length != 0){
                    Array.prototype.slice.call(document.getElementById('mapvote').getElementsByClassName('picked')).forEach((item) => {
                        item.style.opacity = "1";
                        item.innerHTML = '<div class="strich1"></div><div class="strich2"></div>'
                    });
                }
                if(document.getElementsByClassName('mapvote-maps-done').length != 0){
                    clearInterval(intervalBanned);
                }
            }, 100);

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

        Array.prototype.slice.call(mapvote.getElementsByTagName('li')).forEach((item) => {
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
