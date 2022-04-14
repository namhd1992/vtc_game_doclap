
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
    console.log('...')
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
    var obj_fanpage_fb=data.filter(v =>v.code===contants.EVT_FANPAGE_URL);
    var obj_group_fb=data.filter(v =>v.code===contants.EVT_GROUP_URL);
    var obj_evt_guide=data.filter(v =>v.code===contants.EVT_GUIDE);
    var obj_evt_rollup=data.filter(v =>v.code===contants.EVT_ROLLUP_CONTENT);
    var obj_rewards=data.filter(v =>v.code===contants.EVT_REWARDS);
    var obj_meta_title=data.filter(v =>v.code===contants.EVT_META_TITLE);
    var obj_meta_desc=data.filter(v =>v.code===contants.EVT_META_DESC);
    var obj_meta_img=data.filter(v =>v.code===contants.EVT_IMAGE_URL);
  
    var obj_rollup_points=data.filter(v =>v.code===contants.EVT_ROLLUP_POINTS);
    var obj_recharge_url=data.filter(v =>v.code===contants.EVT_RECHARGE_URL);
    var obj_payment_url=data.filter(v =>v.code===contants.EVT_PAYMENT_URL);
    var obj_moruong=data.filter(v =>v.code===contants.EVT_MORUONG_CONTENT);

    var obj_title=data.filter(v =>v.code===contants.EVT_NAME);
    document.title=obj_title[0].value;
    var list_item_link=[{id:"fanpage_fb", value:obj_fanpage_fb[0].value},{id:"md_fanpage_fb", value:obj_fanpage_fb[0].value},{id:'group_fb', value:obj_group_fb[0].value},{id:'md_group_fb', value:obj_group_fb[0].value},{id:'md_buycard', value:obj_payment_url[0].value},{id:'md_napgame', value:obj_recharge_url[0].value}];
    var list_item_content=[{id:"content_evt_guide", value:obj_evt_guide[0].value},{id:'content_evt_rollup', value:obj_evt_rollup[0].value}, {id:'content_rewards', value:obj_rewards[0].value}, {id:'rollup_points', value:obj_rollup_points[0].value}, {id:'content_moruong', value:obj_moruong[0].value}]
    var list_item_meta=[{id:"og-title", value:obj_meta_title[0].value},{id:'og-description', value:obj_meta_desc[0].value}, {id:'description', value:obj_meta_desc[0].value}, {id:'og-image', value:obj_meta_img[0].value}]
    common_sdk.setLinkToItem(list_item_link);
    common_sdk.setContentToItem(list_item_content);
    common_sdk.setContentMeta(list_item_meta);
  },
  uiLine(response){
    var number_play=response.data.data.playSummary[0] ? response.data.data.playSummary[0].playerCount : 0;
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
    var rewardExchange=response.data.data.rewardExchange;
    var number_play=response.data.data.playSummary[0] ? response.data.data.playSummary[0].playerCount : 0;
    var obj_bocbanh=rewardExchange.filter(v=>v.eventCode==="BANH_TRUNG");
    var number_bocbanh=obj_bocbanh.length > 0 ? obj_bocbanh[0].totalAvailable : 0;
    var obj_hoamai=rewardExchange.filter(v=>v.eventCode==="HOA_MAI");
    var number_hoamai=obj_hoamai.length > 0 ? obj_hoamai[0].totalAvailable : 0;
    var obj_hoadao=rewardExchange.filter(v=>v.eventCode==="HOA_DAO");
    var number_hoadao=obj_hoadao.length > 0 ? obj_hoadao[0].totalAvailable : 0;
    var obj_key=rewardExchange.filter(v=>v.eventCode==="NHAN_KHOA");
    var number_key=obj_key.length > 0 ? obj_key[0].totalAvailable : 0;
    var list=[{id:'account_user', value:user.userName},{id:'my_number_goal', value:user.pointAvailable}, {id:'number_play_vq', value:number_play}, {id:'number_bocbanh', value:number_bocbanh}, {id:'number_hoamai', value:number_hoamai}, {id:'number_hoadao', value:number_hoadao}, {id:'number_key', value:number_key}]
    common_sdk.setInfoUser(list);
  },

  error(err){
    // vtcmAuth.logout();
    // $('#modal-notify').modal('show'); 
    // var e = document.getElementById('content_notify');
    // e.innerText=error.response.data.message;
  }
  
};
