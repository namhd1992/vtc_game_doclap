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
	currentNameAlbum:'DANGXINH',
	listAlbum:[],
	linkShare:'',
	contentGiftcode:'',
	oldClass:'',
	pointAvailable:0,
	theWheel:{},
	
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		game_client.winwheel();
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
		game_client.sendLinkShare(10198, 10167);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
			// $('#popup-chose').fadeIn();
            document.getElementById("username").innerHTML = vtcmAuth.getUserName();
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";

        }else{
			vtcmApp.getAppSetting(game_client.setDataToUI);
            document.getElementById("logout").style.display = "none";
            document.getElementById("login").style.display = "block";
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
		
		loadedImg.src = "../images/wheel.png";
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
        list.push({id:'sdk_account_user', value:user.userName}, {id:'sdk_numberpoint', value:user.pointAvailable})

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
			game_client.notification(`Bạn chưa đăng nhập. <a style="color:red;cursor: pointer;" cusr onclick="vtcmAuth.login()">Đăng Nhập</a>`, 'pop__mission')
        }
	},

	handlingRollup(objectParamsReturn, response){
		$('#pop__mission').modal('hide');
		if(objectParamsReturn.roomId===10168){
			if(response.data.code >= 0){
				game_client.pointAvailable=game_client.pointAvailable+1;
				game_client.updatePoint();
				game_client.notification("Điểm danh thành công. Bạn nhận được 1 lượt chơi.",'')
			}else{
				game_client.notification(response.data.message, '')
			}
		}else if(objectParamsReturn.roomId===10169){
			if(response.data.code >= 0){
				game_client.pointAvailable=game_client.pointAvailable+1;
				game_client.updatePoint();
				game_client.notification("Chia sẻ thành công. Bạn nhận được 1 lượt chơi.",'')
			}else{
				game_client.notification(response.data.message, '')
			}
		}
	},

	updatePoint(){
		var list=[];
		list.push({id:'sdk_numberpoint', value:game_client.pointAvailable})
		common_sdk.setInfoUser(list);
	},
	


	playGame(modeId, numPlayed, key){
		var objectParamsReturn={
			type:numPlayed,
			modeId:modeId,
			key:key
		}

        if(!game_client.isPlay){
            game_client.isPlay=true;
            if(vtcmAuth.isLogin()){
				game_client.theWheel.startAnimation();
				vtcmEvent.playGame(modeId, numPlayed, objectParamsReturn, this.handlingPlayGame, this.notificationErr, this.setStatusVQ)
            }else{
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
			// response.data.data.rewards[0]

		}else{
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=response.data.message;
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
            $('#modal-warning-login').modal('show'); 
        }
    },

	handlingGetHistory(page, modeId,rewardType, response){
		if(response.data.code >=0){
			const items=response.data.data.items;
			if(items.length>0){
				game_client.totalPage=response.data.data.totalPage;
				var tb = document.getElementById('tb_history');
				tb.innerHTML='';
				for (let i = 0; i < items.length; i++) {
					if(items[i].rewardType===13){
						$(tb).append(`<tr>
						<th class="text-primary" scope="row">${i+1 + (page*10)}</th>
						<td class="text-start">${items[i].description}</td>
						<td class="text-primary text-nowrap">${game_client.timeConvert(items[i].createdTime)}</td>
						<td class="text-blue">ĐÃ NHẬN</td>
					  </tr>`);
					}else if(items[i].rewardType===5){
						$(tb).append(`<tr>
						<th class="text-primary" scope="row">${i+1 + (page*10)}</th>
						<td class="text-start">${items[i].description}</td>
						<td class="text-primary text-nowrap">${game_client.timeConvert(items[i].createdTime)}</td>
						<td class="text-blue" style="cursor: pointer;" onclick="game_client.showPopupGiftcode(${items[i]})">ĐÃ NHẬN</td>
					  </tr>`);
					}else if(items[i].rewardType===52){
						$(tb).append(`<tr>
						<th class="text-primary" scope="row">${i+1 + (page*10)}</th>
						<td class="text-start">${items[i].description}</td>
						<td class="text-primary text-nowrap">${game_client.timeConvert(items[i].createdTime)}</td>
						<td class="text-blue" style="cursor: pointer;" onclick="game_client.showPopupDoiThuong(${items[i]})">ĐỔI NGAY</td>
					  </tr>`);
					}
					
				}
				game_client.page=page;
				game_client.modeId_history=modeId;
				$('#modal-lich-su').modal('show'); 
			}else{
				$('#modal-notify').modal('show'); 
				var e = document.getElementById('content_notify');
				e.innerText='Bạn chưa có dữ liệu chơi.';
			}
			
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	},

    previous(){
        game_client.getHistory(game_client.page-1, game_client.modeId_history)
    },

    next(){
        game_client.getHistory(game_client.page+1, game_client.modeId_history)
    },

	showPopupGiftcode(item){

	},

	showPopupDoiThuong(item){

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

	share(modeId, roomId){
		window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`)
		game_client.rollup(modeId, roomId)
	},

	getLinkShare(modeId, roomId){
		if(vtcmAuth.isLogin()){
            vtcmEvent.getLinkShare(modeId, roomId, 'pop__mission', this.handlingGetLinkShare, this.notification)
        } else{
            // game_client.notification("Bạn chưa đăng nhập",'pop__mission')
			game_client.notification(`Bạn chưa đăng nhập. <a style="color:red;cursor: pointer;" cusr onclick="vtcmAuth.login()">Đăng Nhập</a>`, 'pop__mission')
        }
	},

	handlingGetLinkShare(response){
		if(response.data.code>=0){
			var link=window.location.href +'?inviden=' + response.data.data.inviteCode;
			game_client.linkShare=link;
		}else{

		}
	},

	sendLinkShare(modeId, roomId){
		var inviden = common_sdk.parse_query_string("inviden", window.location.href);
		var local_inviden=localStorage.getItem("inviden");
		if (local_inviden != null) {
			vtcmEvent.sendLinkShare(modeId, roomId, local_inviden, this.handlingSendLinkShare, this.notification);
			localStorage.removeItem('inviden');
		}else{
			if(inviden!==null){
				if(vtcmAuth.isLogin()){
					vtcmEvent.sendLinkShare(modeId, roomId, inviden, this.handlingSendLinkShare, this.notification)
				} else{
					localStorage.setItem("inviden", inviden);
					game_client.notification(`Bạn chưa đăng nhập. <a style="color:red;cursor: pointer;" cusr onclick="vtcmAuth.login()">Đăng Nhập</a>`, '')
				}
			}
		}
	},

	handlingSendLinkShare(response){
		if(response.data.code>=0){
			console.log('thành công')
			// game_client.notification("",'')
		}else{
			console.log('thất bại')
			// game_client.notification("",'')
		}
	},

	copyLink(){
		// navigator.clipboard.writeText(game_client.linkShare);
		game_client.copyToClipboard(game_client.linkShare)
	},

	copyGiftcode(){
		// $('.copyGc').copyOnClick({copyMode:"val",confirmClass:"copy-confirmation",});
		game_client.copyToClipboard(game_client.contentGiftcode)
		// navigator.clipboard.writeText(game_client.contentGiftcode);
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


	bocbanh(number, key){
		var n=number > 16 ? 16 : number;
        for (let i = 1; i <= n; i++) {
            var e = document.getElementById(key + i);
            e.classList.add("hide");
        }
    },

	exchangeRewardsWithMilestones(modeId, value){
        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewardsWithMilestones(modeId, value, this.handlingExchangeRewardsWithMilestones, this.notificationErr)
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

	handlingExchangeRewardsWithMilestones(response){
		if(response.data.code >= 0){
			$('#modal-nhan-code').modal('show'); 
			document.getElementById('modal-form-code').value=response.data.data.rewards[0].rewardCode;
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	},


	getBXHLiXi(){
        vtcmEvent.getBXHLiXi(this.handlingGetBXHLiXi, this.notificationErr);
    },

	handlingGetBXHLiXi(response){
		if(response.data.code>=0){
			var tb = document.getElementById('tb_modal_bxh');
			var list=response.data.data;
			for (let i = 0; i < list.length; i++) {
				$(tb).append(`<tr>
				<th class="text-primary" scope="row">${list[i].order}</th>
				<th>${list[i].userName}</th>
				<td>${list[i].totalAmount}</td>
			</tr>`);
			}
			$('#modal-bxh').modal('show');
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	}, 

	chonphe(type){
		if(type=='black'){
			game_client.grayBlack();
		}else{
			game_client.grayWhite();
		}
		$('#popup-chonphe').fadeOut();
	},

	grayWhite(){
		var a= document.querySelector('.frame3-content > .white');
		a.style.filter = 'grayscale(1)'
	},

	grayBlack(){
		var a= document.querySelector('.frame3-content > .black');
		a.style.filter = 'grayscale(1)'
	},

	notificationErr(objectParamsReturn, error){
		var e = document.getElementsByClassName(objectParamsReturn.key);
		var f=e.item(0);
		f.innerHTML=error.response.data.message;
	},

	setStatusVQ(){
		game_client.isPlay=false;
	},

	setStatusLatThe(){
		game_client.isPlayPickup=false;
	},

	notificationErrRollup(objectParamsReturn, error){
		$('#pop__notify').modal('show'); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= error.response.data.message;
	},

	notification(message, id_popup){
		if(id_popup!==''){
			setTimeout(()=>{
				$(`#${id_popup}`).modal('hide'); 
			},1)
		}
		$('#pop__notify').modal('show'); 
		var e = document.getElementsByClassName('sdk_text_notify');
		var f=e.item(0);
		f.innerHTML= message;
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

// const MODE_ID_LIXI=100007;
// const MODE_ID_VQ=100007;

// $(document).ready(function(){
// 	'use strict';
//     const vtcmAppConfig = {
//         host: "http://abc.com",
// 		gameId:100004,
// 		apiBaseUrl: 'http://api.gf.splay.vn',
// 		client_id: "GF_EVENTS_WEB",
// 		client_secret: "aP6k2Ql68arPH8l",
// 		// url_return:`http://tramtien.splay.vn/mungdoclap`,
// 		// path:'/mungdoclap'
// 		url_return:`http://127.0.0.1:5500/doclap/tramtien/index.html`,
// 		path:'/doclap/tramtien/index.html'
//     };
//     game_client.initApp(vtcmAppConfig);
// });