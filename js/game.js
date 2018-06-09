// Game init


var floorMoveSpeed = "-=15";
var intGameLoop;
 
//Game variable
 
var pumpkinCreateTimer = 120;
var pumpkinCreateCount = 0;

var graveCreateTimer = 160;
var graveCreateCount = 0;
 
var flyghostCreateTimer = 180;
var flyghostCreateCount = 0;

var deathCreateTimer = 280;
var deathCreateCount = 0;
 
 
var isJumping = 0;
var playerFloorYPos = 79;
 
var arrpumpkinPool = [];
var arrgraveyardPool = [];
var arrflyghostPool = [];
var arrdeathPool = [];

var maxpumpkins = 60;
var maxghosts = 60;
var maxdeaths = 5;
 
var score = 0;
var intGameLoop;

var getgraveyard =0;
var getpumpkin = 0;
var getflyghost = 0;
var getdeath = 0;

var selectedPlayer;
 
//-----------------------------o
//-- Preview Setting
//-----------------------------o

$("#player").hide();
$('#scoreBox').hide();
$("#floor").hide();
$('#GameOver').hide();
$('#SelectPlayer').hide();
//-----------------------------o
//-- Game Start
//-----------------------------o
document.ontouchstart = function(){};
$(document).ready(function(e) {
 

		
    //when click the screen, start the game
    $('#GameScreen').bind("touchstart click", function(e){
		e.preventDefault();
	   $('#GameScreen').hide();
   		$('#GameScreen').remove();
		$('#SelectPlayer').show();
    	
    })
	
	$('.board').bind("touchstart click", function(e){
		e.preventDefault();
		selectedPlayer = $(this).attr("data-player");
		console.log(selectedPlayer);
		
	    $('#SelectPlayer').hide();
   		$('#SelectPlayer').remove();
		$("#player").addClass(selectedPlayer);
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
		 var counter = 50;
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
				$('.getpumpkin').text(" x " + getpumpkin);
				$('.getgraveyard').text(" x " + getgraveyard);
				$('.getflyghost').text(" x " + getflyghost);
				$('.getdeath').text(" x " + getdeath);
				$('.score').text(score);
			}
		}
		
		
}
 

//----------------------------o
//  mario jump function
//----------------------------o
 
function marioJump()
{
    if(isJumping==1)
    return;
 
    isJumping ++;
    //goTo jump frame
	
 //   $("#player").css("background-position", 230)

    $("#player").animate({
        bottom: 420},500, 'swing',
        function(){
 
            $("#player").animate({
            bottom: playerFloorYPos},650,'swing',
            function()
            {
            isJumping = 0;
            })
 
    });
	 $("#player").addClass("animated").addClass("flipInX");
 
}

//------------------------------------o
//  Loop functions
//------------------------------------o
function loop()
{
 
    //change floor bg mapping
    $("#floor").css("background-position", floorMoveSpeed);
    $('#wrap').css("background-position", '-=1');
    pumpkinCreateCount ++;
	graveCreateCount ++;
	flyghostCreateCount ++;
	deathCreateCount ++;
	

     if(pumpkinCreateCount >= pumpkinCreateTimer &&  arrpumpkinPool.length < maxpumpkins  ){
     createpumpkin();
     pumpkinCreateCount = 0;
     }
	 
	  if(graveCreateCount >= graveCreateTimer &&  arrgraveyardPool.length < maxpumpkins){
    	creategraveyard();
     	graveCreateCount = 0;
     }
	 
	  if(flyghostCreateCount >= flyghostCreateTimer &&  arrflyghostPool.length < maxghosts){
    	createflyghost();
     	flyghostCreateCount = 0;
     }
	 
	 if(deathCreateCount >= deathCreateTimer &&  arrdeathPool.length < maxghosts){
    	createdeath();
     	deathCreateCount = 0;
     }
	 
 	
	//hit pumpkin, score + 100
    for(i = 0; i < arrpumpkinPool.length; i++)
    {
        var pumpkin = $(arrpumpkinPool[i])
        $(pumpkin).css('left', floorMoveSpeed)
        
        if($(pumpkin).css('left') < '-40px')
        {
        $(pumpkin).remove();
        arrpumpkinPool.splice(i, 1);
        }
 
        if(hitThepumpkins($("#player"), pumpkin))
        {
			//if hit the pumpkin, pumpkin disappear
        $(pumpkin).remove();
		
        arrpumpkinPool.splice(i, 1);
        score += 100;
		getpumpkin+=1;
        $('#scoreBox .score').text( score);
        }

    }
	
	//hit graveyard, +50
	
	for(i = 0; i < arrgraveyardPool.length; i++)
    {
        var grave = $(arrgraveyardPool[i])
        $(grave).css('left', floorMoveSpeed)
        
        if($(grave).css('left') < '-40px')
        {
        $(grave).remove();
        arrgraveyardPool.splice(i, 1);
        }
 
        if(hitThepumpkins($("#player"), grave))
        {
			//if hit the pumpkin, pumpkin disappear
        $(grave).remove();
		
        arrgraveyardPool.splice(i, 1);
        score +=50;
		getgraveyard+=1;
        $('#scoreBox .score').text( score);
        }

    }
 
	//hit flyghost, +10
	
	for(i = 0; i < arrflyghostPool.length; i++)
    {
        var flyghost = $(arrflyghostPool[i]);
        $(flyghost).css('left', floorMoveSpeed);
        
        if($(flyghost).css('left') < '-40px')
        {
        $(flyghost).remove();
        arrflyghostPool.splice(i, 1);
        }
 
        if(hitThepumpkins($("#player"), flyghost))
        {
			//if hit the pumpkin, pumpkin disappear
        $(flyghost).remove();
		
        arrflyghostPool.splice(i, 1);
        score += 10;
		getflyghost+=1;
        $('#scoreBox .score').text( score);
        }

    }
	
	//hit death, -100
	
	for(i = 0; i < arrdeathPool.length; i++)
    {
        var death = $(arrdeathPool[i]);
        $(death).css('left', floorMoveSpeed);
        
        if($(death).css('left') < '-40px')
        {
        $(death).remove();
        arrdeathPool.splice(i, 1);
        }
 
        if(hitThepumpkins($("#player"), death))
        {
			//if hit the pumpkin, pumpkin disappear
        $(death).remove();
		
        arrdeathPool.splice(i, 1);
        score -= 100;
		getdeath+=1;
        $('#scoreBox .score').text( score);
        }

    }
 
}
 
 //-----------------------------------------------------------o
// Collision detection 
// usage,call:  hitThepumpkins( mario, pumpkin ); (returns true or false).
//-----------------------------------------------------------o

var hitThepumpkins = (function () {
    function getPositions( element ) {
        var pos, width, height;
        pos = $(element).position();
        width = $(element).width() / 2; 
        height = $(element).height();
        return [ [ pos.left, pos.left + width ], [ pos.top, pos.top + height ] ];
    }
 

    function comparePositions( mario, pumpkin ) {
        var r1, r2;
        r1 = mario[0] < pumpkin[0] ? mario : pumpkin;
        r2 = mario[0] < pumpkin[0] ? pumpkin : mario;
		
        return r1[1] > r2[0] || r1[0] === r2[0];
    }
 
    return function ( mario, pumpkin  ) {
        var mariopos = getPositions( mario ),
            pumpkinpos = getPositions( pumpkin );
        return comparePositions( mariopos[0], pumpkinpos[0] ) && comparePositions( mariopos[1], pumpkinpos[1] );
    };
})();




 
//----------------------------o
// Generate pumpkin and graveyard
//----------------------------o
 
function createpumpkin()
{
        var opumpkin = document.createElement('div')
        $(opumpkin).addClass('pumpkin');
        $('#wrap').append(opumpkin);
        arrpumpkinPool.push(opumpkin)
}

function creategraveyard()
{
        var grave = document.createElement('div')
        $(grave).addClass('graveyard');
        $('#wrap').append(grave);
        arrgraveyardPool.push(grave)
}

function createflyghost()
{
        var flyghost = document.createElement('div')
        $(flyghost).addClass('flyghost');
        $('#wrap').append(flyghost);
        arrflyghostPool.push(flyghost)
}

function createdeath()
{
        var death = document.createElement('div')
        $(death).addClass('death');
        $('#wrap').append(death);
        arrdeathPool.push(death)
}
