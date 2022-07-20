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
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
		game_client.sendLinkShare(10198, 10167);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
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

	cbwithtoken(response){
		game_client.setDataToUI(response)
		game_client.setDataUser(response)
		game_client.uiLine(response);
		game_client.uiBocbanh(response);
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
        var obj_tiktok=data.filter(v =>v.code===contants.EVT_TIKTOK_URL);
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
        {id:'sdk_tiktok', value:obj_tiktok[0] ? obj_tiktok[0].value : ''},

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
        list.push({id:'sdk_account_user', value:user.userName}, {id:'sdk_numberpoint', value:user.pointAvailable})
        // var event_rewards=this.config_.arr_event_change_rewards;
        // for (let i = 0; i < event_rewards.length; i++) {
        //     var obj=rewardExchange.filter(v=>v.eventCode===event_rewards[i].name);
        //     var number_x=obj.length > 0 ? obj[0].totalAvailable : 0;
        //     let s={
        //         id:event_rewards[i].classname,
        //         value:number_x
        //     }
        //     list.push(s);
        // }
		var obj_dangxinh=rewardExchange.filter(v=>v.eventCode==="DANGXINH");
		var number_dangxinh=obj_dangxinh.length > 0 ? obj_dangxinh[0].totalAvailable : '0';
		number_dangxinh=number_dangxinh > 9 ? number_dangxinh : `0${number_dangxinh}`;

		var obj_camxuc=rewardExchange.filter(v=>v.eventCode==="CAMXUC");
		var number_camxuc=obj_camxuc.length > 0 ? obj_camxuc[0].totalAvailable : '0';
		number_camxuc=number_camxuc > 9 ? number_camxuc : `0${number_camxuc}`;

		var obj_catinh=rewardExchange.filter(v=>v.eventCode==="CATINH");
		var number_catinh=obj_catinh.length > 0 ? obj_catinh[0].totalAvailable : '0';
		number_catinh=number_catinh > 9 ? number_catinh : `0${number_catinh}`;

		var obj_luayeu=rewardExchange.filter(v=>v.eventCode==="LUAYEU");
		var number_luayeu=obj_luayeu.length > 0 ? obj_luayeu[0].totalAvailable : '0';
		number_luayeu=number_luayeu > 9 ? number_luayeu : `0${number_luayeu}`;

		var obj_chatphieu=rewardExchange.filter(v=>v.eventCode==="CHATPHIEU");
		var number_chatphieu=obj_chatphieu.length > 0 ? obj_chatphieu[0].totalAvailable : '0';
		number_chatphieu=number_chatphieu > 9 ? number_chatphieu : `0${number_chatphieu}`;

		listRewards.push({id:'DANGXINH', value:number_dangxinh}, {id:'CAMXUC', value:number_camxuc}, 
		{id:'CATINH', value:number_catinh}, {id:'LUAYEU', value:number_luayeu}, {id:'CHATPHIEU', value:number_chatphieu});
		game_client.setNumberAlbum(number_dangxinh);
		game_client.listAlbum=listRewards;

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
			game_client.notification("Bạn chưa đăng nhập.", 'pop__mission')
        }
	},

	handlingRollup(objectParamsReturn, response){
		$('#pop__mission').modal('hide');
		if(objectParamsReturn.roomId===10168){
			if(response.data.code >= 0){
				game_client.notification("Điểm danh thành công. Bạn nhận được 1 lượt chơi.",'')
			}else{
				game_client.notification(response.data.message, '')
			}
		}else if(objectParamsReturn.roomId===10169){
			if(response.data.code >= 0){
				game_client.notification("Chia sẻ thành công. Bạn nhận được 1 lượt chơi.",'')
			}else{
				game_client.notification(response.data.message, '')
			}
		}
	},
	


	playGame(modeId, numPlayed, key, message){
		var objectParamsReturn={
			type:numPlayed,
			modeId:modeId,
			key:key, 
			message:message
		}
		var e = document.getElementsByClassName(key);
		var f=e.item(0);
		f.innerHTML=''
        if(!game_client.isPlay){
            game_client.isPlay=true;
            if(vtcmAuth.isLogin()){
				vtcmEvent.playGame(modeId, numPlayed, objectParamsReturn, this.handlingPlayGame, this.notificationErr, this.setStatusVQ)
            }else{
                game_client.isPlay=false;
                var e = document.getElementsByClassName(key);
				for (let j = 0; j < e.length; j++) {
					var f=e.item(0);
					f.innerHTML= "Bạn chưa đăng nhập";
				}
            }
        }
    },

	handlingPlayGame(objectParamsReturn, response){
        setTimeout(()=>{
            game_client.isPlay=false;
        },1000)
        
		if(response.data.code>=0){
			var className=game_client.getAlbum(response.data.data.rewards[0])
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=`<p>Chúc mừng bạn nhận được album:</p>
			<div class="albumImage ${className}"></div>`

			var imgReward=game_client.getAlbumReward(response.data.data.rewards[0])
			var i = document.getElementsByClassName('album_rewards');
			var h=i.item(0);
			$(h).addClass(imgReward);

		}else{
			// var e = document.getElementsByClassName(objectParamsReturn.key);
			// var f=e.item(0);
			// f.innerHTML=response.data.message;
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=response.data.message;
		}
	},

	nextAlbum(){
		var pos = game_client.listAlbum.map(function(e) { return e.id; }).indexOf(game_client.currentNameAlbum);
		if(pos !== -1){
			if(pos===4){
				pos=-1;
			}
			var item=game_client.listAlbum[pos+1];
			game_client.currentNameAlbum=item.id;
			game_client.setNumberAlbum(item.value)
		}else{
			game_client.setNumberAlbum('00')
		}
	},

	backAlbum(){
		var pos = game_client.listAlbum.map(function(e) { return e.id; }).indexOf(game_client.currentNameAlbum);
		if(pos !== -1){
			if(pos===0){
				pos=6;
			}
			var item=game_client.listAlbum[pos-1];
			game_client.currentNameAlbum=item.id;
			game_client.setNumberAlbum(item.value)
		}else{
			game_client.setNumberAlbum('00')
		}
	
	},

	setNumberAlbum(content){
		var e = document.getElementsByClassName('numAlbum');
		var f=e.item(0);
		f.innerHTML= content;
	},

	getAlbum(item){
		var className=''
		switch (item.eventCode) {
			case "DANGXINH":
				className = 'albumImage--1'
				break;
			case "CAMXUC":
				className = 'albumImage--2'
				break;
			case "CATINH":
				className = 'albumImage--3'
				break;
			case "LUAYEU":
				className = 'albumImage--4'
				break;
			case "CHATPHIEU":
				className = 'albumImage--5'
				break;
			default:
				className = 'albumImage--1'
				break;
		}
		return className;
	},

	getAlbumReward(item){
		var className=''
		switch (item.eventCode) {
			case "DANGXINH":
				className = 'abum--1'
				break;
			case "CAMXUC":
				className = 'abum--2'
				break;
			case "CATINH":
				className = 'abum--3'
				break;
			case "LUAYEU":
				className = 'abum--4'
				break;
			case "CHATPHIEU":
				className = 'abum--5'
				break;
			default:
				className = 'albumImage--1'
				break;
		}
		return className;
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
					$(tb).append(`<tr>
					<th class="text-primary" scope="row">${i+1 + (page*10)}</th>
					<td class="text-start">${items[i].description}</td>
					<td class="text-primary text-nowrap">${game_client.timeConvert(items[i].createdTime)}</td>
					<td class="text-blue">ĐÃ NHẬN</td>
				  </tr>`);
				}
				game_client.page=page;
				game_client.modeId_history=modeId;
				game_client.rewardType=rewardType;
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
        game_client.getHistory(game_client.page-1, game_client.modeId_history, game_client.rewardType)
    },

    next(){
        game_client.getHistory(game_client.page+1, game_client.modeId_history, game_client.rewardType)
    },

	exchangeRewards(modeId, value, key, message, id_popup, id_popup_result){
		var objectParamsReturn={
			modeId:modeId,
			value:value,
			key:key, 
			message:message
		}
		var e = document.getElementsByClassName(key);
		var f=e.item(0);
		f.innerHTML='';
		$(`#${id_popup}`).modal('hide'); 
        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewards(modeId, value,objectParamsReturn, this.handlingExchangeRewards, this.notificationErr)
        } else{
			setTimeout(()=>{
				$(`#${id_popup_result}`).modal('hide'); 
			},1)
			
			game_client.notification("Bạn chưa đăng nhập");
        }
    },

	handlingExchangeRewards(objectParamsReturn, response){
		if(response.data.code >= 0){
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=response.data.data.rewards[0].rewardCode;
			game_client.contentGiftcode=response.data.data.rewards[0].rewardCode;
		}else{
			var e = document.getElementsByClassName(objectParamsReturn.key);
			var f=e.item(0);
			f.innerHTML=response.data.message;
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
            game_client.notification("Bạn chưa đăng nhập",'pop__mission')
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
		if(inviden!==null){
			if(vtcmAuth.isLogin()){
				vtcmEvent.sendLinkShare(modeId, roomId, inviden, this.handlingSendLinkShare, this.notification)
			} else{
				game_client.notification("Bạn chưa đăng nhập",'')
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
		ajax-error.focus(); 
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