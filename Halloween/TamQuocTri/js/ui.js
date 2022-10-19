// rewardType=5
const game_client = {
	config_: null,	
	version_: "1.0.0",
	instances_: [],
	isConnected: false,
	animation_vq:{},
    n:1,
    isPlay:false,
    isPlayPickup:false,
    page:0,
    modeId_history:0,
    totalPage:1,
	rewardType:-1,
	listAlbum:[],
	contentGiftcode:'',
	oldClass:'',
	pointAvailable:0,
	number_points:0,
	number_tieuquy:0,
	theWheel:{},
	totalPointBlack:0,
	totalPointWhite:0,
	historyItems:[],
	city:'',
	district:'',
	phuong:'',
	isChonPhe:true,
	userData:{},
	base_url_img:'',
	infoBlack:{},
	infoWhite:{},
	list_server:[],
	
	
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		game_client.winwheel();
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "inline-block";

        }else{
			vtcmApp.getAppSetting(game_client.setDataToUI);
            document.getElementById("logout").style.display = "none";
            document.getElementById("login").style.display = "inline-block";
        }
		// $('.copyGc').copyOnClick({copyMode:"val",confirmClass:"copy-confirmation",});
		
	},


	winwheel(){
		game_client.theWheel = new Winwheel({
			'canvasId'    : 'wheel',
			'numSegments' : 10,
			'fillStyle'   : '#e7706f',
			'lineWidth'   : 1,
			'drawMode' : 'image',
			'animation' :                   // Note animation properties passed in constructor parameters.
			{
				'type'     : 'spinToStop',  // Type of animation.
				'duration' : 5,             // How long the animation is to take in seconds.
				'spins'    : 8              // The number of complete 360 degree rotations the wheel is to do.
			}
		});
	
		// $('#wheel-container .bt-spin').click(function(){
			
		// })
		
		let loadedImg = new Image();
		
		loadedImg.onload = function()
		{
			game_client.theWheel.wheelImage = loadedImg;   
			game_client.theWheel.draw();                 
		}
		
		// loadedImg.src = "../images/wheel.png";
		loadedImg.src = "./images/wheel.png";
	},

	cbwithtoken(response){
		game_client.setDataToUI(response)
		game_client.setDataUser(response)
		game_client.uiLine(response);
	},

	uiLine(response){
		console.log(response.data.data.siteInfo)
		var day=game_client.checkTime(response.data.data.siteInfo.startSiteMsTimeStamp);
		if(day!==-1 && day < 6){
			$(`div.css_day${day} > a`).removeClass("bt-diemdanh-gray")
			$(`div.css_day${day} > a`).addClass("bt-diemdanh")

			$(`div.css_day${day} > img`).attr("src","images/f3-img-hover.png");
			console.log(day)
		}
		
	},
	
	setDataToUI(response){
		vtcmApp.data_setting=response.data.data;
		var data=response.data.data.common;
		var obj_maintenance=data.filter(v =>v.code===contants.EVT_MAINTENANCE_ENABLE);
		if(obj_maintenance[0].value!=="0"){
			$('body').html('');
			$('body').html('<div style="width: 100%;height: 50px;color: black;text-align: center;padding: 50px;">Hệ thống đang tạm dừng để bảo trì. Vui lòng quay lại sau!</div>');
			return;
		}
		var obj_fanpage_fb=data.filter(v =>v.code===contants.EVT_FANPAGE_URL);
		var obj_group_fb=data.filter(v =>v.code===contants.EVT_GROUP_URL);
        var obj_website_url=data.filter(v =>v.code===contants.EVT_WEBSITE_URL);
		var obj_youtube=data.filter(v =>v.code===contants.EVT_YOUTUBE_URL);
        var obj_zalo=data.filter(v =>v.code===contants.EVT_ZALO_URL);
		var obj_total_register=data.filter(v =>v.code===contants.EVT_TOTAL_REGISTER);

        var obj_link_android=data.filter(v =>v.code===contants.EVT_LINK_ANDROID);
        var obj_link_ios=data.filter(v =>v.code===contants.EVT_LINK_IOS);
        var obj_link_desktop=data.filter(v =>v.code===contants.EVT_LINK_DESKTOP);


		var obj_evt_guide=data.filter(v =>v.code===contants.EVT_GUIDE);
		var obj_evt_guide_vq=data.filter(v =>v.code===contants.EVT_GUIDE_VQ);
		var obj_evt_rollup=data.filter(v =>v.code===contants.EVT_ROLLUP_CONTENT);
		var obj_rewards=data.filter(v =>v.code===contants.EVT_REWARDS);
		var obj_meta_title=data.filter(v =>v.code===contants.EVT_META_TITLE);
		var obj_meta_desc=data.filter(v =>v.code===contants.EVT_META_DESC);
		var obj_meta_img=data.filter(v =>v.code===contants.EVT_IMAGE_URL);
		var obj_welfare=data.filter(v =>v.code===contants.EVT_WELFARE);
	  
		var obj_rollup_points=data.filter(v =>v.code===contants.EVT_ROLLUP_POINTS);
		var obj_recharge_url=data.filter(v =>v.code===contants.EVT_RECHARGE_URL);
		var obj_payment_url=data.filter(v =>v.code===contants.EVT_PAYMENT_URL);
		var obj_moruong=data.filter(v =>v.code===contants.EVT_MORUONG_CONTENT);

		var obj_base_url_img=data.filter(v =>v.code===contants.CDN_URL);
		game_client.base_url_img=obj_base_url_img[0] ? obj_base_url_img[0].value : ''
	
		var obj_title=data.filter(v =>v.code===contants.EVT_NAME);
		document.title=obj_title[0] ? obj_title[0].value : '';
		var list_item_link=[{id:"sdk_fanpage_fb", value:obj_fanpage_fb[0] ? obj_fanpage_fb[0].value : ''},
        {id:'sdk_group_fb', value:obj_group_fb[0] ? obj_group_fb[0].value : ''},
        {id:'sdk_website_url', value:obj_website_url[0] ? obj_website_url[0].value : ''},
		{id:'sdk_youtube', value:obj_youtube[0] ? obj_youtube[0].value : ''},
        {id:'sdk_zalo', value:obj_zalo[0] ? obj_zalo[0].value : ''},

        {id:'sdk_link_game_android', value:obj_link_android[0] ? obj_link_android[0].value : ''},
        {id:'sdk_link_game_ios', value:obj_link_ios[0] ? obj_link_ios[0].value : ''},
        {id:'sdk_link_game_desktop', value:obj_link_desktop[0] ? obj_link_desktop[0].value : ''},
        {id:'md_buycard', value:obj_payment_url[0] ? obj_payment_url[0].value : ''},
        {id:'md_napgame', value:obj_recharge_url[0] ? obj_recharge_url[0].value : ''}];


		var list_item_content=[{id:"sdk_content_evt_guide", value:obj_evt_guide[0] ? obj_evt_guide[0].value : ''},
		{id:'sdk_content_evt_guide_vq', value:obj_evt_guide_vq[0] ? obj_evt_guide_vq[0].value : ''},
        {id:'sdk_content_evt_rollup', value:obj_evt_rollup[0] ? obj_evt_rollup[0].value : ''},
        {id:'sdk_content_rewards', value:obj_rewards[0] ? obj_rewards[0].value : ''},
		{id:'sdk_welfare', value:obj_welfare[0] ? obj_welfare[0].value : ''},
        {id:'rollup_points', value:obj_rollup_points[0] ? obj_rollup_points[0].value : ''}, 
        {id:'content_moruong', value:obj_moruong[0] ? obj_moruong[0].value : '' },
		{id:'sdk_total_register', value:obj_total_register[0] ? obj_total_register[0].value : '' }]

		var list_item_meta=[{id:"og-title", value:obj_meta_title[0] ? obj_meta_title[0].value : ''},
        {id:'og-description', value:obj_meta_desc[0] ? obj_meta_desc[0].value : ''}, 
        {id:'description', value:obj_meta_desc[0] ? obj_meta_desc[0].value : ''}, 
        {id:'og-image', value:obj_meta_img[0] ? obj_meta_img[0].value : ''}];

		common_sdk.setLinkToItem(list_item_link);
		common_sdk.setContentToItem(list_item_content);
		common_sdk.setContentMeta(list_item_meta);
	},

	setDataUser(response){
		var user=response.data.data.user;
		var rewardExchange=response.data.data.rewardExchange;
		var number_points=0;
		var number_tieuquy=0
		if(rewardExchange.length>0){
			for (let i = 0; i < rewardExchange.length; i++) {
				switch (rewardExchange[i].eventCode) {
					case "DIEM":
						number_points=rewardExchange[i].totalAvailable;
						break;
					case "TIEUQUY":
						number_tieuquy=rewardExchange[i].totalAvailable;
						break;
					default:
						number_points=rewardExchange[i].totalAvailable;
						break;
				}
			}
		}
		var number_play=response.data.data.playSummary[0] ? response.data.data.playSummary[0].playerCount : 0;
        var list=[];
		var listRewards=[];
		game_client.pointAvailable=user.pointAvailable;
		game_client.number_points=number_points;
		game_client.number_tieuquy=number_tieuquy;
        list.push({id:'username', value:user.userName}, {id:'number_play_vq', value:user.pointAvailable}, {id:'sdk_numberpoint', value:number_points}, {id:'sdk_tieuquy', value:number_tieuquy})

		// var list=[{id:'account_user', value:user.userName},{id:'my_number_goal', value:user.pointAvailable}, {id:'number_play_vq', value:number_play}, {id:'number_bocbanh', value:number_bocbanh}, {id:'number_hoamai', value:number_hoamai}, {id:'number_hoadao', value:number_hoadao}, {id:'number_key', value:number_key}]
		common_sdk.setInfoUser(list);
	},


	
	getConfig() {   
        return this.config_;
    },
	
	getVersion(){
		return this.version_;
	},
	
	getUserId(){
		return this.config_.userId;
	},

	

	rollup(modeId, roomId){
		var objectParamsReturn={
			modeId:modeId,
			roomId:roomId, 
		}
		if(vtcmAuth.isLogin()){
			vtcmEvent.rollup(modeId, roomId,objectParamsReturn, this.handlingRollup, this.notificationErrRollup)
		}else{
			// game_client.notification(`Bạn chưa đăng nhập. <a style="color:red;cursor: pointer;" cusr onclick="vtcmAuth.login()">Đăng Nhập</a>`, 'pop__mission')
			game_client.showLogin();
        }
	},

	handlingRollup(objectParamsReturn, response){
		if(response.data.code >= 0){
			switch (objectParamsReturn.roomId) {
				case 10005:
					game_client.pointAvailable=game_client.pointAvailable + 1;
					$('#popup-diemdanh1').fadeIn(); 
					break;
				case 10006:
					game_client.number_points=game_client.number_points + 100;
					$('#popup-diemdanh2').fadeIn(); 
					break;
				case 10007:
					game_client.pointAvailable=game_client.pointAvailable + 2;
					$('#popup-diemdanh3').fadeIn(); 
					break;
				case 10008:
					game_client.number_points=game_client.number_points + 200;
					$('#popup-diemdanh4').fadeIn(); 
					break;
				case 10009:
					game_client.number_tieuquy=game_client.number_tieuquy + 1;
					$('#popup-diemdanh5').fadeIn(); 
					break;
				default:
					game_client.pointAvailable=game_client.pointAvailable + 1;
					$('#popup-diemdanh1').fadeIn(); 
					break;
			}
			game_client.updatePoint();
		}else{
			game_client.notification(response.data.message,'')
		}
	},

	updatePoint(){
		var list=[];
		list.push({id:'number_play_vq', value:game_client.pointAvailable}, {id:'sdk_numberpoint', value:game_client.number_points}, {id:'sdk_tieuquy', value:game_client.number_tieuquy})
		common_sdk.setInfoUser(list);
	},

	updateResultVQ(point, tieuquy){
		var list=[];
		list.push({id:'vq_point', value:point}, {id:'vq_tieuquy', value:tieuquy})
		common_sdk.setInfoUser(list);
	},
	


	playGame(modeId, numPlayed){
		var objectParamsReturn={
			type:numPlayed,
			modeId:modeId,
		}

		if(!game_client.isPlay){
			game_client.isPlay=true;
			if(vtcmAuth.isLogin()){
				game_client.theWheel.startAnimation();
				vtcmEvent.playGame(modeId, numPlayed, objectParamsReturn, this.handlingPlayGame, this.notificationErr, this.setStatusVQ)
			}else{
				game_client.showLogin();
				game_client.isPlay=false;
			}
		}
    },


	handlingPlayGame(objectParamsReturn, response){
        setTimeout(()=>{
            game_client.isPlay=false;
			game_client.resetWheel();
        },3000)
        
		if(response.data.code>=0){
			var data=response.data.data.rewards;
			game_client.pointAvailable=game_client.pointAvailable-data.length;
			var box= document.querySelector('.gift10');
			box.innerHTML='';
			var tieuquy=0;
			var point=0;

			for (let i = 0; i < data.length; i++) {
				var src=game_client.base_url_img+data[i].rewardImageUrl;
				if(data[i].eventCode==='DIEM'){
					point=point+data[i].rewardAmount;
					game_client.number_points=game_client.number_points+data[i].rewardAmount;
				}else{
					tieuquy=tieuquy+data[i].rewardAmount;
					game_client.number_tieuquy=game_client.number_tieuquy+data[i].rewardAmount;
				}
				$(box).append(`<img src=${src} class="img-responsive" alt="" />`);
			}
			$('#popup-quaytc').fadeIn(); 
			game_client.updateResultVQ(point,tieuquy)
			game_client.updatePoint()
			// response.data.data.rewards[0]

		}else if(response.data.code>=-53){
			$('#popup-hetluot').fadeIn();
		}else{
			// var e = document.getElementsByClassName(objectParamsReturn.key);
			// var f=e.item(0);
			// f.innerHTML=response.data.message;

			game_client.notification(response.data.message,'')
		}
	},
	
	resetWheel(){
		game_client.theWheel.stopAnimation(false);
		game_client.theWheel.animation.spins = 10; 
		game_client.theWheel.rotationAngle = 0;   
		game_client.theWheel.draw();   
	},

	
	getHistory(page, modeId, rewardType){
		$('#popup-lichsu').fadeIn();
		if(game_client.totalPage>page && page>=0){
			vtcmEvent.getHistory(page, modeId, rewardType, this.handlingGetHistory, this.notificationErr)
		}
        // if(vtcmAuth.isLogin()){
        //     if(game_client.totalPage>page && page>=0){
        //         vtcmEvent.getHistory(page, modeId, rewardType, this.handlingGetHistory, this.notificationErr)
        //     }
        // } else{
        //     game_client.showLogin();
        // }
    },

	handlingGetHistory(page, modeId,rewardType, response){
		if(response.data.code >=0){
			const items=response.data.data.items;
			game_client.historyItems=items;
			if(items.length>0){
				game_client.totalPage=response.data.data.totalPage;
				var tb = document.getElementById('tb_history');
				tb.innerHTML='';
				for (let i = 0; i < items.length; i++) {
					$(tb).append(`<tr>
									<th>${i+1 + (page*10)}</th>
									<td>${vtcmAuth.getUserName()}</td>
									<td>${game_client.timeConvert(items[i].createdTime)}</td>
									<td>${items[i].description}</td>
								</tr>`);
				}
				game_client.page=page;
				game_client.modeId_history=modeId;
				$('#popup-lichsu').fadeIn();
			}else{
				$('#popup-error').fadeIn(); 
				var e = document.getElementsByClassName('sdk_text_notify');
				var f=e.item(0);
				f.innerHTML= 'Dánh sách trống.';
			}
			
		}else{
			$('#popup-error').fadeIn(); 
			var e = document.getElementsByClassName('sdk_text_notify');
			var f=e.item(0);
			f.innerHTML= response.data.message;
		}
	},

    previous(){
        game_client.getHistory(game_client.page-1, game_client.modeId_history)
    },

    next(){
        game_client.getHistory(game_client.page+1, game_client.modeId_history)
    },

	showPopupGiftcode(type){
		var item=game_client.historyItems.filter(v => v.id===type);
		var e = document.getElementsByClassName('sdk_content_giftcode');
		var f=e.item(0);
		f.innerHTML= item[0].description;
		$('#popup-giftcode').fadeIn();
	},


	exchangeRewards(modeId, roomId){
		var objectParamsReturn={
			roomId:roomId,
			modeId:modeId,
			value:1,
		}

        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewards(modeId,roomId, 1,objectParamsReturn, this.handlingExchangeRewards, this.notificationErr);
        } else{
			game_client.showLogin();
        }
    },

	handlingExchangeRewards(objectParamsReturn, response){
		if(response.data.code >= 0){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
			var e = document.getElementsByClassName('box-code');
			var f=e.item(0);
			f.innerHTML=response.data.data.rewards[0].rewardCode;
			game_client.contentGiftcode=response.data.data.rewards[0].rewardCode;
			$('#popup-code').fadeIn();
		}else if(response.data.code===-53){
			if(objectParamsReturn.modeId===10001){
				$('#popup-1').fadeIn();
			}else{
				$('#popup-diemkhongdu').fadeIn();
			}
		}else{
			game_client.notification(response.data.message,'')
		}
	},

	exchangeRewardsWithMilestones(modeId, roomId, value){
		var objectParamsReturn={
			roomId:roomId,
			modeId:modeId,
			value:value,
		}

        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewardsWithMilestones(modeId,roomId, value ,objectParamsReturn, this.handlingExchangeRewardsWithMilestones, this.notificationErr);
        } else{
			game_client.showLogin();
        }
    },

	handlingExchangeRewardsWithMilestones(response, objectParamsReturn){
		if(response.data.code >= 0){
			
			var e = document.getElementsByClassName('box-code');
			var f=e.item(0);
			f.innerHTML=response.data.data.rewards[0].rewardCode;
			game_client.contentGiftcode=response.data.data.rewards[0].rewardCode;
			$('#popup-code').fadeIn();
		}else{
			game_client.notification(response.data.message,'')
		}
	},

	

	copyGiftcode(){
		game_client.copyToClipboard(game_client.contentGiftcode);
	},

	copyToClipboard(text) {
		var textField = document.createElement('textarea');
		textField.innerText = text;
		document.body.appendChild(textField);
		textField.select();
		textField.focus(); 
		document.execCommand('copy');
		textField.remove();
		// ajax-error.focus(); 
	},

	reciveGiftcode(){
		window.open(`https://scoin.vn/nhap-code?GameId=330409`, "_blank");
	},

	hidePopupNhanqua(){
		$('#popup-nhanqua').fadeOut();
	},

	hidePopupNhanqua10(){
		$('#popup-nhanqua10').fadeOut();
	},

	reciveTieuQuy(){
		$('#popup-1').fadeOut();
	},

	recivePoint(){
		$('#popup-diemkhongdu').fadeOut();
	},

	
	notificationErr(objectParamsReturn, error){
		// var e = document.getElementsByClassName(objectParamsReturn.key);
		// var f=e.item(0);
		// f.innerHTML=error.response.data.message;
		game_client.notification(error.response.data.message, '')
	},

	setStatusVQ(){
		game_client.isPlay=false;
	},

	setStatusLatThe(){
		game_client.isPlayPickup=false;
	},

	showLogin(){
		$('#popup-log').fadeIn();
	},

	notificationErrRollup(objectParamsReturn, error){
		$('#popup-error').fadeIn(); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= error.response.data.message;
	},

	notification(message, id_popup){
		$('#popup-error').fadeIn(); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= message;
	},

	notificationServer(message, id_popup){
		$('#popup-error-server').fadeIn(); 
		var e = document.getElementsByClassName('sdk_text_notify_server');
		var f=e.item(0);
		f.innerHTML= message;
	},

	// showLogin(){
	// 	$('#popup-login').fadeIn(); 
	// },

	timeConvert(time){
        var a = new Date(time);
        var m=a.getMonth()+1;
        var month =m > 9 ? m : `0${m}`;
        var date = a.getDate();
        var hour = a.getHours() > 9 ? a.getHours() : `0${a.getHours()}`;
		var min = a.getMinutes() > 9 ? a.getMinutes() : `0${a.getMinutes()}`;
        var s = `${hour}H${min}  -  ${date} - ${month}`;
		return s;
    },

	checkTime(time){
		if(Date.now() > time){
			var a = new Date(time);
			var b = new Date();
			var m=a.getMonth()+1;
			var y=a.getFullYear();
			var day_a = a.getDate();
			var day_b = b.getDate();
			if(day_b >= day_a){
				return day_b-day_a+1;
			}else{
				var day_b=day_b+game_client.daysInMonth(m,y);
				return day_b-day_a+1;
			}
		}else{
			return -1;
		}

        // var a = new Date(time);
        // var m=a.getMonth()+1;
        // var month =m > 9 ? m : `0${m}`;
        // var date = a.getDate();
		// return s;
    },

	daysInMonth (month, year) {
		return new Date(year, month, 0).getDate();
	}
};