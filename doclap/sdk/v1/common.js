const common_sdk = {
	initAuth(){
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
            //yeu cau login lai
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
    
    }


};
