
const info={
  lang: "vi",
  osType: "WINDOWS",
  osName:'WINDOWS',
  deviceId: "00000000-0000-0000-0000-000000000000",
  deviceName: "none",
  osVersion: "10",
  appVersion: "2.0.0",
  requestId: 1929292992929,
}
const vtcmInit = {
	initAuth(){
    console.log('AAAAAAAA')
	},
	
	getConfig() {        
        return '';
  },
  getAppSetting(){
    var userInfo = vtcmAuth.getUser();
    var data={...info};
    data.siteId=vtcmApp.config_.gameId;
    data.gameId=vtcmApp.config_.gameId;
    if (!vtcmAuth.isLogin())
    {
      var url=vtcmApp.config_.apiBaseUrl+'/catalog/api/v1/setting/get-app-settings'; 
      common_sdk.getMethod(url, data, vtcmInit.setDataToUI, vtcmInit.error)
    }
    else{
      var url=vtcmApp.config_.apiBaseUrl+'/catalog/api/v1/setting/app-settings';
      var header = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${vtcmAuth.getToken()}`
        }
      }
      data.userId=vtcmAuth.getUserId();
      data.claims= "UsersBalance,PlaySummary,RewardExchange"
    
      common_sdk.postMethod(url, data, header, vtcmInit.cbwithtoken, vtcmInit.error)
    }
  },

  cbwithtoken(response){
    vtcmInit.setDataToUI(response)
    vtcmInit.setDataUser(response)
    vtcmInit.uiLine(response);
  },

  setDataToUI(response){
    vtcmApp.data_setting=response.data.data;
    var data=response.data.data.common;
    var obj_fanpage_fb=data.filter(v =>v.code===EVT_FANPAGE_URL);
    var obj_group_fb=data.filter(v =>v.code===EVT_GROUP_URL);
    var obj_evt_guide=data.filter(v =>v.code===EVT_GUIDE);
    var obj_evt_rollup=data.filter(v =>v.code===EVT_ROLLUP_CONTENT);
    var obj_rewards=data.filter(v =>v.code===EVT_REWARDS);
    var obj_meta_title=data.filter(v =>v.code===EVT_META_TITLE);
    var obj_meta_desc=data.filter(v =>v.code===EVT_META_DESC);
    var obj_meta_img=data.filter(v =>v.code===EVT_IMAGE_URL);
  
    var obj_rollup_points=data.filter(v =>v.code===EVT_ROLLUP_POINTS);
    var obj_recharge_url=data.filter(v =>v.code===EVT_RECHARGE_URL);
    var obj_payment_url=data.filter(v =>v.code===EVT_PAYMENT_URL);
    var obj_moruong=data.filter(v =>v.code===EVT_MORUONG_CONTENT);
  
    var list_item_link=[{id:"fanpage_fb", value:obj_fanpage_fb[0].value},{id:"md_fanpage_fb", value:obj_fanpage_fb[0].value},{id:'group_fb', value:obj_group_fb[0].value},{id:'md_group_fb', value:obj_group_fb[0].value},{id:'md_buycard', value:obj_payment_url[0].value},{id:'md_napgame', value:obj_recharge_url[0].value}];
    var list_item_content=[{id:"content_evt_guide", value:obj_evt_guide[0].value},{id:'content_evt_rollup', value:obj_evt_rollup[0].value}, {id:'content_rewards', value:obj_rewards[0].value}, {id:'rollup_points', value:obj_rollup_points[0].value}, {id:'content_moruong', value:obj_moruong[0].value}]
    var list_item_meta=[{id:"og-title", value:obj_meta_title[0].value},{id:'og-description', value:obj_meta_desc[0].value}, {id:'og-image', value:obj_meta_img[0].value}]
    common_sdk.setLinkToItem(list_item_link);
    common_sdk.setContentToItem(list_item_content);
    common_sdk.setContentMeta(list_item_meta);
  },
  uiLine(response){
    // var number_play=response.data.data.user.pointAvailable;
    var number_play=20
    if(number_play >= 20 && number_play < 40){
      var e = document.getElementById('timeline_20');
      e.classList.add("active");
    }else if(number_play >= 40 && number_play < 75){
      var e = document.getElementById('timeline_40');
      e.classList.add("active");
    }else if(number_play >= 75 && number_play < 120){
      var e = document.getElementById('timeline_75');
      e.classList.add("active");
    }else if(number_play >= 120 && number_play < 200){
      var e = document.getElementById('timeline_120');
      e.classList.add("active");
    }else if(number_play >= 200){
      var e = document.getElementById('timeline_200');
      e.classList.add("active");
    }else{
      console.log('chưa đủ lượt chơi')
    }
   
  },
  setDataUser(response){
    var user=response.data.data.user;
    var list=[{id:'account_user', value:user.userName},{id:'my_number_goal', value:user.pointAvailable}]
    common_sdk.setInfoUser(list);
  },
  error(err){
    console.log('err')
  }
  
};
