function init () {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var bodySize = document.body.getBoundingClientRect();
	canvas.setAttribute("width", bodySize.width);
	canvas.setAttribute("height", bodySize.height);
	img.src = "models/ship.png";
	shipX = 100;
	shipY = canvas.height / 2 - shipHeight / 2;
	draw();
}



var canvas;
var ctx;
var img = new Image();

//Moves
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;


//SpaceShip
var shipX;
var shipY;
var shipDy = 5;
var shipDx = 5;
var shipHeight = 100;
var shipWidth = 42;




function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(img, shipX, shipY);
	

	if(rightPressed && shipY < canvas.width - shipWidth) {
    	shipY += shipDy;
    } else if(leftPressed && shipY > 4) {
   		shipY -= shipDy;
    }
    if(upPressed && shipX > 4) {
    	shipX -= shipDx;
    } else if(downPressed && shipX < canvas.height - shipHeight) {
    	shipX += shipDx;
    }
	requestAnimationFrame(draw);
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.height) 
        shipX = relativeX - shipHeight / 2;
    
    if(relativeY > 0 && relativeY < canvas.height)
    	shipY = relativeY - shipHeight / 2;

}


function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function keyDownHandler(e) {
	if(e.keyCode == 40) {
    	rightPressed = true;
	}
	if(e.keyCode == 38) {
    	leftPressed = true;
	}
	if (e.keyCode == 37){
  		upPressed = true;
	}
	if (e.keyCode == 39){
		downPressed = true;
	}	
}

function keyUpHandler(e) {
	if(e.keyCode == 40) {
    	rightPressed = false;
	}
	if(e.keyCode == 38) {
    	leftPressed = false;
    }
	if (e.keyCode == 37){
  		upPressed = false;
	}
	if (e.keyCode == 39){
		downPressed = false;
	}	
}




