const info={
    lang: "vi",
    osType: "WINDOWS",
    osName:'WINDOWS',
    deviceId: "00000000-0000-0000-0000-000000000000",
    deviceName: "none",
    osVersion: "10",
    appVersion: "2.0.0",
    requestId: 1929292992929,
    siteId:100004
}

function getAppSetting(){
    axios.get(base_url+ '/catalog/api/v1/setting/get-app-settings', {
        params: info
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });  
}

function getAppSettingWithToken(user){
    var header = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": `Bearer ${user.access_token}`
		}
	}
    var data= {...info};
    data.userId=user.uid;
    axios.post(base_url+ '/catalog/api/v1/setting/app-settings',data,header)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });  
}