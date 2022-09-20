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
	number_banhxanh:0,
	number_banhvang:0,
	number_banhtrang:0,
	number_banhdo:0,
	historyItems:[],
	link_group_fb:'',
	link_page_fb:'',
	userData:{},
	base_url_img:'',
	list_data_goi1:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'3'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'5'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'6'},{key:'BANHDO', img:'./images/banh-do.png', value:'1'}],
	list_data_goi2:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'5'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'15'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'10'},{key:'BANHDO', img:'./images/banh-do.png', value:'3'}],
	list_data_goi3:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'10'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'15'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'20'},{key:'BANHDO', img:'./images/banh-do.png', value:'5'}],
	list_data_goi4:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'15'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'30'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'30'},{key:'BANHDO', img:'./images/banh-do.png', value:'10'}],
	list_data_goi5:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'25'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'50'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'50'},{key:'BANHDO', img:'./images/banh-do.png', value:'20'}],
	list_data_goi6:[{key:'BANHXANH', img:'./images/banh-xanh.png', value:'80'},{key:'BANHVANG', img:'./images/banh-vang.png', value:'100'},{key:'BANHTRANG', img:'./images/banh-trang.png', value:'100'},{key:'BANHDO', img:'./images/banh-do.png', value:'50'}],
	modeId_change_bonus:'',
	value_change_bonus:1,
	goi_change:[],
	_numberScoin:0,
	_numberScoinToPoint:0,
	
	
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
			game_client.getUserData();
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "inline-block";

        }else{
			vtcmApp.getAppSetting(game_client.setDataToUI);
            document.getElementById("logout").style.display = "none";
            document.getElementById("login").style.display = "inline-block";
        }
		
	},


	cbwithtoken(response){
		game_client.setDataToUI(response)
		game_client.setDataUser(response)
		game_client.uiLine(response);
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
		var obj_evt_guide_sokeo=data.filter(v =>v.code===contants.EVT_GUIDE_SO_KEO);
		var obj_evt_rollup=data.filter(v =>v.code===contants.EVT_ROLLUP_CONTENT);
		var obj_rewards=data.filter(v =>v.code===contants.EVT_REWARDS);
		var obj_meta_title=data.filter(v =>v.code===contants.EVT_META_TITLE);
		var obj_meta_desc=data.filter(v =>v.code===contants.EVT_META_DESC);
		var obj_meta_img=data.filter(v =>v.code===contants.EVT_IMAGE_URL);
		var obj_welfare=data.filter(v =>v.code===contants.EVT_WELFARE);

		var obj_goi1=data.filter(v =>v.code===contants.EVT_IMG_GOI_1);
		var obj_goi2=data.filter(v =>v.code===contants.EVT_IMG_GOI_2);
		var obj_goi3=data.filter(v =>v.code===contants.EVT_IMG_GOI_3);
		var obj_goi4=data.filter(v =>v.code===contants.EVT_IMG_GOI_4);
		var obj_goi5=data.filter(v =>v.code===contants.EVT_IMG_GOI_5);
		var obj_goi6=data.filter(v =>v.code===contants.EVT_IMG_GOI_6);

	  
		var obj_rollup_points=data.filter(v =>v.code===contants.EVT_ROLLUP_POINTS);
		var obj_recharge_url=data.filter(v =>v.code===contants.EVT_RECHARGE_URL);
		var obj_payment_url=data.filter(v =>v.code===contants.EVT_PAYMENT_URL);
		var obj_moruong=data.filter(v =>v.code===contants.EVT_MORUONG_CONTENT);
		var obj_base_url_img=data.filter(v =>v.code===contants.CDN_URL);
		game_client.base_url_img=obj_base_url_img[0] ? obj_base_url_img[0].value : ''
	
		var obj_title=data.filter(v =>v.code===contants.EVT_NAME);
		document.title=obj_title[0] ? obj_title[0].value : '';
		game_client.link_group_fb=obj_group_fb[0] ? obj_group_fb[0].value : '';
		game_client.link_page_fb=obj_fanpage_fb[0] ? obj_fanpage_fb[0].value : '';

		var list_src_img=[{id:"sdk_goi_1", value:obj_goi1[0] ? obj_goi1[0].value : ''},
        {id:'sdk_goi_2', value:obj_goi2[0] ? obj_goi2[0].value : ''},
        {id:'sdk_goi_3', value:obj_goi3[0] ? obj_goi3[0].value : ''},
		{id:'sdk_goi_4', value:obj_goi4[0] ? obj_goi4[0].value : ''},
        {id:'sdk_goi_5', value:obj_goi5[0] ? obj_goi5[0].value : ''},
		{id:'sdk_goi_6', value:obj_goi6[0] ? obj_goi6[0].value : ''}];

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
		{id:'sdk_content_thelesk', value:obj_evt_guide_sokeo[0] ? obj_evt_guide_sokeo[0].value : ''},
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

		common_sdk.setSrcToImg(list_src_img);
		common_sdk.setLinkToItem(list_item_link);
		common_sdk.setContentToItem(list_item_content);
		common_sdk.setContentMeta(list_item_meta);
	},

	setDataUser(response){
		var user=response.data.data.user;
		var rewardExchange=response.data.data.rewardExchange;
		var number_play=response.data.data.playSummary[0] ? response.data.data.playSummary[0].playerCount : 0;
        var list=[];
		game_client.pointAvailable=user.amountAvailable;
        list.push({id:'username', value:user.userName}, {id:'sdk_numberpoint', value:user.amountAvailable}, {id:'sdk_numberscoin', value:game_client._numberScoin})
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

	getUserData(){
		var data={};
        data.userId=vtcmAuth.getUserId();
		data.userName=vtcmAuth.getUserName();
        data.gameId=vtcmApp.config_.gameId;
		vtcmEvent.getBalanceScoin(data, this.handlingGetUserData, this.notification)
	},

	handlingGetUserData(res){
		if(res.data.code >= 0){
			game_client._numberScoin=res.data.data.balance;
			game_client.updatePoint()
		}
	},

	setInfoGame(){
		var data=game_client.userData;
		var list=[];
		list.push({id:'server_game', value:data.serverName},{id:'nhanvat_game', value:data.characterName})
		common_sdk.setInfoUser(list);
	},


	updateUserData(data){
		var objectParamsReturn=data;
		vtcmEvent.updateUserData(data, objectParamsReturn, this.handlingUpdateUserData, this.notification)
	},

	handlingUpdateUserData(res, objectParamsReturn){
		if(res.data.code >= 0){
			game_client.userData=res.data.data;
			game_client.setInfoGame();
		}
	},


	rollup(modeId, roomId){
		var objectParamsReturn={
			modeId:modeId,
			roomId:roomId, 
		}
		vtcmEvent.rollup(modeId, roomId,objectParamsReturn, this.handlingRollup, this.notificationErrRollup)
		
	},

	handlingRollup(objectParamsReturn, response){
		$('#popup-themluot').fadeOut();
		if(response.data.code >= 0){
			game_client.pointAvailable=game_client.pointAvailable+1;
			game_client.updatePoint();
			game_client.notification('Bạn được cộng thêm 1 lượt.', '')
		}
		else{
			
			game_client.notification(response.data.message, '')
		}
	},

	updatePoint(){
		var list=[];
		list.push({id:'sdk_numberpoint', value:game_client.pointAvailable}, {id:'sdk_numberscoin', value:game_client._numberScoin})
		common_sdk.setInfoUser(list);
	},
	
	getHistory(page, modeId, rewardType){
        if(vtcmAuth.isLogin()){
            if(game_client.totalPage>page && page>=0){
                vtcmEvent.getHistory(page, modeId, rewardType, this.handlingGetHistory, this.notificationErr)
            }
        } else{
            game_client.showLogin();
        }
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
						<th class="text-primary" scope="row">${i+1 + (page*10)}</th>
						<td class="text-start">${items[i].description}</td>
						<td class="text-primary text-nowrap">${items[i].rewardCode}</td>
					  </tr>`);
				}
				game_client.page=page;
				game_client.modeId_history=modeId;
				$('#modal-lsmr').modal('show');
			}else{
				$('#popup-error').modal('show'); 
				var e = document.getElementsByClassName('sdk_text_notify');
				var f=e.item(0);
				f.innerHTML= 'Dánh sách trống.';
			}
			
		}else{
			$('#popup-error').modal('show'); 
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

	showModalChangeScoin(){
		$('#modal-shop-khoa').modal('show');
	},

	changeScoin(){
		const point = document.getElementById('modal-sk-form-sl');
		const scoin = document.getElementById('modal-sk-form-tg');
		scoin.value=point.value;
		game_client._numberScoinToPoint=point.value;
	},

	topupsScoinToPoint(){
		var data={};
        data.totalAmount=+this.removeZero(game_client._numberScoinToPoint);

		if(vtcmAuth.isLogin()){
            vtcmEvent.topupsScoinToPoint(data, this.handlingTopupsScoinToPoint, this.notificationErr)
        } else{
            game_client.showLogin();
        }
	},

	handlingTopupsScoinToPoint(res){
		if(res.data.code >= 0){
			game_client._numberScoin=game_client._numberScoin- (+game_client._numberScoinToPoint);
			game_client.pointAvailable=game_client.pointAvailable + (+game_client._numberScoinToPoint);
			game_client.updatePoint();
			const point = document.getElementById('modal-sk-form-sl');
			const scoin = document.getElementById('modal-sk-form-tg');
			scoin.value='';
			point.value='';
			game_client.notification('Đổi thành công!','')
			$('#modal-shop-khoa').modal('hide');
		}
	},

	removeZero(v) {
		if ( v.charAt(0) == 0 ) {
			return v.slice(1);
		}
		return v;
	},

	purchases(itemId){
		var data={};
        data.total=1;
		data.itemId=itemId;
		if(vtcmAuth.isLogin()){
            vtcmEvent.purchases(data, this.handlingPurchases, this.notificationErr)
        } else{
            game_client.showLogin();
        }
	},

	handlingPurchases(res){
		if(res.data.code >= 0){
			
		}
	},



	showPopupGiftcode(type){
		var item=game_client.historyItems.filter(v => v.id===type);
		var e = document.getElementsByClassName('sdk_content_giftcode');
		var f=e.item(0);
		f.innerHTML= item[0].description;
		$('#popup-giftcode').fadeIn();
		// console.log(item)
	},

	showPopupDoiThuong(type){
		var item=game_client.historyItems.filter(v => v.id===type);
		$('#popup-dknt').fadeIn();
	},


	exchangeRewards(modeId, roomId){
		var objectParamsReturn={
			roomId:roomId,
			modeId:modeId,
			value:1,
		}

        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewards(modeId,roomId, value,objectParamsReturn, this.handlingExchangeRewards, this.notificationErr);
        } else{
			game_client.showLogin();
        }
    },

	handlingExchangeRewards(objectParamsReturn, response){
		if(response.data.code >= 0){
			var e = document.getElementsByClassName('box-code');
			var f=e.item(0);
			f.innerHTML=response.data.data.rewards[0].rewardCode;
			game_client.contentGiftcode=response.data.data.rewards[0].rewardCode;
		}else{
			game_client.notification(response.data.message,'')
		}
	},

	exchangeRewardsWithMilestones(modeId, roomId, value){
		var objectParamsReturn={
			roomId:roomId,
			modeId:modeId,
			value:1,
		}
        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewardsWithMilestones(modeId, roomId, value, objectParamsReturn, this.handlingExchangeRewardsWithMilestones, this.notificationErr)
        } else{
            game_client.showLogin();
        }
    },

	handlingExchangeRewardsWithMilestones(response, objectParamsReturn){
		if(response.data.code >= 0){
			switch (objectParamsReturn.value) {
				case 1:
					$('#modal-qua-top-1').modal('show'); 
					break;
				case 2:
					$('#modal-qua-top-2').modal('show'); 
					break;
				case 3:
					$('#modal-qua-top-3').modal('show'); 
					break;
				default:
					break;
			}
			document.getElementById('modal-form-code').value=response.data.data.rewards[0].rewardCode;
		}else{
			game_client.notification(response.data.message,'')
		}
	},

	hidePopupNhanqua(){
		$('#popup-nhanqua').fadeOut();
	},

	hidePopupNhanqua10(){
		$('#popup-nhanqua10').fadeOut();
	},


	getBXHPayment(){
        vtcmEvent.getBXHPayment(this.handlingGetBXHPayment, this.notificationErr);
    },

	handlingGetBXHPayment(response){
		if(response.data.code>=0){
			var tb = document.getElementById('tb_modal_bxh');
			tb.innerHTML='';
			var list=response.data.data;
			if(list.length>0){
				$('#modal-bxh').modal('show');
				for (let i = 0; i < list.length; i++) {
					$(tb).append(`<tr>
					<th class="text-primary" scope="row">${list[i].order}</th>
					<th>${list[i].userName}</th>
					<td>${list[i].total}</td>
				</tr>`);
				}
			}else{

				game_client.notification(`Danh sách trống.`, '')
			}
		}else{
			game_client.notification(response.data.message, '')
		}
	}, 

	choseBonus(type){

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

	notificationErrRollup(objectParamsReturn, error){
		$('#popup-error').fadeIn(); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= error.response.data.message;
	},

	notification(message, id_popup){
		$('#popup-error').modal('show'); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= message;
	},

	showLogin(){
		$('#popup-log').fadeIn(); 
	},

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
};