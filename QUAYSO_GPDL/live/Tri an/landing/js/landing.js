const info={
	lang: "vi",
	osType: "WINDOWS",
	osName:'WINDOWS',
	deviceId: "00000000-0000-0000-0000-000000000000",
	deviceName: "none",
	osVersion: "10",
	appVersion: "2.0.0",
	requestId: 1929292992929,
    siteId:"100119",
    gameId:"100119"
}

function getAppSettings(){
    var url="https://api-gf.splay.vn/catalog/api/v1/setting/get-app-settings";
    var header = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    var listParams={
        // tenantId: 50002,
    }
    var data= {...info, ...listParams};
    
    axios.get(url,{params:data})
    .then(function (response) {
        if(response.data.code > 0){
           var data=response.data.data;
           var obj_total_user=data.common.filter(v =>v.code==="TOTAL_USER_CONNECT");
           var total_user=obj_total_user[0].value ? obj_total_user[0].value : 0; 

           var obj_link_stream=data.common.filter(v =>v.code==="LINK_LIVE_STREAM");
           var src_stream=obj_link_stream[0].value ? obj_link_stream[0].value : 0; 

           var id_total_user =document.getElementById('id_total_user');
           id_total_user.innerText=total_user;

           var link_stream =document.getElementById('link_stream');
           link_stream.setAttribute("src",src_stream)

           var obj_event_guide=data.common.filter(v =>v.code==="EVT_GUIDE");
           $(".event-guide").html(obj_event_guide[0].value);

           var obj_event_bgcount =data.common.filter(v =>v.code==="EVT_BACKGROUND_COUNTDOWN");
           $(".bg-countdown").attr("src",obj_event_bgcount[0].value);
           
            timeRemain(data.siteInfo.stopSiteMsTimeStamp);
        }
    })
    .catch(function (err) {
        console.log('Error', err.message);
    })
}

function getListUser(){
    var url="https://api-gf.splay.vn/userrandom/api/v1/game/get-logs";

    var header = {
        headers: {
            "Content-Type": "application/json",
        }
    }

    var listParams={
        tenantId: 50002,
        turnId: -1,
        pageIndex: 0,
        pageSize: 10
    }

    var data= {...info, ...listParams};
    
    axios.post(url,data,header)
    .then(function (response) {
        if(response.data.code > 0){
            var list_user=response.data.data;
            var tb = document.getElementById('tb_history');
            tb.innerHTML='';
            for (let i = 0; i < list_user.length; i++) {
                $(tb).append(`<tr>
                    <td>${list_user[i].userName}</td>
                    <td>${list_user[i].prizeName}</td>
                    <td>${timeConvert(list_user[i].createdDate)}</td>
                    </tr>`);
            }

        }
        // console.log(response)
    })
    .catch(function (err) {
        console.log('Error', err.message);
    })
}

function timeConvert(time){
    var a = new Date(time);
    var m=a.getMonth()+1;
    var month =m > 9 ? m : `0${m}`;
    var date = a.getDate();
    var hour = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`;
    var min = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`;
    var s = `${hour}H${min}  -  ${date} - ${month}`;
    return s;
}

function timeRemain(times){
    var day=0, hour=0, minute=0, second=0;
    var _this=this;
    setInterval(()=>{
        var time=(times-Date.now())/1000;
        if(time>0){
            day=Math.floor(time/86400) > 9 ? Math.floor(time/86400) : `0${Math.floor(time/86400)}`;
            hour=Math.floor((time%86400)/3600) > 9 ? Math.floor((time%86400)/3600) : `0${Math.floor((time%86400)/3600)}`;
            minute=Math.floor(((time%86400)%3600)/60) > 9 ? Math.floor(((time%86400)%3600)/60) : `0${Math.floor(((time%86400)%3600)/60)}`;
            second=Math.ceil(((time%86400)%3600)%60) > 9 ? Math.ceil(((time%86400)%3600)%60) : `0${Math.ceil(((time%86400)%3600)%60)}`;
            var id_day =document.getElementById('id_day')
            var id_hour =document.getElementById('id_hour')
            var id_minute =document.getElementById('id_minute')
            var id_second =document.getElementById('id_second')
            id_day.innerText=day;
            id_hour.innerText=hour;
            id_minute.innerText=minute;
            id_second.innerText=second;
        }
    }, 1000);
}

getAppSettings();
getListUser();