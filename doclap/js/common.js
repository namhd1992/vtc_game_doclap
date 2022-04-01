function setLinkToItem(data){
    for (let i = 0; i < data.length; i++) {
        var e = document.getElementById(data[i].id);
        console.log(e)
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

function getMethod(){

}

function postMethod(){

}