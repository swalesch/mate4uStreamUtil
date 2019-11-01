// ==UserScript==
// @name         99dmgActions
// @namespace    http://tampermonkey.net/
// @version      0.4
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
            image: 'https://lh6.googleusercontent.com/qBzEuMdPHw-8fapEd97NNjEH4osfZEYf27R8djPxQiCsgLP8OYtNsThJ_XyyqeyKyEuTQyD3mvsFn6jRjvox=w1920-h969'},
         {
             name: 'de_inferno',
             image: 'https://lh3.googleusercontent.com/tYprhlwObnTyr38VpYkdX3-cSdQKbEYbLjz_12sTVtY8M0P9zQietDQ4h8sTqhGDx38jmuNIkpYzkPL83Vk5=w1920-h969'},
         {
             name: 'de_mirage',
             image: 'https://lh3.googleusercontent.com/-XX60dGrcPkPzkSuZBlC-xp-t9Wii4WKU8usjhujJAdz05-7hblDNQ-xnvxLEqDKJA7TYG7IvYq-p8D_ZRMC=w1920-h969'},
         {
             name: 'de_nuke',
             image: 'https://lh4.googleusercontent.com/WtpWTBUDsKfzoM_Q-jnHjpk716_9FjPuulJxyMgZ-R4alAqePhANdGdVvAx0bLaZoM2ENLA_SqGdAwlP1j8L=w1920-h969'},
         {
             name: 'de_overpass',
             image: 'https://lh4.googleusercontent.com/doUu0Lf7V4KnKVNPejAOBN9m3X0G2rFTJepjkancNmRPNS7wrkGME8hI0QyLJStTZnKcDhZT1cWHeV0Xuav2=w1920-h969'},
         {
             name: 'de_train',
             image: 'https://lh3.googleusercontent.com/YJE-UbGgvL_ivxeTczBRpY-QlTozsS9dwWLNFL3LjHJl0XL7A-aSknJtcESdWYcezP5ugfwORo_R-Kv2ge7d=w1920-h969'},
         {
             name: 'de_vertigo',
             image: 'https://lh4.googleusercontent.com/c81bvQnTiHKEjk8IV_hlB84WlzhYfXMDFxEv-RcJwKYsCtO5YPjWZgq7MOBx_wgDk1-ZABM4t7el6fFQylgK=w1920-h969'},
         {
             name: 'de_cache',
             image: 'https://lh4.googleusercontent.com/3EY3ai3NjHh2TAYiUBirZ78U_JFqTE3gQpJXo2yt-hT7y9jmAIW-MkfgfkHIOc560iUPsw4PGOyC5kChUbdv=w1920-h969'},
         {
             name: 'de_cbble',
             image: 'https://lh5.googleusercontent.com/3cTybs0deKxc9-ITwIl38hslDoTQ82NVJgxP_Duij_Ik7FuKBpAlD0oCHBllc-bfZeNYAjAIbQPy10R75br3=w1920-h969'}];

})();
