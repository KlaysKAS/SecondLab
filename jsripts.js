function init () {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var bodySize = document.body.getBoundingClientRect();
	canvas.setAttribute("width", bodySize.width);
	canvas.setAttribute("height", bodySize.height);
	playerShip = new Player(100, bodySize.height, 5, 5, 100, 42, "models/PlayerShip.png", 3);
	
	draw();
}



var canvas;
var ctx;

// Player
class Player {	
	constructor(x, y, dx, dy, height, width, img, lives) {
		this.dx = dx;
		this.dy = dy;
		this.height = height;
		this.x = x;
		this.y = y / 2 - this.height / 2;
		this.width = width;
		this.img = new Image();
		this.img.src = img;
		this.lives = lives;
	}
}
var playerShip;

//Moves
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.height) 
        playerShip.x = relativeX - playerShip.width / 2;
    
    if(relativeY > 0 && relativeY < canvas.height)
    	playerShip.y = relativeY - playerShip.height/ 2;
}

function keyDownHandler(e) {
	if(e.keyCode == 40) {
		rightPressed = true;
	}
	if(e.keyCode == 38) {
    	leftPressed = true;
	}
	if (e.keyCode == 37) {
  		upPressed = true;
	}
	if (e.keyCode == 39) {
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
	if (e.keyCode == 37) {
  		upPressed = false;
	}
	if (e.keyCode == 39) {
		downPressed = false;
	}	
}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);







function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.drawImage(playerShip.img, playerShip.x, playerShip.y);
	

	if(rightPressed && playerShip.y < canvas.width - playerShip.width) {
    	playerShip.y += playerShip.dy;
    }
    if(leftPressed && playerShip.y > 4) {
   		playerShip.y -= playerShip.dy;
    }
    if(upPressed && playerShip.x > 4) {
    	playerShip.x -= playerShip.dx;
    }
    if(downPressed && playerShip.x < canvas.height - playerShip.height) {
    	playerShip.x += playerShip.dx;
    }
	requestAnimationFrame(draw);
}






function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}






