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


function changeBonus(type){
    var txt_bonus=document.getElementById("txt_bonus")
    switch (type) {
        case 1:
            txt_bonus.innerText="Giải Nhất";
            break;
        case 2:
            txt_bonus.innerText="Giải Nhì";
            break;
        case 3:
            txt_bonus.innerText="Giải Ba";
            break;
        default:
            txt_bonus.innerText="Giải Nhất";
            break;
    }
    
}


function getListUser(){
    var url="http://api.gf.splay.vn/userRandom/api/v1/game/get-list-random";

    var listParams={
        total: 1000,
        showUserId: true,
        showUserName: true,
        showFullName: true,
        showPhoneNumber: true,
        showIdNumber: true,
        showLuckyBet: true,
        showEmail: true,
        showPrizeNumber: true,
        showPrizeName: true,
        showCustomeData: true

    }

    var data= {...info, ...listParams};
    
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



function getResultRandom(){
    var url="http://api.gf.splay.vn/userRandom/api/v1/game/get-random";


    var listParams={
        tenantId: 40001,
    }
    var data= {...info, ...listParams};
    
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
