const common_sdk = {
	initAuth(){
        console.log('...')
	},
    
    setLinkToItem(data){
        for (let i = 0; i < data.length; i++) {
            var e = document.getElementById(data[i].id);
            e.setAttribute("href", data[i].value);
        }
       
    },
    setContentToItem(data){
        for (let i = 0; i < data.length; i++) {
            var e = document.getElementById(data[i].id);
            e.innerHTML= data[i].value;
        }
       
    },

    setContentMeta(data){
        for (let i = 0; i < data.length; i++) {
            document.querySelector(`meta[name="${data[i].id}"]`).setAttribute("content", data[i].value);
        }
       
    },

    setInfoUser(data){
        for (let i = 0; i < data.length; i++) {
            var e = document.getElementById(data[i].id);
            e.innerText= data[i].value;
        }
       
    },

    getMethod(url, params, fn, fe){
        axios.get(url, {
            params: params
          })
          .then(function (response) {
              fn(response)
          })
          .catch(function (error) {
            fe(error)
          })
          .then(function () {
          });  
    
    },

    postMethod(url, data, header, fn, fe){
        axios.post(url,data,header)
        .then(function (response) {
            fn(response);
        })
        .catch(function (error) {
            fe(error)
        })
        .then(function () {
        }); 
    
    },

    postMethodToken(url, data, header, fn, fe){
        var token = vtcmAuth.getToken();
        if (token == '') {
            vtcmAuth.logout();
        }
        var header = {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${vtcmAuth.getToken()}`
            }
          }

        axios.post(url,data,header)
        .then(function (response) {
            fn(response);
        })
        .catch(function (error) {
            fe(error)
        })
        .then(function () {
        }); 
    
    },
    encodeBase64String(input){
	},
	
	decodeBase64String(input) {
	},
	
	getUTCDateString() {
		const today = new Date();
		// Returns date format 'YYYY-MM-DD'
		return today.toISOString().substring(0, 10);
	},

    parse_query_string(name, url){
        name = name.replace(/[[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    },

    ui:{
        showLoading(){
            var loading=document.querySelector('.page');
            loading.insertAdjacentHTML('beforebegin','<div class="loader-line"></div>')
        },
    
        hideLoading(){
            var loading=document.querySelector('.loader-line');
            loading.remove();
        },
    }


};

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