const vtcmApp = {
	config_: null,
    data_setting:{},	
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
        vtcmAuth.veryfi();
        // vtcmInit.getAppSetting();
        
		// Linik('fanpage_fb',EVT_FANPAGE_URL);
		// Linik('fanpage_fb',EVT_FANPAGE_URL);
		// Linik('fanpage_fb',EVT_FANPAGE_URL);

		// const downloadToggle = document.getElementById('download-toggle');

		// downloadToggle.addEventListener('click', (e) => {
		// 	e.preventDefault();
		// 	downloadToggle.parentNode.classList.toggle('active');
		// });

		// //

        // $( ".flipbox-item" ).click(function() {
        //     console.log('ok')
        //   });

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