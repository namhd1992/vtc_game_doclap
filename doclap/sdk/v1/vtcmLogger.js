const vtcmLogger = {
	isDebug: true,
	
	log(message){
		if (vtcmLogger.isDebug) {
            var d = new Date();
            var time = d.getDate() + '/' + (d.getMonth() + 1) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
			console.log('[' + time +  '] '+ message);
        }
	}	
};