// ==UserScript==
// @name         99dmgActions
// @namespace    http://tampermonkey.net/
// @version      0.12
// @description  Show only the Map Vote on a 99dmg match site.
// @author       Hive
// @match        https://csgo.99damage.de/de/leagues/matches/*
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';
    GM_addStyle ( `
.grey {
-webkit-animation:greyFrames normal forwards ease-in-out;
-webkit-animation-duration: 8s;
}

@-webkit-keyframes greyFrames {

0%  {
-webkit-filter: grayscale(0%);
}

49.999% {
background-position: left;
}

50% {
-webkit-filter: grayscale(100%);
background-position: center;
}

100%  {
-webkit-filter: grayscale(0%);
background-position: center;
}
}`);

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
                item.style.display = 'none';
            }
        });
        document.body.style.background = "#00ff00 no-repeat right top";
        var doOnce=0;
        if(document.getElementById('mapvote')==null || document.getElementsByClassName('mapvote-maps-done').length == 0){
            var intervalChangeHeader = setInterval(() => {
                console.log("look for header");
                if(document.getElementById('mapvote')!=null && document.getElementsByClassName('mapvote-head-status').length != 0){
                    var infoText = document.getElementById('mapvote-d-info');
                    if(infoText != null){
                        infoText.style.color = "#fff";
                        infoText.style.fontSize = "20px";
                        infoText.style.fontWeight = "bold";
                    }
                    var timer = document.getElementById('mapvote-d-timer');
                    if(timer !=null){
                        timer.style.color = "#fff";
                    }
                    document.getElementById('mapvote-d-team1').style.display = 'none';
                    document.getElementById('mapvote-d-team2').style.display = 'none';

                    if(doOnce == 0){
                        doOnce=1;
                        moveAndShowVote();
                    }
                }

                if(document.getElementById('mapvote')!=null && document.getElementsByClassName('mapvote-maps-done').length != 0){
                    clearInterval(intervalChangeHeader);
                }
            },50);

            var intervalAfterVote = setInterval(() => {
                console.log("look for vote end");
                if(document.getElementById('mapvote')!=null && document.getElementsByClassName('mapvote-maps-done').length != 0){
                    changeImage();
                    changeFinalOrder()
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
                console.log("look for banned and picked");
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote').getElementsByClassName('banned').length != 0){
                    Array.prototype.slice.call(document.getElementById('mapvote').getElementsByClassName('banned')).forEach((item) => {
                        if(!item.classList.contains("grey")){
                            item.classList.add("grey");
                        }
                    });
                }
                if(document.getElementById('mapvote')!=null && document.getElementById('mapvote').getElementsByClassName('picked').length != 0){
                    Array.prototype.slice.call(document.getElementById('mapvote').getElementsByClassName('picked')).forEach((item) => {
                        item.style.opacity = "1";
                        item.style.backgroundPosition = "right"
                    });
                }
                if(document.getElementsByClassName('mapvote-maps-done').length != 0){
                    clearInterval(intervalBanned);
                }
            }, 100);

        }else{
            moveAndShowVote();
            changeImage();
            changeFinalOrder()
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
                item.style.backgroundPosition = "left"
                item.style.width = "200px";
                item.style.height = "200px";
                item.style.border = "none";
                item.style.opacity = "1";
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

    function changeFinalOrder(){
        var mapvote = document.getElementById('mapvote');
        mapvote.getElementsByTagName('li')[1].style.float = "left"
        mapvote.getElementsByTagName('li')[1].style.marginLeft = "5px"
        mapvote.getElementsByTagName('li')[0].style.float = "right"
        mapvote.getElementsByTagName('li')[0].style.marginRight = "5px"
    }

    //tripple image needed, each same size; left normal, center banned, right pick
    var maps =
        [{
            name: 'de_dust2',
            image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/d2.png',
            size: "600px 200px"},
         {
             name: 'de_inferno',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/infe.png',
             size: "600px 200px"},
         {
             name: 'de_mirage',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/mirage.png',
             size: "600px 200px"},
         {
             name: 'de_nuke',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/nuke.png',
             size: "600px 200px"},
         {
             name: 'de_overpass',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/over.png',
             size: "600px 200px"},
         {
             name: 'de_train',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/train.png',
             size: "600px 200px"},
         {
             name: 'de_vertigo',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/vertigo.png',
             size: "600px 182px"},
         {
             name: 'de_cache',
             image: 'https://dieherrschaft.de/files/99DMG-Vote-Maps/1.1/cache.png',
             size: "600px 200px"},
         {
             name: 'de_cbble',
             image: 'https://www.csgodatabase.com/images/pins/Cobblestone_Pin.png',
             size: "600px 200px"}];

})();
