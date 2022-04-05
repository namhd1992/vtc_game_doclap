
var animation_vq={};
var i=1;
var isPlay=false;
var isPlayPickup=false;

function rollup(roomId){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null){
        var url=base_url+'/luckyrandom/api/v1/rewards/receive-event-free';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.access_token}`
            }
        }
        var data= {...info};
        data.modeId=0;
        data.roomId=roomId;
        data.userId=user.uid;
        data.character="";
        data.server="";
        axios.post(url,data,header)
        .then(function (response) {
            console.log(response);
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

function getGoal(value){
    alert(value)
}

function playGame(type, value, key){
    if(!isPlay){
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null){
            var url=base_url+'/luckyrandom/api/v1/rewards/receive-event-play';
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
            var data= {...info};
            data.modeId=10003;
            data.userId=user.uid;
            data.autoPlay=false;
            data.round=0;
            data.numPlayed=type;
            axios.post(url,data,header)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });  
            abc(type, value, key)
        }else{
            $('#modal-warning-login').modal('show'); 
        }
    }
}

function abc(type, value, key){
    isPlay=true;
    animation_vq=setInterval(()=>{
        animation(key, value);
    },100)
    setTimeout(()=>{
        isPlay=false;
        clearInterval(animation_vq)
    },2000)
}

function animation(key, value){
    var e = document.getElementById(key+i);
    e.classList.add("active");
    if(i>1){
        var e1 = document.getElementById(key+(i-1));
        e1.classList.remove("active");
    }
    if(i===value){
        setTimeout(()=>{
            var e1 = document.getElementById(key+value);
            e1.classList.remove("active");
        },100)
        
    }
    if(i<value){
        i+=1;
    }else{
        i=1;
    }
    
}

function paginationHistory(){

}

function getHistory(page){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null){
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.access_token}`
            }
        }
        var data= {...info};
        data.modeId=10012;
        data.userId=user.uid;
        data.transactionType=-1;
        data.serviceId= 1;
        data.paymentMethod= -1;
        data.source= -1;
        data.fromDate=-1,
        data.toDate= -1,
        data.pageIndex= page;
        data.pageSize=10;
      

        axios.post(base_url+ '/pay/api/v1/transaction/history',data,header)
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        }); 
    } else{
        $('#modal-warning-login').modal('show'); 
    }
}

function exchangeRewards(modeId, value){
    var user = JSON.parse(localStorage.getItem("user"));
    var url=base_url+ '/luckyrandom/api/v1/rewards/exchange';
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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        }); 
    } else{
        $('#modal-warning-login').modal('show'); 
    }
}

function exchangeRewardsWithMilestones(modeId, value){
    var user = JSON.parse(localStorage.getItem("user"));
    var url=base_url+ '/luckyrandom/api/v1/rewards/receive-event-milestones';
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
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
        }); 
    } else{
        $('#modal-warning-login').modal('show'); 
    }
}

function getKeyGoal(){

}


function bocbanh(key, number){
    var user = JSON.parse(localStorage.getItem("user"));
    if(user!==null){
        for (let i = 0; i < number; i++) {
            var e = document.getElementById(key+(i+1));
            e.classList.add("hide");
        }
    } else{
        $('#modal-warning-login').modal('show'); 
    }
   
    // $('#modal-nhan-code').modal('show'); 
    
}

function playFlipCard(value, key, content){
    if(!isPlayPickup){
        var user = JSON.parse(localStorage.getItem("user"));
        if(user!==null){
            var url=base_url+'/luckyrandom/api/v1/rewards/receive-event-play';
            var header = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${user.access_token}`
                }
            }
            var data= {...info};
            data.modeId=10010;
            data.userId=user.uid;
            data.autoPlay=false;
            data.round=0;
            data.numPlayed=value;
            axios.post(url,data,header)
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            })
            .then(function () {
            });  
        }else{
            $('#modal-warning-login').modal('show'); 
        }
        pick_up(value, key, content)
    }
}

function pick_up(value, key, content){
    isPlayPickup=true;
    if(value===1){
        var e = document.getElementById(key);
        e.classList.add("active");
        var e1 = document.getElementById(content);
        e1.innerHTML+='+ 100 Hoa Mai';
        setTimeout(()=>{
            e.classList.remove("active");
            e1.innerHTML='';
            isPlayPickup=false;
        },3000)
    }else{
        for (let i = 1; i < value+1; i++) {
            var e = document.getElementById(key+i);
            e.classList.add("active");
            var e1 = document.getElementById(content+i);
            e1.innerHTML+='+ 100 Hoa Mai';
        }
        setTimeout(()=>{
            for (let i = 1; i < value+1; i++) {
                var e = document.getElementById(key+i);
                e.classList.remove("active");
                var e1 = document.getElementById(content+i);
                e1.innerHTML='';
            }
            isPlayPickup=false;
        },3000)
    }
}

function openRuong(){

}

function getBXHLiXi(){

}

function getRewardTop(value){

}
