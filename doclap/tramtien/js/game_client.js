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

const MODE_ID_LIXI=100007;
const MODE_ID_VQ=100007;

ready(() => {
	'use strict';
    const vtcmAppConfig = {
        host: "http://abc.com",
        gameId:100004,
        apiBaseUrl: 'http://171.244.11.133:8088',
        client_id: "SANBOX",
        client_secret: "123456abcdef",
        url_return:`http://127.0.0.1:5500/doclap/index.html`
    };
    
    game_client.initApp(vtcmAppConfig);
    vtcmApp.initApp(vtcmAppConfig);
});