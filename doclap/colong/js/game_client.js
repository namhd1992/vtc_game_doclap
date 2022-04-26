const game_client = {
	config_: null,	
	version_: "1.0.0",
	instances_: [],
	isConnected: false,
    	
	// initApp(w,d,s,i,uid,uname){ //window; document; 'script'; pageId
	// 	const vtcmAppConfig = {
	// 	  apiKey: "",		  
	// 	  pageId: i,
	// 	  userId: uid,
	// 	  userName : uname,		  
	// 	};
	// },
	
	initApp(rawConfig = {}){
		if (typeof rawConfig !== 'object') {
        
		}
		
		this.config_ = rawConfig;
        // vtcmAuth.veryfi();

		// Linik('fanpage_fb',EVT_FANPAGE_URL);
		// Linik('fanpage_fb',EVT_FANPAGE_URL);
		// Linik('fanpage_fb',EVT_FANPAGE_URL);

		// const downloadToggle = document.getElementById('download-toggle');

		// downloadToggle.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	downloadToggle.parentNode.classList.toggle('active');
		// });

		// //
        if(vtcmAuth.isLogin()){
            document.getElementById("logout").style.display = "none";
            document.getElementById("login").style.display = "block";

        }else{
            document.getElementById("login").style.display = "none";
            document.getElementById("logout").style.display = "block";
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
};

// const MODE_ID_LIXI=100007;
// const MODE_ID_VQ=100007;

$(document).ready(function(){
	'use strict';
    const vtcmAppConfig = {
        host: "http://abc.com",
		gameId:100005,
		apiBaseUrl: 'http://api.gf.splay.vn',
		client_id: "GF_EVENTS_WEB",
		client_secret: "aP6k2Ql68arPH8l",
		url_return:`http://colongkiem.splay.vn/mungdoclap`,
		path:'/mungdoclap'
    };
    
    game_client.initApp(vtcmAppConfig);
    vtcmApp.initApp(vtcmAppConfig);
});