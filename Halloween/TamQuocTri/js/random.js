const randomBetween = (min, max) => {
    return Math.floor(Math.random() * max) + min
}
const doRandom = (winNumber = 3, numOfRound = 3, numOfItems = 8, runTimeCallback = () => {}, callback = () => {} ) => {
    const round = numOfRound
    const delayTime = 50

    let currentRound = 0
    let interval = null
    let currentDelayTime = delayTime
    let startNumber = randomBetween(1, numOfItems) 
    let currentNumber = startNumber
    
    const totalStep = numOfItems * round + winNumber
    const deduceTime = delayTime / totalStep
    const doInterval = (intervalTime) => {
        interval = setInterval(() => {
            if(to) clearTimeout(to)
            if(interval) clearTimeout(interval)
            let currentItem =  currentNumber%8 + 1
            currentNumber+=1
    
            if((currentItem-1) + numOfItems === numOfItems) {
                //console.log('must countRound')
                currentRound+=1
            }
           // console.log('do something every ', intervalTime, currentItem, currentRound)
            runTimeCallback(currentItem)
            if(currentRound === round && currentItem === winNumber){
                callback()
            }else{
                doInterval(currentDelayTime += deduceTime )
            }
    
        }, intervalTime)
    }
    
    let to = setTimeout(() => {
        // wait 1s then cal interval
        doInterval(delayTime)
    }, 100);
}


