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
          setDataToUI(response.data.data.common)
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
        setDataToUI(response.data.data.common)
        setDataUser(response.data.data.user)
      })
      .catch(function (error) {
        console.log(error);
      })
      .then(function () {
      });  
}

// function Linik(obj, code)
// {
//     var fanpage_fb = document.getElementById(obj);
//     var obj_fanpage_fb=data.filter(v =>v.code===EVT_FANPAGE_URL);
//     fanpage_fb.setAttribute("href", obj_fanpage_fb[0].value);
// }

function setDataToUI(data){
    // Linik('fanpage_fb',EVT_FANPAGE_URL)
    var fanpage_fb = document.getElementById('fanpage_fb');
    var group_fb = document.getElementById('group_fb');
    var content_evt_guide = document.getElementById('content_evt_guide');
    var content_evt_rollup = document.getElementById('content_evt_rollup');
    var content_rewards = document.getElementById('content_rewards');
    var obj_fanpage_fb=data.filter(v =>v.code===EVT_FANPAGE_URL);
    fanpage_fb.setAttribute("href", obj_fanpage_fb[0].value);
    var obj_group_fb=data.filter(v =>v.code===EVT_GROUP_URL);
    group_fb.setAttribute("href", obj_group_fb[0].value);
    var obj_evt_guide=data.filter(v =>v.code===EVT_GUIDE);
    content_evt_guide.innerHTML= obj_evt_guide[0].value;
    var obj_evt_rollup=data.filter(v =>v.code===EVT_ROLLUP_CONTENT);
    content_evt_rollup.innerHTML= obj_evt_rollup[0].value;
    var obj_rewards=data.filter(v =>v.code===EVT_REWARDS);
    content_rewards.innerHTML= obj_rewards[0].value;
}

function setDataUser(user){
    var account_user = document.getElementById('account_user');
    account_user.innerText= user.userName;
}