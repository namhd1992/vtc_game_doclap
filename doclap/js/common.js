function setLinkToItem(data){
    for (let i = 0; i < data.length; i++) {
        var e = document.getElementById(data[i].id);
        e.setAttribute("href", data[i].value);
    }
   
}

function setContentToItem(data){
    for (let i = 0; i < data.length; i++) {
        var e = document.getElementById(data[i].id);
        e.innerHTML= data[i].value;
    }
   
}

function setContentMeta(data){
    for (let i = 0; i < data.length; i++) {
        document.querySelector(`meta[name="${data[i].id}"]`).setAttribute("content", data[i].value);
    }
   
}

function setInfoUser(data){
    for (let i = 0; i < data.length; i++) {
        var e = document.getElementById(data[i].id);
        e.innerText= data[i].value;
    }
   
}

function getMethod(url, params, fn, fe){
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

}

function postMethod(url, data, header, fn, fe){
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