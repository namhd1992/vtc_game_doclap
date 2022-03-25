
var animation_vq={};
var i=1
function goToFanpage(){

}

function goToFanpage(){

}

function getGoal(value){
    alert(value)
}

function playGame(type, value, key){

    animation_vq=setInterval(()=>{
        animation(key, value);
    },100)
}

function animation(key, value){
    console.log(key)
    var e = document.getElementById(key+i);
    e.classList.add("active");
    if(i>1){
        var e1 = document.getElementById(key+(i-1));
        e1.classList.remove("active");
    }
    if(i===value){
        setTimeout(()=>{
            var e1 = document.getElementById(key+value);
            e1.classList.remove("active");
        },100)
        
    }
    if(i<value){
        i+=1;
    }else{
        i=1;
    }
    
}

function getHistory(page){

}

function getGiftcodeByNumberPlay(value){

}

function getKeyGoal(){

}

function getGiftcodeByNumberBocBanh(value){

}

function bocbanh(key, position){
    var e = document.getElementById(key+position);
        e.classList.add("hide");
}

function playFlipCard(value, key, content){
    if(value===1){
        var e = document.getElementById(key);
        e.classList.add("active");
        var e1 = document.getElementById(content);
        e1.innerHTML+='+ 100 Hoa Mai'
    }else{
        for (let i = 1; i < value+1; i++) {
            var e = document.getElementById(key+i);
            e.classList.add("active");
            var e1 = document.getElementById(content+i);
            e1.innerHTML+='+ 100 Hoa Mai'
        }
    }
}

function getHistoryplayFlipCard(){

}

function rewardExchangeMai(value){

}

function rewardExchangeDao(value){

}

function openRuong(){

}

function getBXHLiXi(){

}

function getRewardTop(value){

}