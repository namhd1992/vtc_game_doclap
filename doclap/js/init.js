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


function setDataToUI(data){
    var obj_fanpage_fb=data.filter(v =>v.code===EVT_FANPAGE_URL);
    var obj_group_fb=data.filter(v =>v.code===EVT_GROUP_URL);
    var obj_evt_guide=data.filter(v =>v.code===EVT_GUIDE);
    var obj_evt_rollup=data.filter(v =>v.code===EVT_ROLLUP_CONTENT);
    var obj_rewards=data.filter(v =>v.code===EVT_REWARDS);
    var obj_meta_title=data.filter(v =>v.code===EVT_META_TITLE);
    var obj_meta_desc=data.filter(v =>v.code===EVT_META_DESC);
    var obj_meta_img=data.filter(v =>v.code===EVT_IMAGE_URL);

    var list_item_link=[{id:"fanpage_fb", value:obj_fanpage_fb[0].value},{id:'group_fb', value:obj_group_fb[0].value}];
    var list_item_content=[{id:"content_evt_guide", value:obj_evt_guide[0].value},{id:'content_evt_rollup', value:obj_evt_rollup[0].value}, {id:'content_rewards', value:obj_rewards[0].value}]
    var list_item_meta=[{id:"og-title", value:obj_meta_title[0].value},{id:'og-description', value:obj_meta_desc[0].value}, {id:'og-image', value:obj_meta_img[0].value}]
    setLinkToItem(list_item_link);
    setContentToItem(list_item_content);
    setContentMeta(list_item_meta);
}

function setDataUser(user){
    var account_user = document.getElementById('account_user');
    account_user.innerText= user.userName;
}