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

function getApp(){
    var url="http://api.gf.splay.vn/catalog/api/v1/setting/get-app-settings"

    var data= {...info};
    
    axios.get(url,{
        params: data
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (err) {
        console.log('Error', err.message);
    })
}



function getListUser(){
    var url="http://api.gf.splay.vn/catalog/api/v1/setting/get-app-settings"

    var data= {...info};
    
    axios.get(url,{
        params: data
    })
    .then(function (response) {
        console.log(response)
    })
    .catch(function (err) {
        console.log('Error', err.message);
    })
}

getApp();