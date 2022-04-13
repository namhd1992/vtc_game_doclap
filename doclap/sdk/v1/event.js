const vtcmEvent = {
    animation_vq:{},
    n:1,
    isPlay:false,
    isPlayPickup:false,
    page:0,
    modeId_history:0,
    totalPage:1,
	initAuth(){
        console.log('AAAAAAAA')
	},
	
	getConfig() {        
        return '';
  },

  
  rollup(modeId, roomId){
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null){
            var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-free';
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
            var data= {...info};
            data.modeId=modeId;
            data.userId=user.uid;
            data.roomId= roomId;
            data.character="";
            data.server="";
            axios.post(url,data,header)
            .then(function (response) {
                if(response.data.code >= 0){
                    if(roomId!==0){
                        $('#modal-diem-danh').modal('hide'); 
                        $('#modal-nhan-code').modal('show'); 
                        document.getElementById('modal-form-code').value=response.data.rewards[0].rewardCode;
                    }else{
                        $('#modal-nhan-vang').modal('hide'); 
                        $('#modal-notify').modal('show'); 
                        var e = document.getElementById('content_notify');
                        e.innerText=response.data.message;
                    }
                }else{
                    if(roomId!==0){
                        $('#modal-diem-danh').modal('hide'); 
                    }else{
                        $('#modal-nhan-vang').modal('hide'); 
                    }
                    $('#modal-notify').modal('show'); 
                    var e = document.getElementById('content_notify');
                    e.innerText=response.data.message;
                }
            })
            .catch(function (error) {
                if(roomId!==0){
                    $('#modal-diem-danh').modal('hide'); 
                }else{
                    $('#modal-nhan-vang').modal('hide'); 
                }
                $('#modal-notify').modal('show'); 
                var e = document.getElementById('content_notify');
                e.innerText=error.response.data.message;
            })
            .then(function () {
            });
        }else{
            $('#modal-warning-login').modal('show'); 
        }
    },

    getGoal(value){
        alert(value)
    },

    playGame(type, value, key){
        if(!vtcmEvent.isPlay){
            vtcmEvent.isPlay=true;
            var user = JSON.parse(localStorage.getItem("user"));
            if(user!==null){
                var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
                var header = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
                var data= {...info};
                data.modeId=10003;
                data.gameId=vtcmApp.config_.gameId;
                data.userId=user.uid;
                data.autoPlay=false;
                data.round=0;
                data.numPlayed=type;
                axios.post(url,data,header)
                .then(function (response) {
                    if(response.data.code>=0){
                        vtcmEvent.abc(type, value, key, response.data.data.rewards)
                    }else{
                        $('#modal-notify').modal('show'); 
                        var e = document.getElementById('content_notify');
                        e.innerText=response.data.message;
                        vtcmEvent.isPlay=false;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                });  
                
            }else{
                $('#modal-warning-login').modal('show');
            }
        }
    },

    abc(type, value, key, data){
        var n=Math.floor(Math.random() * 16);
        if(type===1){
            var tb = document.getElementById('tb_content_result_vq');
            var result = document.getElementById('content_result_vq');
            result.style.marginTop='100px';
            result.innerText=data[0].name;
            tb.innerHTML='';
            
        }else{
            var e = document.getElementById('content_result_vq');
            e.innerHTML='';
            e.style.marginTop='0px';
            var tb = document.getElementById('tb_content_result_vq');
            for (let i = 0; i < data.length; i++) {
                $(tb).append(`<tr>
                <th scope="row">Lượt ${i+1}</th>
                <td>${data[i].name}</td>
              </tr>`);
            }
        }
        vtcmEvent.animation_vq=setInterval(()=>{
            vtcmEvent.animation(key, value, data);
        },100)
        setTimeout(()=>{
            vtcmEvent.isPlay=false;
            clearInterval(vtcmEvent.animation_vq)
            $('#modal-thuong-du-xuan').modal('show');
            var e1 = document.getElementById(key+(vtcmEvent.n-1));
            e1.classList.remove("active");
            vtcmEvent.n=1;
        },(n+value)*100);
    },

    animation(key, value){
        var e = document.getElementById(key+vtcmEvent.n);
        e.classList.add("active");
        if(vtcmEvent.n>1){
            var e1 = document.getElementById(key+(vtcmEvent.n-1));
            e1.classList.remove("active");
            
        }
        if(vtcmEvent.n===value){
            setTimeout(()=>{
                var e1 = document.getElementById(key+value);
                e1.classList.remove("active");
            },100)
            
        }
        if(vtcmEvent.n<value){
            vtcmEvent.n+=1;
        }else{
            vtcmEvent.n=1;
        }
        
    },
    timeConvert(time){
        var a = new Date(time);
        var m=a.getMonth()+1;
        var month =m > 9 ? m : `0${m}`;
        var date = a.getDate();
        var hour = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`;
		var min = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`;
        var s = `${hour}H${min}  -  ${date} - ${month}`;
		return s;
    },

    getHistory(page, modeId){
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null){
            if(vtcmEvent.totalPage>page && page>=0){
                var header = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
                var data= {...info};
                data.modeId=modeId;
                data.userId=user.uid;
                data.transactionType=-1;
                data.type= -1;
                data.rewardType= -1;
                data.fromDate=0,
                data.toDate= 0,
                data.pageIndex= page;
                data.pageSize=10;
              
        
                axios.post(vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/games/logs',data,header)
                .then(function (response) {
                    if(response.data.code >=0){
                        const items=response.data.data.items;
                        vtcmEvent.totalPage=response.data.data.totalPage;
                        var tb = document.getElementById('tb_history');
                        tb.innerHTML='';
                        for (let i = 0; i < items.length; i++) {
                            $(tb).append(`<tr>
                            <th class="text-primary" scope="row">${i+1 + (page*10)}</th>
                            <td class="text-start">${items[i].description}</td>
                            <td class="text-primary text-nowrap">${vtcmEvent.timeConvert(items[i].createdTime)}</td>
                            <td class="text-blue">ĐÃ NHẬN</td>
                          </tr>`);
                        }
                        vtcmEvent.page=page;
                        vtcmEvent.modeId_history=modeId;
                        $('#modal-lich-su').modal('show'); 
                    }else{
                        $('#modal-notify').modal('show'); 
                        var e = document.getElementById('content_notify');
                        e.innerText=response.data.message;
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                }); 
            }
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

    previous(){
        vtcmEvent.getHistory(vtcmEvent.page-1, vtcmEvent.modeId_history)
    },

    next(){
        vtcmEvent.getHistory(vtcmEvent.page+1, vtcmEvent.modeId_history)
    },

    exchangeRewards(modeId, value){
        var user = JSON.parse(localStorage.getItem("user"));
        var url=vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/rewards/exchange';
        if(user!==null){
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
            var data= {...info};
            data.modeId=modeId;
            data.gameId=vtcmApp.config_.gameId;
            data.roomId=0;
            data.userId=user.uid;
            data.rewardId=1;
            data.character="";
            data.server="";
            data.milestones=value;
    
    
            axios.post(url,data,header)
            .then(function (response) {
                if(response.data.code >= 0){
                    if(modeId===10006){
                        $('#modal-notify').modal('show'); 
                        var e = document.getElementById('content_notify');
                        e.innerText='Nhận khóa thành công';
                    }else{
                        $('#modal-nhan-code').modal('show'); 
                        document.getElementById('modal-form-code').value=response.data.rewards[0].rewardCode;
                    }
                    
                }else{
                    $('#modal-notify').modal('show'); 
                    var e = document.getElementById('content_notify');
                    e.innerText=response.data.message;
                }
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            }); 
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

    exchangeRewardsWithMilestones(modeId, value){
        var user = JSON.parse(localStorage.getItem("user"));
        var url=vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/rewards/receive-event-milestones';
        if(user!==null){
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
            var data= {...info};
            data.modeId=modeId;
            data.roomId=0;
            data.userId=user.uid;
            data.rewardId=1;
            data.character="";
            data.server="";
            data.milestones=value;
    
    
            axios.post(url,data,header)
            .then(function (response) {
                if(response.data.code >= 0){
                    $('#modal-nhan-code').modal('show'); 
                    document.getElementById('modal-form-code').value=response.data.rewards[0].rewardCode;
                }else{
                    $('#modal-notify').modal('show'); 
                    var e = document.getElementById('content_notify');
                    e.innerText=response.data.message;
                }
                console.log(response);
            })
            .catch(function (error) {
                $('#modal-notify').modal('show'); 
                var e = document.getElementById('content_notify');
                e.innerText=error.response.data.message;
            })
            .then(function () {
            }); 
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

    bocbanh(key, number, modeId){
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null){
            vtcmEvent.exchangeRewards(modeId, number)
            for (let i = 0; i < number; i++) {
                var e = document.getElementById(key+(i+1));
                e.classList.add("hide");
            }
        } else{
            $('#modal-warning-login').modal('show'); 
        }
       
        // $('#modal-nhan-code').modal('show'); 
        
    },

    playFlipCard(value, key, content){
        if(!vtcmEvent.isPlayPickup){
            var user = JSON.parse(localStorage.getItem("user"));
            if(user!==null){
                var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
                var header = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${user.access_token}`
                    }
                }
                var data= {...info};
                data.modeId=10010;
                // data.modeId=10003;
                data.userId=user.uid;
                data.autoPlay=false;
                data.round=0;
                data.numPlayed=value;
                axios.post(url,data,header)
                .then(function (response) {
                    if(response.data.code>=0){
                        vtcmEvent.pick_up(value, key, content, response.data.data.rewards)
                    }else{
                        $('#modal-notify').modal('show'); 
                        var e = document.getElementById('content_notify');
                        e.innerText=response.data.message;
                    }
                    
                })
                .catch(function (error) {
                    $('#modal-notify').modal('show'); 
                    var e = document.getElementById('content_notify');
                    e.innerText=error.response.data.message;
                })
                .then(function () {
                });  
            }else{
                $('#modal-warning-login').modal('show'); 
            }
            
        }
    },

    pick_up(value, key, content, data){
        vtcmEvent.isPlayPickup=true;
        if(value===1){
            var e = document.getElementById(key);
            e.classList.add("active");
            var e1 = document.getElementById(content);
            setTimeout(()=>{
                e1.innerHTML+=data[0].name;
            },300)
            setTimeout(()=>{
                e.classList.remove("active");
                e1.innerHTML='';
                vtcmEvent.isPlayPickup=false;
            },3000)
        }else{
            for (let i = 1; i < data.length; i++) {
                var e = document.getElementById(key+i);
                e.classList.add("active");
                var e1 = document.getElementById(content+i);
                e1.innerHTML+=data[i-1].name;
            }
            setTimeout(()=>{
                for (let i = 1; i < value+1; i++) {
                    var e = document.getElementById(key+i);
                    e.classList.remove("active");
                    var e1 = document.getElementById(content+i);
                    e1.innerHTML='';
                }
                vtcmEvent.isPlayPickup=false;
            },3000)
        }
    },

    getBXHLiXi(){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/games/payment-leaderboard'
        var header = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        var data= {...info};
        data.startId=0;
        data.gameId=vtcmApp.config_.gameId;
        axios.post(url,data,header)
        .then(function (response) {
            var tb = document.getElementById('tb_modal_bxh');
            var list=response.data.data;
            for (let i = 0; i < list.length; i++) {
                $(tb).append(`<tr>
                <th class="text-primary" scope="row">${list[i].order}</th>
                <th>${list[i].userName}</th>
                <td>${list[i].totalAmount}</td>
              </tr>`);
            }
            $('#modal-bxh').modal('show');
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        }); 
    },

    openRuong(){

    },

    getRewardTop(value){

    }

}



//     $( ".flipbox-item" ).click(function() {
//     console.log('ok')
//   });
