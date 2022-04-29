const vtcmEvent = {
    animation_vq:{},
    n:1,
    isPlay:false,
    isPlayPickup:false,
    page:0,
    modeId_history:0,
    totalPage:1,
	initAuth(){
        console.log('...')
	},
	
	getConfig() {        
        return '';
    },

  
    rollup(modeId, roomId, handlingRollup, notificationErrRollup){

        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-free';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.userId=vtcmAuth.getUserId();
        data.roomId= roomId;
        data.character="";
        data.server="";
        common_sdk.ui.showLoading();


        axios.post(url,data,header)
        .then(function (response) {
            handlingRollup(roomId, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
            notificationErrRollup(roomId, error)
            common_sdk.ui.hideLoading();
        })
    },

    getGoal(value){
        alert(value)
    },

    playGame(type, value, key, handlingPlayGame, notificationErr, setStatusVQ){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=10003;
        data.gameId=vtcmApp.config_.gameId;
        data.userId=vtcmAuth.getUserId();
        data.autoPlay=false;
        data.round=0;
        data.numPlayed=type;
        common_sdk.ui.showLoading();
        axios.post(url,data,header)
        .then(function (response) {
            handlingPlayGame(type, value, key, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
            common_sdk.ui.hideLoading();
            setStatusVQ();
            notificationErr(error)
        })
    },


    getHistory(page, modeId, handlingGetHistory, notificationErr){
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.userId=vtcmAuth.getUserId();
        data.transactionType=-1;
        data.type= -1;
        data.rewardType= -1;
        data.fromDate=0,
        data.toDate= 0,
        data.pageIndex= page;
        data.pageSize=10;
        common_sdk.ui.showLoading();

        axios.post(vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/games/logs',data,header)
        .then(function (response) {
            handlingGetHistory(page, modeId, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
           notificationErr(error)
           common_sdk.ui.hideLoading();
        })
    },


    exchangeRewards(modeId, value, key, handlingExchangeRewards, notificationErr){
        var url=vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/rewards/exchange';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.gameId=vtcmApp.config_.gameId;
        data.roomId=0;
        data.userId=vtcmAuth.getUserId();
        data.rewardId=1;
        data.character="";
        data.server="";
        data.milestones=value;
        common_sdk.ui.showLoading();

        axios.post(url,data,header)
        .then(function (response) {
            handlingExchangeRewards(modeId, value, key, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
            notificationErr(error)
            common_sdk.ui.hideLoading();
        })
    },

    exchangeRewardsWithMilestones(modeId, value, handlingExchangeRewardsWithMilestones, notificationErr){
        var url=vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/rewards/receive-event-milestones';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.roomId=0;
        data.userId=vtcmAuth.getUserId();
        data.rewardId=1;
        data.character="";
        data.server="";
        data.milestones=value;
        common_sdk.ui.showLoading();

        axios.post(url,data,header)
        .then(function (response) {
            handlingExchangeRewardsWithMilestones(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
            notificationErr(error)
            common_sdk.ui.hideLoading();
        })
    },


    playFlipCard(value, key, content, handlingPlayFlipCard, notificationErr, setStatusLatThe){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
                var header = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${vtcmAuth.getToken()}`
                    }
                }
                var data= {...info};
                data.modeId=10010;
                // data.modeId=10003;
                data.userId=vtcmAuth.getUserId();
                data.autoPlay=false;
                data.round=0;
                data.numPlayed=value;
                common_sdk.ui.showLoading();

                axios.post(url,data,header)
                .then(function (response) {
                    handlingPlayFlipCard(value, key, content, response)
                    common_sdk.ui.hideLoading();
                })
                .catch(function (error) {
                    setStatusLatThe();
                    notificationErr(error);
                    common_sdk.ui.hideLoading();
                })
    },

    getBXHLiXi(handlingGetBXHLiXi, notificationErr){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/games/payment-leaderboard'
        var header = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        var data= {...info};
        data.startId=0;
        data.gameId=vtcmApp.config_.gameId;
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetBXHLiXi(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (error) {
            notificationErr(error)
            common_sdk.ui.hideLoading();
        })
    },

    openRuong(){

    },

    getRewardTop(value){

    }, 

 

    getKey(){
        // var e=document.getElementById('tab-1')
        // var e2=document.getElementById('tab-2')
        // var btn1=document.getElementsByClassName('btn-boc-banh-chung-xanh')
        // var btn2=document.getElementsByClassName('btn-li-xi-may-man')
        // e.classList.add("active");
        // e.classList.add("show");
        // btn1.classList.add("active");
        // e2.classList.remove("active");
        // e2.classList.remove("show");
        // btn2.classList.remove("active");

    }

}



//     $( ".flipbox-item" ).click(function() {
//     console.log('ok')
//   });
