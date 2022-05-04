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
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		
		this.config_ = rawConfig;
		vtcmApp.initApp(rawConfig);
        if(vtcmAuth.isLogin()){
			vtcmApp.getAppSetting(game_client.cbwithtoken);
			
            document.getElementById("logout").style.display = "none";
            document.getElementById("login").style.display = "block";

        }else{
			vtcmApp.getAppSetting(game_client.setDataToUI);
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
        }



		$("#btn-du-xuan-1").click(function(e) {
			game_client.playGame(1,16,'item_vq_')
		});

		$("#btn-du-xuan-10").click(function(e) {
			game_client.playGame(10,16,'item_vq_')
		});

		$(".btn-lich-su-du-xuan").click(function(e) {
			game_client.getHistory(0, 10003)
		});

		$(".timeline-item").click(function(e) {
			var value=e.currentTarget.getAttribute('value')
			game_client.exchangeRewardsWithMilestones(10004, value)
		});

		$(".btn-nhan-khoa").click(function(e) {
			game_client.exchangeRewards(10006, 1, '')
		});

		$(".btn-nhan-khoa-2").click(function(e) {
			game_client.exchangeRewards(10006, 1, '')
		});
		

		$(".btn-nhan-giftcode").click(function(e) {
			var value=e.currentTarget.getAttribute('value')
			game_client.exchangeRewards(10005, value, 'bb-item_')
		});

		$(".flipbox-item").click(function(e) {
			var id=e.currentTarget.getAttribute('id')
			var content=e.currentTarget.getAttribute('content')
			game_client.playFlipCard(1, id, content)
		});

		$(".btn-lat-10-the").click(function(e) {
			game_client.playFlipCard(10, 'card_', 'content_card_')
		});

		$(".btn-lich-su").click(function(e) {
			game_client.getHistory(0, 10010)
		});

		$(".btn-doi-thuong").click(function(e) {
			var modeId=e.currentTarget.getAttribute('modeId')
			var value=e.currentTarget.getAttribute('value')
			game_client.exchangeRewards(modeId, value,'')
		});

		$(".btn-mo-ruong").click(function(e) {
			game_client.exchangeRewards(10023, 1, '')
		});

		$(".btn-bxh-circle").click(function(e) {
			game_client.getBXHLiXi()
		});
        
		$(".btn-nhan-thuong").click(function(e) {
			var modeId=e.currentTarget.getAttribute('modeId')
			var value=e.currentTarget.getAttribute('value')
			game_client.exchangeRewardsWithMilestones(modeId, value)
		});

		$(".modal-btn-1").click(function(e) {
			var roomId=e.currentTarget.getAttribute('roomId')
			game_client.rollup(10013, roomId)
		});

		$(".modal-btn-2").click(function(e) {
			var modeId=e.currentTarget.getAttribute('modeId')
			game_client.rollup(modeId,0)
		});
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
		if(vtcmAuth.isLogin()){
			vtcmEvent.rollup(modeId, roomId, this.handlingRollup, this.notificationErrRollup)
		}else{
            $('#modal-warning-login').modal('show'); 
        }
	},

	handlingRollup(roomId, response){
		if(response.data.code >= 0){
			if(roomId!==0){
				$('#modal-diem-danh').modal('hide'); 
				$('#modal-nhan-code').modal('show'); 
				document.getElementById('modal-form-code').value=response.data.data.rewards[0].rewardCode;
			}else{
				$('#modal-nhan-vang').modal('hide'); 
				$('#modal-notify').modal('show'); 
				var e = document.getElementById('content_notify');
				e.innerText=response.data.message;
			}
		}else{
			if(roomId!==0){
				$('#modal-diem-danh').modal('hide'); 
			}else{
				$('#modal-nhan-vang').modal('hide'); 
			}
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	},
	

	playGame(type, value, key){
        if(!game_client.isPlay){
            game_client.isPlay=true;
            if(vtcmAuth.isLogin()){
				vtcmEvent.playGame(type, value, key, this.handlingPlayGame, this.notificationErr, this.setStatusVQ)
            }else{
                game_client.isPlay=false;
                $('#modal-warning-login').modal('show');
            }
        }
    },

	handlingPlayGame(type, value, key, response){
		if(response.data.code>=0){
			game_client.abc(type, value, key, response.data.data.rewards)
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
			game_client.isPlay=false;
		}
	},

	abc(type, value, key, data){
        var n=Math.floor(Math.random() * 16);
        if(type===1){
            var tb = document.getElementById('tb_content_result_vq');
            var result = document.getElementById('content_result_vq');
            result.style.marginTop='100px';
            result.innerText=data[0].name;
            tb.innerHTML='';
            
        }else{
            var e = document.getElementById('content_result_vq');
            e.innerHTML='';
            e.style.marginTop='0px';
            var tb = document.getElementById('tb_content_result_vq');
			tb.innerHTML='';
            for (let i = 0; i < data.length; i++) {
                $(tb).append(`<tr>
                <th scope="row">Lượt ${i+1}</th>
                <td>${data[i].name}</td>
              </tr>`);
            }
        }
        game_client.animation_vq=setInterval(()=>{
            game_client.animation(key, value, data);
        },100)
        setTimeout(()=>{
            game_client.isPlay=false;
            clearInterval(game_client.animation_vq)
            $('#modal-thuong-du-xuan').modal('show');
            var e1 = document.getElementById(key+(game_client.n-1));
            e1.classList.remove("active");
            game_client.n=1;
        },(n+value)*100);
    },

    animation(key, value){
        var e = document.getElementById(key+game_client.n);
        e.classList.add("active");
        if(game_client.n>1){
            var e1 = document.getElementById(key+(game_client.n-1));
            e1.classList.remove("active");
            
        }
        if(game_client.n===value){
            setTimeout(()=>{
                var e1 = document.getElementById(key+value);
                e1.classList.remove("active");
            },100)
            
        }
        if(game_client.n<value){
            game_client.n+=1;
        }else{
            game_client.n=1;
        }
        
    },
	
	getHistory(page, modeId){
        if(vtcmAuth.isLogin()){
            if(game_client.totalPage>page && page>=0){
                vtcmEvent.getHistory(page, modeId, this.handlingGetHistory, this.notificationErr)
            }
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

	handlingGetHistory(page, modeId, response){
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

	exchangeRewards(modeId, value, key){
        if(vtcmAuth.isLogin()){
            vtcmEvent.exchangeRewards(modeId, value, key, this.handlingExchangeRewards, this.notificationErr)
        } else{
            $('#modal-warning-login').modal('show'); 
        }
    },

	handlingExchangeRewards(modeId, value, key, response){
		if(response.data.code >= 0){
			if(modeId===10006){
				$('#modal-notify').modal('show'); 
				var e = document.getElementById('content_notify');
				e.innerText='Nhận khóa thành công';
			}else if(modeId===10005){
				game_client.bocbanh(value, key);
				$('#modal-nhan-code').modal('show'); 
				document.getElementById('modal-form-code').value=response.data.data.rewards[0].rewardCode;
			}else {
				$('#modal-nhan-code').modal('show'); 
				document.getElementById('modal-form-code').value=response.data.data.rewards[0].rewardCode;
			}
			
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	},

	bocbanh(number, key){
        for (let i = 0; i < number; i++) {
            var e = document.getElementById(key+(i+1));
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

	playFlipCard(value, key, content){
        if(!game_client.isPlayPickup){
            if(vtcmAuth.isLogin()){
                vtcmEvent.playFlipCard(value, key, content, this.handlingPlayFlipCard, this.notificationErr, this.setStatusLatThe)
            }else{
                $('#modal-warning-login').modal('show'); 
                game_client.isPlayPickup=false;
            }
            
        }
    },

	handlingPlayFlipCard(value, key, content, response){
		if(response.data.code>=0){
			game_client.pick_up(value, key, content, response.data.data.rewards)
		}else{
			$('#modal-notify').modal('show'); 
			var e = document.getElementById('content_notify');
			e.innerText=response.data.message;
		}
	},

	pick_up(value, key, content, data){
        game_client.isPlayPickup=true;
        if(value===1){
            var e = document.getElementById(key);
            e.classList.add("active");
            var e1 = document.getElementById(content);
            setTimeout(()=>{
                e1.innerHTML+=data[0].name;
            },300)
            setTimeout(()=>{
                e.classList.remove("active");
                e1.innerHTML='';
                game_client.isPlayPickup=false;
            },3000)
        }else{
            for (let i = 1; i < data.length+1; i++) {
                var e = document.getElementById(key+i);
                e.classList.add("active");
                var e1 = document.getElementById(content+i);
                e1.innerHTML+=data[i-1].name;
            }
            setTimeout(()=>{
                for (let i = 1; i < value+1; i++) {
                    var e = document.getElementById(key+i);
                    e.classList.remove("active");
                    var e1 = document.getElementById(content+i);
                    e1.innerHTML='';
                }
                game_client.isPlayPickup=false;
            },3000)
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

	notificationErr(error){
		$('#modal-notify').modal('show'); 
		var e = document.getElementById('content_notify');
		e.innerText=error.response.data.message;
	},

	setStatusVQ(){
		game_client.isPlay=false;
	},

	setStatusLatThe(){
		game_client.isPlayPickup=false;
	},

	notificationErrRollup(roomId, error){
		if(roomId!==0){
			$('#modal-diem-danh').modal('hide'); 
		}else{
			$('#modal-nhan-vang').modal('hide'); 
		}
		
		$('#modal-notify').modal('show'); 
		var e = document.getElementById('content_notify');
		e.innerText=error.response.data.message;
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

$(document).ready(function(){
	'use strict';
    const vtcmAppConfig = {
        host: "http://abc.com",
		gameId:100004,
		apiBaseUrl: 'http://api.gf.splay.vn',
		client_id: "GF_EVENTS_WEB",
		client_secret: "aP6k2Ql68arPH8l",
		url_return:`http://nguthansu.splay.vn/mungdoclap`,
    	path:'/mungdoclap'
    };
    game_client.initApp(vtcmAppConfig);
    
});