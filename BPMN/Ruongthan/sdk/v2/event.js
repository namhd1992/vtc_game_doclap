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

  
    rollup(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/rewards/receive-event-free';
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },


    playGame(listParams, objectParamsReturn, handlingData, notification, setStatusGame){
        var url=vtcmApp.config_.apiBaseUrl+'/luckyrandom/api/v1/rewards/receive-event-play';
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
            handlingData(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    common_sdk.ui.hideLoading();
                    setStatusGame();
                    notificationErr(err, objectParamsReturn)
                }
            }else if (err.request) {
                vtcmEvent.scrollTop();
                $('body').html('');
                $('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;font-size:25px">Bạn đang chơi quá nhanh. Vui lòng quay chậm lại.</div>');
            }else{
                console.log('Error', err.message);
            }
            
        })
    },

    scrollTop(){
        window.scrollTo(0, 0);
    },


    getHistory(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/games/logs'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },


    exchangeRewards(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/rewards/exchange';
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    exchangeRewardsWithMilestones(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/rewards/receive-event-milestones';
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },


    getBXHPayment(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/games/payment-leaderboard'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getInviteCodeForShare(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/get-invite-code'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    sendInviteCode(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/post-invite-code'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getUserData(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/get-user-data'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    setDataUserInGame(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/save-user-game-data'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    updateChonPhe(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/save-vote-data'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    updateDataUser(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/save-user-data'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getLocation(listParams, objectParamsReturn, handlingData, notification){
        // console.log(listParams)
        var path='/catalog/api/v1/setting/get-location'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getListServer(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/get-server-list'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getListCharacter(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/account/get-character-list'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getRewards(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/rewards/get-rewards'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    
    getListServerAndCharacter(listParams, objectParamsReturn, handlingData, notification){
        var path='/GameGw/api/v1/games/get-server-list'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getBXHPlay(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/games/exchange-leaderboard'
        vtcmEvent.common_f(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getBalanceScoin(listParams, objectParamsReturn, handlingData, notification){
        var path='/payment/api/v1/scoin/get-balances'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    topupsScoinToPoint(listParams, objectParamsReturn, handlingData, notification){
        var path='/payment/api/v1/wallet/topups'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    purchases(listParams, objectParamsReturn, handlingData, notification){
        var path='/payment/api/v1/wallet/purchases'
        vtcmEvent.common_token(listParams, objectParamsReturn, handlingData, notification, path)
    },

    getBXHRecharge(listParams, objectParamsReturn, handlingData, notification){
        var path='/luckyrandom/api/v1/games/recharge-leaderboard'
        vtcmEvent.common_f(listParams, objectParamsReturn, handlingData, notification, path)
    },



    common_token(listParams, objectParamsReturn, handlingData, notification, path){
        // console.log(listParams)
        var url=vtcmApp.config_.apiBaseUrl+path
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
            handlingData(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error)
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

    common_f(listParams, objectParamsReturn, handlingData, notification, path){
        // console.log(listParams)
        var url=vtcmApp.config_.apiBaseUrl+path
        var header = {
            headers: {
                "Content-Type": "application/json",
            }
        }
        var data= {...info, ...listParams};
        common_sdk.ui.showLoading();
        
        axios.post(url,data,header)
        .then(function (response) {
            handlingData(response, objectParamsReturn)
            common_sdk.ui.hideLoading();
        })
        .catch(function (err) {
            if(err.response){
                if(err.response.status===401){
                    vtcmAuth.logout();
                }else{
                    notification(error)
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