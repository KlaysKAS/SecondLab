function init () {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var bodySize = document.body.getBoundingClientRect();
	canvas.setAttribute("width", bodySize.width);
	canvas.setAttribute("height", bodySize.height);
	playerShip = new Player(100, bodySize.height, 7, 7, 100, 42, "models/PlayerShip.png", 3);
	playerBullets = new PBullets("models/Player'sBull.png");
	setInterval(draw, fps);
}

var canvas;
var ctx;
var fps = 1000 / 60;

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
		this.score = 0;
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y);
		this.drawInfo();
	}

	drawInfo() {
		ctx.font = "20px Arial";
    	ctx.fillStyle = "#5ff56e";
    	ctx.fillText("Lives: " + this.lives, canvas.width - 80, 20);
    	ctx.fillText("Score: " + this.score, 8, 20);
	}
}
var playerShip;

// Player's bullets
class PBullets {
	constructor (img) {
		this.bullets = [];
		this.img = new Image();
		this.img.src = img;
		this.left = 0;
		this.right = 0;
		this.maxCountBul = 1000;
		this.timeout = 0;
	}
	addBullet(bx, by) {
		if (this.timeout == 0) {
			this.bullets[this.right] = {x: bx + 48, y: by + 26, status: 1};
			this.right += 1;
			if (this.right == this.maxCountBul)
				this.right = 0;
			this.bullets[this.right] = {x: bx + 48, y: by + 58, status: 1};
			this.right += 1;
			this.timeout = 20;
		}
	}
	draw() {
		if (this.left < this.right) {
			for (let i = this.left; i < this.right; ++i) {
				if (this.bullets[i].status == 1) {
					ctx.drawImage(this.img, this.bullets[i].x, this.bullets[i].y);
					this.bullets[i].x += 7;
					if (this.bullets[i]. x > canvas.width)
						this.status = 0;
				} else {
					if (this.left == i) {
						this.left ++;
						if (this.left == this.maxCountBul)
							this.left = 0;
					}
				}
			}
		} else if (this.left > this.right) {
			for (let i = left; i < this.maxCountBul; ++i) {
				if (this.bullets[i].status == 1) {
					ctx.drawImage(this.img, this.bullets[i].x, this.bullets[i].y);
					this.bullets[i].x += 7;
					if (this.bullets[i].x > canvas.width)
						this.bullets[i].status = 0;
				} else {
					if (this.left == i) {
						this.left ++;
						if (this.left == this.maxCountBul)
							this.left = 0;
					}
				}
			}
			for (let i = 0; i < right; ++i) {
				if (this.bullets[i].status == 1) {
					ctx.drawImage(this.img, this.bullets[i].x, this.bullets[i].y);
					this.bullets[i].x += 7;
					if (this.bullets[i]. x > canvas.width)
						this.bullets[i].status = 0;
				} else {
					if (this.left == i) {
						this.left ++;
						if (this.left == this.maxCountBul)
							this.left = 0;
					}
				}
			}
		}
	}
	
}
var playerBullets;

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
	if (e.keyCode == 32) {
		spacePressed = true;
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
	if (e.keyCode == 32) {
		spacePressed = false;
	}
}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;
var spacePressed = false;
document.addEventListener("mousemove", mouseMoveHandler, false);
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);


function draw() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	playerShip.draw();
	playerBullets.draw();
	
	
	
	if (playerBullets.timeout > 0) {
		playerBullets.timeout--;
	}
	if (spacePressed) {
		playerBullets.addBullet(playerShip.x, playerShip.y);
	}
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

}






function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}





