const game_client={
    result:'',
    isPlay:false,
    time:3,
    case_1:false,
    case_2:false,
    data_live:[],
    

    initApp(){
        game_client.setResult();
        game_client.data_live=list_phone;
        $("#phonenumber").prop("checked", true);
    },

    random_one(){
        $("#phonenumber").prop("checked", true);
        $("#one_to_hundred").prop("checked", false);
        game_client.data_live=list_phone;
    },

    random_two(){
        $("#phonenumber").prop("checked", false);
        $("#one_to_hundred").prop("checked", true);
        game_client.data_live=list_number;
    },

    changeSpeed(){
        var e = document.getElementById("slTocDo2");
        game_client.time = e.value;
    },

    getArrayInfo(){
        var e = document.getElementById("txtareadayso");
        var list_phone=e.value.split(',')
        game_client.lucky(e.value.split(','))
    },

    lucky(list){
        if(!game_client.isPlay){
            game_client.isPlay=true;
            var inter=setInterval(()=>{
                const random = Math.floor(Math.random() * list.length);
                game_client.result=list[random];
                game_client.setResult();
            },100)
            setTimeout(() => {
                clearInterval(inter)
                game_client.isPlay=false;
                game_client.result=list[random];
            }, game_client.time*1000);
        }
    },

    setResult(){
        var a =document.getElementById('loadingnha')
        a.innerHTML=this.result;
    },

    randomPhone_Test(){
        game_client.getArrayInfo();
    },

    randomPhone_Live(){
        game_client.lucky(game_client.data_live)
    }

}

$(document).ready(function(){
	'use strict';
    game_client.initApp();
});