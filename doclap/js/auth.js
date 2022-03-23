$(document).ready(function(){
    veryfi();
})

function login(){
    window.location.replace(`http://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}/doclap/index.html&agencyid=0`)
}

function logoutAction(){
    localStorage.removeItem("user");
    window.location.replace(
        `https://graph.vtcmobile.vn/oauth/authorize?client_id=92d34808c813f4cd89578c92896651ca&redirect_uri=${window.location.protocol}//${window.location.host}&action=logout&agencyid=0`,
    );
}

function veryfi(){
    var user = JSON.parse(localStorage.getItem("user"));
    if (localStorage.getItem("user") != null) {
        var now = moment(new Date()); //todays date
        var end = moment(user.expired); // another date
        var duration = moment.duration(end.diff(now));
        var millisecond = Math.floor(duration.asMilliseconds()) + user.expires_in*1000;
        if (millisecond > 0) {
        } else {
            logoutAction();
        }
    } else {
        var code = parse_query_string("code", window.location.href);
        console.log('code:', code)
        var currentPath=localStorage.getItem("currentPath");
        if (code != null) {
            const data={
                "lang": "vi",
                "osType": 'osName',
                "deviceId": "00000000-0000-0000-0000-000000000000",
                "deviceName": 'mobileModel',
                "osVersion": 'osVersion',
                "appVersion": "1.0",
                // "requestId": 365603310,
                // "client_id": "SANBOX",
                "client_id": "PENALTY_WEB",
                "client_secret": "123456abcdef",
                "grant_type": "vtc:scoin_code",
                "scope": "profile games.catalog games.penalty games.bets wallet giftbox pay transaction content",
                "code": code,
                "code_verifier": ""
            }
              
            var url = "https://api.splay.vn/users/api/v1/account/oauthtoken";

            axios.post(url, data).then(function (response) {
                var user_save = response.data.data;
                user_save.expired = new Date();
                localStorage.setItem("user", JSON.stringify(user_save));
                _this.setState({ user: response.data.data });
                window.location.replace(`${window.location.protocol}//${window.location.host}${currentPath}`);
            }).catch(function (error) {
                if(error.response.data.code ===-403){
                    window.location.replace(`${window.location.protocol}//${window.location.host}/error`);
                }
                _this.props.setStatusServer();
                localStorage.removeItem("user");
                localStorage.removeItem("userInfo");
            })
        }
    }
}