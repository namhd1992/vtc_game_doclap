$(document).ready(function(){
    let theWheel = new Winwheel({
        'canvasId'    : 'wheel',
        'numSegments' : 10,
        'fillStyle'   : '#e7706f',
        'lineWidth'   : 1,
         'drawMode' : 'image',
        'animation' :                   // Note animation properties passed in constructor parameters.
        {
            'type'     : 'spinToStop',  // Type of animation.
            'duration' : 5,             // How long the animation is to take in seconds.
            'spins'    : 8              // The number of complete 360 degree rotations the wheel is to do.
        }   
    });

    $('#wheel-container .bt-spin').click(function(){
        theWheel.startAnimation()
    })

    


let loadedImg = new Image();
 
loadedImg.onload = function()
{
    theWheel.wheelImage = loadedImg;   
    theWheel.draw();                 
}

loadedImg.src = "./images/wheel.png";
	

	
	
})