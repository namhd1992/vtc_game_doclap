const game_client={
    var result='',
    var isPlay='',
    var time=3,
    initApp(){
        var a =document.getElementById('txtareadayso')
        console.log(a)
    },

    changeSpeed(){
        var e = document.getElementById("slTocDo2");
        time = e.value;
        console.log(time)
    },

    getArrayInfo(){
        var e = document.getElementById("txtareadayso");
        time = e.value;
    },

    randomPhone_Test(){
        game_client.getArrayInfo();
    },

    randomPhone_Live(){

    }

}

$(document).ready(function(){
	'use strict';
    game_client.initApp();
});