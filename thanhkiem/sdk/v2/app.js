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

const contants={
    EVT_NAME:'EVT_NAME',
    EVT_ADDROLLCHARGE:'EVT_ADDROLLCHARGE',
    EVT_GUIDE:'EVT_GUIDE',
    EVT_ROLLUP_CONTENT:'EVT_ROLLUP_CONTENT',
    EVT_REWARDS:'EVT_REWARDS',
    EVT_CONDITION:'EVT_CONDITION',
    EVT_ICO_URL:'EVT_ICO_URL',
    EVT_IMAGE_URL:'EVT_IMAGE_URL',
    EVT_META_TITLE:'EVT_META_TITLE',
    EVT_META_DESC:'EVT_META_DESC',
    EVT_META_KEYWORDS:'EVT_META_KEYWORDS',
    EVT_WEBSITE_URL:'EVT_WEBSITE_URL',
    EVT_FANPAGE_URL:"EVT_FANPAGE_URL",
    EVT_YOUTUBE_URL:'EVT_YOUTUBE_URL',
    EVT_FACEBOOK_URL:'EVT_FACEBOOK_URL',
    EVT_TWITER_URL:'EVT_TWITER_URL',
    EVT_GOOGLE_ID:'EVT_GOOGLE_ID',
    EVT_GOOGLE_TAGS_CODE:'EVT_GOOGLE_TAGS_CODE',
    EVT_FACEBOOK_PIXELCODE:'EVT_FACEBOOK_PIXELCODE',
    EVT_CHAT_CODE:'EVT_CHAT_CODE',
    EVT_GROUP_URL:'EVT_GROUP_URL',
    EVT_VIDEO_URL:'EVT_VIDEO_URL',
    EVT_FACEBOOK_APPID:'EVT_FACEBOOK_APPID',
    EVT_MAINTENANCE_ENABLE:'EVT_MAINTENANCE_ENABLE',
    EVT_ROLLUP_POINTS:'EVT_ROLLUP_POINTS',
    EVT_RECHARGE_URL:'EVT_RECHARGE_URL',
    EVT_PAYMENT_URL:'EVT_PAYMENT_URL',
    EVT_MORUONG_CONTENT:'EVT_MORUONG_CONTENT',
	EVT_HOMEPAGE_URL:'EVT_HOMEPAGE_URL',
	EVT_LINK_ANDROID:'EVT_LINK_ANDROID',
	EVT_LINK_IOS:'EVT_LINK_IOS',
	EVT_LINK_DESKTOP:'EVT_LINK_DESKTOP',
    MODE_ID_LIXI:100007,
    MODE_ID_VQ:100007,
}

const vtcmApp = {
	config_: null,
    data_setting:{},	
	version_: "1.0.0",
	instances_: [],
	isConnected: false,
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		
		this.config_ = rawConfig;
        vtcmAuth.veryfi();
	},

	getAppSetting(setData){
		var userInfo = vtcmAuth.getUser();
		var data={...info};
		data.siteId=vtcmApp.config_.gameId;
		data.gameId=vtcmApp.config_.gameId;
		data.modeId=10003;
		if (!vtcmAuth.isLogin())
		{
		  var url=vtcmApp.config_.apiBaseUrl+'/catalog/api/v1/setting/get-app-settings'; 
		  common_sdk.getMethod(url, data, setData, vtcmApp.error)
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
		
		  common_sdk.postMethod(url, data, header, setData, vtcmApp.error)
		}
	},

	error(err){
		if(err.response){
			if(err.response.status===401){
				vtcmAuth.logout();
			}
		}else if (err.request) {
			$('body').html('');
			$('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau.</div>');
		}else{
			console.log('Error', err.message);
		}
	},
	
	getConfig() {        
        return this.config_;
    },
	
	getVersion(){
		return this.version_;
	},
	
	getUserId(){
		return this.config_.userId;
	}
};

ready(() => {
    // alert('app')
	'use strict';
	var config = {};
});