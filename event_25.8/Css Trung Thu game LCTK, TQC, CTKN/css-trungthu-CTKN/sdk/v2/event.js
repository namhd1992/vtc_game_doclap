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

  
    rollup(modeId, roomId,objectParamsReturn, handlingRollup, notificationErrRollup){

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
            handlingRollup(objectParamsReturn, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErrRollup(objectParamsReturn, err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
           
        })
    },


    playGame(modeId, numPlayed, objectParamsReturn, handlingPlayGame, notificationErr, setStatusGame){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.gameId=vtcmApp.config_.gameId;
        data.userId=vtcmAuth.getUserId();
        data.autoPlay=false;
        data.round=0;
        data.numPlayed=numPlayed;
        common_sdk.ui.showLoading();
        axios.post(url,data,header)
        .then(function (response) {
            handlingPlayGame(objectParamsReturn, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    common_sdk.ui.hideLoading();
                    setStatusGame();
                    notificationErr(objectParamsReturn,err)
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },


    getHistory(page, modeId, rewardType, handlingGetHistory, notificationErr){
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
        data.rewardType= rewardType;
        data.fromDate=0,
        data.toDate= 0,
        data.pageIndex= page;
        data.pageSize=10;
        common_sdk.ui.showLoading();

        axios.post(vtcmApp.config_.apiBaseUrl+ '/luckyrandom/api/v1/games/logs',data,header)
        .then(function (response) {
            handlingGetHistory(page, modeId,rewardType, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErr(err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
           
        })
    },


    exchangeRewards(modeId, value,objectParamsReturn, handlingExchangeRewards, notificationErr){
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
        // data.roomId=10183;
        data.roomId=0;
        data.userId=vtcmAuth.getUserId();
        data.rewardId=1;
        data.character="";
        data.server="";
        data.milestones=value;
        common_sdk.ui.showLoading();

        axios.post(url,data,header)
        .then(function (response) {
            handlingExchangeRewards(objectParamsReturn, response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErr(objectParamsReturn, err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
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
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErr(err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
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
                .catch(function (err) {
                    if(err.response){
                        if(err.response.status===401){
                            vtcmAuth.logout();
                        }else{
                            setStatusLatThe();
                            notificationErr(err);
                            common_sdk.ui.hideLoading();
                        }
                    }else if (err.request) {
                        $('body').html('');
                        $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
                    }else{
                        console.log('Error', err.message);
                    }
                   
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
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErr(err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getLinkShare(modeId, roomId,id_popup, handlingGetLinkShare, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/get-invite-code'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.roomId=roomId;
        data.inviteCode="";
        data.userId=vtcmAuth.getUserId();
        // data.gameId=vtcmApp.config_.gameId;
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetLinkShare(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message, id_popup)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    sendLinkShare(modeId, roomId,code, handlingSendLinkShare, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/post-invite-code'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info};
        data.modeId=modeId;
        data.roomId=roomId;
        data.inviteCode=code;
        data.userId=vtcmAuth.getUserId();
        // data.gameId=vtcmApp.config_.gameId;
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingSendLinkShare(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    // notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getUserData(listParams, handlingGetUserData, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/get-user-data'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetUserData(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    updateDataServerCharacter(listParams, objectParamsReturn, handlingUpdateDataServerCharacter, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/save-user-game-data'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingUpdateDataServerCharacter(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    updateChonPhe(listParams, objectParamsReturn, handlingUpdateChonPhe, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/save-vote-data'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingUpdateChonPhe(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    updateFormDK(listParams, objectParamsReturn, handlingUpdateFormDK, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/save-user-data'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingUpdateFormDK(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getUserLocation(listParams, objectParamsReturn, handlingGetUserLocation, notification){
        console.log(listParams)
        var url=vtcmApp.config_.apiBaseUrl+'/catalog/api/v1/setting/get-location'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetUserLocation(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getListServer(handlingGetListServer, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/get-server-list'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        common_sdk.ui.showLoading();
        
        var data= {...info};
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetListServer(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getListCharacter(handlingGetListCharacter, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/account/get-character-list'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        common_sdk.ui.showLoading();
        var data= {...info};
        axios.post(url, data, header)
        .then(function (response) {
            handlingGetListCharacter(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getRewards(listParams, handlingGetRewards, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/get-rewards'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        common_sdk.ui.showLoading();
        var data= {...info, ...listParams};
        axios.post(url, data, header)
        .then(function (response) {
            handlingGetRewards(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    
    getListServerAndCharacter(listParams, handlingGetListServerAndCharacter, notification){
        var url=vtcmApp.config_.apiBaseUrl+'/GameGw/api/v1/games/get-server-list'
        var header = {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
        }
        common_sdk.ui.showLoading();
        
        var data= {...info, ...listParams};
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetListServerAndCharacter(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error.response.data.message)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    getBXH(modeId, handlingGetBXH, notificationErr){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/games/exchange-leaderboard'
        var header = {
            headers: {
                "Content-Type": "application/json"
            }
        }
        var data= {...info};
        data.startId=0;
        data.modeId=modeId;
        data.gameId=vtcmApp.config_.gameId;
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingGetBXH(response)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notificationErr(err)
                    common_sdk.ui.hideLoading();
                }
            }else if (err.request) {
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

}