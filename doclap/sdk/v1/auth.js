const vtcmAuth = {
    url_auth:"https://graph.vtcmobile.vn/oauth/authorize",
    client_id:"92d34808c813f4cd89578c92896651ca",

	initAuth(){
        console.log('...')
	},
	
	getConfig() {        
        return '';
    },

    login(){
        window.location.replace(`${vtcmAuth.url_auth}?client_id=${vtcmAuth.client_id}&agencyid=0&redirect_uri=${vtcmApp.config_.url_return}`)
    },

    logout(){
        localStorage.removeItem("user");
        window.location.replace(
            `${vtcmAuth.url_auth}?client_id=${vtcmAuth.client_id}&action=logout&agencyid=0&redirect_uri=${vtcmApp.config_.url_return}`,
        );
    },

    veryfi(){
        // var div_login=` <div style="width: 200px; height: 50; border: 1px solid white; padding: 5px; background-color: #7b0c04;">
        //                     <span id="account_user"></span></br>
        //                     <span style="text-decoration: underline; cursor: pointer;" onclick="logout()">Thoát</span>
        //                 </div>`;
        // var div_logout=`<a class="btn-bg btn-dang-nhap nav-link" role="button" target="_blank" onclick="login()">
        //                     <span class="visually-hidden">Đăng nhập</span>
        //                 </a>`;
        var user = vtcmAuth.getUser();
        // var e = document.getElementById('li_auth');
        if (localStorage.getItem("user") != null) {
            vtcmInit.getAppSetting();
            var now = moment(new Date()); //todays date
            var end = moment(user.expired); // another date
            var duration = moment.duration(end.diff(now));
            var millisecond = Math.floor(duration.asMilliseconds()) + user.expires_in*1000;
            if (millisecond > 0) {
                // e.innerHTML=div_login;
            } else {
                vtcmAuth.logout();
                // e.innerHTML=div_logout;
            }
        }else{
    
            var code = common_sdk.parse_query_string("code", window.location.href);
            // var currentPath=localStorage.getItem("currentPath");
            vtcmInit.getAppSetting();
            if (code != null) {
                const data={
                    "lang": "vi",
                    "osType": 'WINDOWS',
                    "deviceId": "00000000-0000-0000-0000-000000000000",
                    "deviceName": 'none',
                    "osVersion": "10",
                    "appVersion": "1.0",
                    // "requestId": 365603310,
                    "client_id": vtcmApp.config_.client_id,
                    // "client_id": "PENALTY_WEB",
                    "client_secret":  vtcmApp.config_.client_secret,
                    "grant_type": "vtc:scoin_code",
                    "scope": "profile games.catalog games.penalty games.bets wallet giftbox pay transaction content",
                    "code": code,
                    "code_verifier": "",
                    "site_id": vtcmApp.config_.gameId
                }
                  
                var url = vtcmApp.config_.apiBaseUrl+ "/users/api/v1/account/oauthtoken";
    
                axios.post(url, data).then(function (response) {
                    var user_save = response.data.data;
                    user_save.expired = new Date();
                    localStorage.setItem("user", JSON.stringify(user_save));
                    // _this.setState({ user: response.data.data });
                    window.location.replace(`${window.location.protocol}//${window.location.host}${vtcmApp.config_.path}`);
                }).catch(function (error) {
                    if(error.response.data.code ===-403){
                        window.location.replace(`${window.location.protocol}//${window.location.host}/error`);
                    }
                    // _this.props.setStatusServer();
                    localStorage.removeItem("user");
                    localStorage.removeItem("userInfo");
                })
            }
            // else{
            //     e.innerHTML=div_logout;
            // }
        }
    },

    getUser(){
        var user = JSON.parse(localStorage.getItem("user"));
        return user;
    },

    isLogin(){
        if(vtcmAuth.getUser()!==null){
            return true;
        }
        return false;
    },

    getUserId(){
        var user=vtcmAuth.getUser()
        return user.uid;
    },

    getUserName(){
        var user=vtcmAuth.getUser()
        return user.full_name;
    },

    getToken(){
        var user=vtcmAuth.getUser()
        return user.access_token;
    }
};
