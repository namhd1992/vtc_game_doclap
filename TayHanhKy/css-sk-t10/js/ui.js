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
	
	
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		game_client.winwheel();
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
			// game_client.rollup(10206, 10177)
			// game_client.getRewards();
			// game_client.getUserData();
			// $('#popup-chose').fadeIn();
			// $('#popup-dknt').fadeIn();
            document.getElementById("login").style.display = "none";
			document.getElementById("login_m").style.display = "none";
            document.getElementById("logout").style.display = "inline-block";
			document.getElementById("logout_m").style.display = "inline-block";

        }else{
			vtcmApp.getAppSetting(game_client.setDataToUI);
            document.getElementById("logout").style.display = "none";
			document.getElementById("logout_m").style.display = "none";
            document.getElementById("login").style.display = "inline-block";
			document.getElementById("login_m").style.display = "inline-block";
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
		var obj_evt_guide_duatop=data.filter(v =>v.code===contants.EVT_GUIDE_DUATOP);
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
		{id:'sdk_content_duatop', value:obj_evt_guide_duatop[0] ? obj_evt_guide_duatop[0].value : ''},
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
		var number_play=response.data.data.playSummary[0] ? response.data.data.playSummary[0].playerCount : 0;
        var list=[];
		var listRewards=[];
		game_client.pointAvailable=user.pointAvailable;
        list.push({id:'username', value:user.userName}, {id:'sdk_numberpoint', value:user.pointAvailable})

		// var list=[{id:'account_user', value:user.userName},{id:'my_number_goal', value:user.pointAvailable}, {id:'number_play_vq', value:number_play}, {id:'number_bocbanh', value:number_bocbanh}, {id:'number_hoamai', value:number_hoamai}, {id:'number_hoadao', value:number_hoadao}, {id:'number_key', value:number_key}]
		common_sdk.setInfoUser(list);
	},


	getCity(){
		var data={};
        data.parentId=0;
		data.type=2;
		var objectParamsReturn=data;
		vtcmEvent.getUserLocation(data,objectParamsReturn, this.setDataCity, this.notification)
	},

	onchangeCity(){
		var x = document.getElementById("tinh1").value;
		var data={};
        data.parentId=+x;
		data.type=3;
		var objectParamsReturn=data;
		vtcmEvent.getUserLocation(data,objectParamsReturn, this.setDataDistrict, this.notification)
	},

	onchangeDistrict(){
		var x = document.getElementById("quan1").value;
		var data={};
        data.parentId=+x;
		data.type=4;
		var objectParamsReturn=data;
		vtcmEvent.getUserLocation(data,objectParamsReturn, this.setDataPhuong, this.notification)
	},


	setDataCity(res, objectParamsReturn){
		if(res.data.code >= 0){
			var result=res.data.data;
			var data = "";
			$('#quan1').empty();
			$("#quan1").append(' <option value="" id="">Chọn quận huyện</option>');
			$('#phuong').empty();
			$("#phuong").append(' <option value="" id="">Chọn phường xã</option>');
			for (var i = 0; i < result.length; i++) {
				data += "<option value = '" + result[i].id + "'>" + result[i].name + " </option>";
			}
			$("#tinh1").append(data);
		}else{
			game_client.notification(response.data.message, '')
		}
		
	},

	setDataDistrict(res, objectParamsReturn){
		if(res.data.code >= 0){
			var result=res.data.data;
			var data = "";
			$('#quan1').empty();
			$("#quan1").append(' <option value="" id="">Chọn quận huyện</option>');
			$('#phuong').empty();
			$("#phuong").append(' <option value="" id="">Chọn phường xã</option>');
			for (var i = 0; i < result.length; i++) {
				data += "<option value = '" + result[i].id + "'>" + result[i].name + " </option>";
			}
			$("#quan1").append(data);
		}
	},


	setDataPhuong(res, objectParamsReturn){
		if(res.data.code >= 0){
			var result=res.data.data;
			var data = "";
			$('#phuong').empty();
			$("#phuong").append(' <option value="" id="">Chọn phường xã</option>');
			for (var i = 0; i < result.length; i++) {
				data += "<option value = '" + result[i].id + "'>" + result[i].name + " </option>";
			}
			$("#phuong").append(data);
		}else{
			game_client.notification(response.data.message, '')
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
	},

	getUserData(){
		var data={};
        data.userId=vtcmAuth.getUserId();
		data.userName=vtcmAuth.getUserName();
        data.gameId=vtcmApp.config_.gameId;
		vtcmEvent.getUserData(data, this.handlingGetUserData, this.notification)
	},


	handlingGetUserData(res){
		if(res.data.code >= 0){
			game_client.userData=res.data.data;
		}else{
			game_client.notification(response.data.message, '')
		}
	},



	// getListCharacter(){
	// 	vtcmEvent.getListCharacter(this.handlingGetListCharacter, this.notification)
	// },

	// handlingGetListCharacter(res){
	// 	if(res.data.code >= 0){

	// 		console.log(res.data.data);
	// 	}
	// },

	



	updateFormDK(data){
		var objectParamsReturn=data;
		vtcmEvent.updateFormDK(data, objectParamsReturn, this.handlingUpdateFormDK, this.notification)
	},

	handlingUpdateFormDK(res, objectParamsReturn){
		if(res.data.code >= 0){
			game_client.userData=res.data.data;
			game_client.notification('Thông tin đã được ghi nhận.', '')
		}else{
			game_client.notification(response.data.message, '')
		}
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
			game_client.pointAvailable=game_client.pointAvailable+3;
			game_client.updatePoint();
		}
		// else{
		// 	game_client.notification(response.data.message, '')
		// }
	},

	updatePoint(){
		var list=[];
		list.push({id:'sdk_numberpoint', value:game_client.pointAvailable})
		common_sdk.setInfoUser(list);
	},
	


	playGame(modeId, numPlayed){
		if(game_client.userData.voteId!==0){
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
		}else{
			$('#popup-chonphe').fadeIn();
		}
    },


	handlingPlayGame(objectParamsReturn, response){
        setTimeout(()=>{
            game_client.isPlay=false;
			game_client.resetWheel();
        },3000)
        
		if(response.data.code>=0){
			game_client.pointAvailable=game_client.pointAvailable-objectParamsReturn.type;
			var data=response.data.data.rewards;
			var box1= document.querySelector('.content-new-detail > .gift');
			var box10= document.querySelector('.content-new-detail > .gift10');
			box1.innerHTML='';
			box10.innerHTML='';
			for (let i = 0; i < data.length; i++) {
				var src=game_client.base_url_img+data[i].rewardImageUrl;
				
			}
			game_client.updatePoint()
			// response.data.data.rewards[0]

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

	showPopupDoiThuong(type){
		var item=game_client.historyItems.filter(v => v.id===type);
		$('#popup-dknt').fadeIn();
		game_client.getCity();
	},

	exchangeRewards(modeId, value, key, message, id_popup, id_popup_result, id_listalbum){
		var objectParamsReturn={
			modeId:modeId,
			value:value,
			key:key, 
			message:message,
			id_popup_result:id_popup_result
		}
		var e = document.getElementsByClassName(key);
		var f=e.item(0);
		f.innerHTML='';
		$(`#${id_popup}`).modal('hide'); 
        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewards(modeId, value,objectParamsReturn, this.handlingExchangeRewards, this.notificationErr);
        } else{
			setTimeout(()=>{
				$(`#${id_popup_result}`).modal('hide'); 
			},1)
			game_client.notification(`Bạn chưa đăng nhập. <a style="color:red;cursor: pointer;" cusr onclick="vtcmAuth.login()">Đăng Nhập</a>`, '')
        }
    },

	handlingExchangeRewards(objectParamsReturn, response){
		if(response.data.code >= 0){
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=response.data.data.rewards[0].rewardCode;
			game_client.contentGiftcode=response.data.data.rewards[0].rewardCode;
		}else{
			// setTimeout(()=>{
			// 	$(`#${id_popup_result}`).modal('hide'); 
			// },1)
			game_client.notification(response.data.message,objectParamsReturn.id_popup_result)
			// var e = document.getElementsByClassName(objectParamsReturn.key);
			// var f=e.item(0);
			// f.innerHTML=response.data.message;
		}
	},

	hidePopupNhanqua(){
		$('#popup-nhanqua').fadeOut();
	},

	hidePopupNhanqua10(){
		$('#popup-nhanqua10').fadeOut();
	},



	sendFormDK(){
		var input_city=document.getElementById('tinh1');
		var input_district=document.getElementById('quan1');
		var input_phuong=document.getElementById('phuong');
		var name=document.getElementById('hoten1').value;
		var phone=document.getElementById('sdt1').value;
		var address=document.getElementById('address').value;


		var city=input_city.value;
		var district=input_district.value;
		var phuong=input_phuong.value;

		var txt_city=input_city.options[input_city.selectedIndex].text;
		var txt_district=input_district.options[input_district.selectedIndex].text;
		var txt_phuong=input_phuong.options[input_phuong.selectedIndex].text;
		
		if(name!=='' && phone!=='' && city!=='' && district!=='' && phuong!=='' && address!==''){
			var data={};
			data.userId=vtcmAuth.getUserId();
			data.userName=vtcmAuth.getUserName();
			data.gameId=vtcmApp.config_.gameId;
			data.email='';
			data.fullName=name;
			data.phoneNumber=phone;
			data.address=address;
			data.provinceId=city;
			data.provinceName=txt_city;
			data.disctrictId=district;
			data.disctrictName=txt_district;
			data.wardId=phuong;
			data.wardName=txt_phuong;

			game_client.updateFormDK(data);

		}else{
			alert('Hãy nhập đầy đủ thông tin!')
		}
	},

	getBXHPayment(){
        vtcmEvent.getBXHRecharge(this.handlingGetBXHRecharge, this.notificationErr);
    },

	handlingGetBXHRecharge(response){
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
					<td>${list[i].totalAmount}</td>
				</tr>`);
				}
			}else{

				game_client.notification(`Danh sách trống.`, '')
			}
		}else{
			game_client.notification(response.data.message, '')
		}
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

	showLogin(){
		$('#popup-login').fadeIn(); 
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