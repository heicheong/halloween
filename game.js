// Game init


var floorMoveSpeed = "-=15";
var intGameLoop;
 
//Game variable
 
var coinCreateTimer = 60;
var coinCreateCount = 0;
var mushCreateCount = 0;
 
var isJumping = false;
var playerFloorYPos = 43;
 
var arrCoinPool = [];
var arrMushroomPool = [];

var maxCoins = 6;
 
var score = 0;
var intGameLoop;

var getmushroom =0;
var getcoin = 0;

 
//-----------------------------o
//-- Preview Setting
//-----------------------------o

$("#player").hide();
$('#scoreBox').hide();
$("#floor").hide();
$('#GameOver').hide();
//-----------------------------o
//-- Game Start
//-----------------------------o
document.ontouchstart = function(){};
$(document).ready(function(e) {
 

		
    //when click the screen, start the game
    $('#GameScreen').bind("click", function(){
   		$('#GameScreen').remove();
    	startGame();
    })
 
 	$('body').bind("dblclick",function(e){
		 e.preventDefault();
    })
     $('body').bind("touchstart click",function(e){
		 e.preventDefault();
   		 marioJump();
    })
 
 
	 $('body').bind("keypress",function(e){
	   if(e.keyCode == 32 || e.keyCode == 38){
		   // user has pressed space
			marioJump();
	   }
	});
   
 
});

//-----------------------------o
//--  startGame function
//-----------------------------o

 
function startGame()
{
    $("#player").show();
    $('#scoreBox').show();
    $("#floor").show();
    //set gameloop
	
 intGameLoop = self.setInterval(function(){loop()},33);
 
 
  //60 sec timer
		//60 sec timer
		 var counter = 60;
var timer = setInterval(countdown, 1000);
		 
		 function countdown(){
			 $(".sec").text(counter);
			 
			  counter--;
			if (counter >= 0) {
      			$(".sec").text(counter);
			}
			if (counter === 0) {
				clearInterval(timer);
				clearInterval(intGameLoop);
				//alert("Game Over!!! Your " + $('#scoreBox .score').text());
				
				$('#GameOver').show();
				$('.getcoin').text(" x " + getcoin);
				$('.getmushroom').text(" x " + getmushroom);
				$('.score').text('Score ' + score);
			}
		}
		
		
}
 

//----------------------------o
//  mario jump function
//----------------------------o
 
function marioJump()
{
    if(isJumping)
    return;
 
    isJumping = true;
    //goTo jump frame
	
    $("#player").css("background-position", 272)
 
    $("#player").animate({
        bottom: 300},400, 'swing',
        function(){
 
            $("#player").animate({
            bottom: playerFloorYPos},400,'swing',
            function()
            {
            isJumping = false;
            })
 
    })
 
}

//------------------------------------o
//  Loop functions
//------------------------------------o
function loop()
{
 
    //change floor bg mapping
    $("#floor").css("background-position", floorMoveSpeed);
    $('#wrap').css("background-position", '-=1');
    coinCreateCount ++;
	mushCreateCount ++;
	

     if(coinCreateCount >= coinCreateTimer &&  arrCoinPool.length < maxCoins  ){
     createCoin();
     coinCreateCount = 0;
     }
	 
	  if(mushCreateCount >= coinCreateTimer &&  arrMushroomPool.length < maxCoins){
    	createMushroom();
     	mushCreateCount = 0;
     }
	 
 	
	//hit coin, score + 100
    for(i = 0; i < arrCoinPool.length; i++)
    {
        var coin = $(arrCoinPool[i])
        $(coin).css('left', floorMoveSpeed)
        
        if($(coin).css('left') < '-40px')
        {
        $(coin).remove();
        arrCoinPool.splice(i, 1);
        }
 
        if(hitTheCoins($("#player"), coin))
        {
			//if hit the coin, coin disappear
        $(coin).remove();
		
        arrCoinPool.splice(i, 1);
        score += 100;
		getcoin+=1;
        $('#scoreBox .score').text('Score ' + score);
        }

    }
	
	//hit mushroom, -100
	
	for(i = 0; i < arrMushroomPool.length; i++)
    {
        var mush = $(arrMushroomPool[i])
        $(mush).css('left', floorMoveSpeed)
        
        if($(mush).css('left') < '-40px')
        {
        $(mush).remove();
        arrMushroomPool.splice(i, 1);
        }
 
        if(hitTheCoins($("#player"), mush))
        {
			//if hit the coin, coin disappear
        $(mush).remove();
		
        arrMushroomPool.splice(i, 1);
        score -= 100;
		getmushroom+=1;
        $('#scoreBox .score').text('Score ' + score);
        }

    }
 
 
}
 
 //-----------------------------------------------------------o
// Collision detection 
// usage,call:  hitTheCoins( mario, coin ); (returns true or false).
//-----------------------------------------------------------o

var hitTheCoins = (function () {
    function getPositions( element ) {
        var pos, width, height;
        pos = $(element).position();
        width = $(element).width() / 2; 
        height = $(element).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }
 

    function comparePositions( mario, coin ) {
        var r1, r2;
        r1 = mario[0] < coin[0] ? mario : coin;
        r2 = mario[0] < coin[0] ? coin : mario;
		
        return r1[1] > r2[0] || r1[0] === r2[0];
    }
 
    return function ( mario, coin  ) {
        var mariopos = getPositions( mario ),
            coinpos = getPositions( coin );
        return comparePositions( mariopos[0], coinpos[0] ) && comparePositions( mariopos[1], coinpos[1] );
    };
})();




 
//----------------------------o
// Generate Coin and Mushroom
//----------------------------o
 
function createCoin()
{
        var oCoin = document.createElement('div')
        $(oCoin).addClass('coin');
        $('#wrap').append(oCoin);
        arrCoinPool.push(oCoin)
}

function createMushroom()
{
        var mush = document.createElement('div')
        $(mush).addClass('mushroom');
        $('#wrap').append(mush);
        arrMushroomPool.push(mush)
}