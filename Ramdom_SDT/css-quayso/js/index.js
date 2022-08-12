const game_client={
    result:'',
    isPlay:false,
    time:5,
    win:'',
    fake:[],
    is_phone:true,

    initApp(){
        game_client.setResult();
        // game_client.win=win_phone;
        game_client.fake=fake_phone;
        game_client.is_phone=true;
        $("#phonenumber").prop("checked", true);
        game_client.resetInput();
        game_client.resetResult();
    },

    random_one(){
        $("#phonenumber").prop("checked", true);
        $("#one_to_hundred").prop("checked", false);
        game_client.resetInput();
        game_client.resetResult();
        // game_client.win=win_phone;
        game_client.is_phone=true;
        game_client.fake=fake_phone;
    },

    random_two(){
        $("#phonenumber").prop("checked", false);
        $("#one_to_hundred").prop("checked", true);
        game_client.resetInput();
        game_client.resetResult();
        // game_client.win=win_number;
        game_client.is_phone=false;
        game_client.fake=fake_number;
    },

    changeSpeed(){
        var e = document.getElementById("slTocDo2");
        game_client.time = e.value;
    },

    getArrayInfo(key){
        var e = document.getElementById("txtareadayso");
        var list_item=e.value.split('\n');
        if(list_item.length>1){
            game_client.lucky(list_item, key)
        }else{
            alert('Bạn chưa nhập dữ liệu!')
        }
        
    },

    lucky(list, key){
        if(!game_client.isPlay){
            game_client.isPlay=true;
            var random=0;
            var inter=setInterval(()=>{
                random= Math.floor(Math.random() * list.length);
                game_client.result=list[random];
                game_client.setResult();
            },100)
            setTimeout(() => {
                clearInterval(inter)
                game_client.isPlay=false;
                if(key=='live'){
                    game_client.result=game_client.random_fake();
                    game_client.setResult();
                }

                if(game_client.is_phone){
                    $('#popup-sdt').fadeIn();
                }else{
                    $('#popup-smm').fadeIn();
                }
            }, game_client.time*1000);
        }
    },

    resetInput(){
        var e = document.getElementById("txtareadayso");
        e.value='';
    },

    resetResult(){
        var e = document.getElementById("loadingnha");
        e.innerHTML='';
    },

    random_fake(){
        var random= Math.floor(Math.random() * game_client.fake.length);
        var result=game_client.fake[random];
        game_client.fake= game_client.fake.filter(item => item!==game_client.fake[random]);
        return result;
    },

    setResult(){
        var a =document.getElementById('loadingnha')
        a.innerHTML=this.result;
        if(game_client.is_phone){
            var pop =document.getElementById('result_popup_phone')
            pop.innerHTML=this.result;
        }else{
            var pop =document.getElementById('result_popup_number')
            pop.innerHTML=this.result;
        }
      
    },

    randomPhone_Test(){
        game_client.getArrayInfo('demo');
    },

    randomPhone_Live(){
        game_client.getArrayInfo('live');
        // game_client.lucky(game_client.data_live)
    },

    closePopupNumber(){
        $('#popup-smm').fadeOut();
    },

    closePopupPhone(){
        $('#popup-sdt').fadeOut();
        
    }

}

$(document).ready(function(){
	'use strict';
    game_client.initApp();
});