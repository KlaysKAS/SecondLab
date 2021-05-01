function Start() {

	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var bodySize = document.body.getBoundingClientRect();
	canvas.setAttribute("width", bodySize.width);
	canvas.setAttribute("height", bodySize.height);
	playerShip = new Player(100, bodySize.height, 7, 7, 99, 84, "models/PlayerShip.png", 3);
	playerBullets = new PBullets("models/Player'sBull.png");
	bgStars = new Stars();
	asteroid = new Asteroids();
	enemy = new Enemy("models/CommonEnemy/2.png");
	EBullets = new EnemyBullet("models/Enemy'sBull.png");

	ctx.beginPath();
	ctx.rect(canvas.width / 2 - 250, canvas.height / 2 - 100, 500, 200);
	ctx.fillStyle = "#3e2c66";
	ctx.fill();
	ctx.closePath();
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Press space bar to start", canvas.width / 2 - 200, canvas.height / 2 - 50);
	ctx.font = "25px Arial";
	ctx.fillText("Controlling the ship with the mouse", canvas.width / 2 - 240, canvas.height / 2 + -10);
	ctx.fillText("or arrows on the keyboard", canvas.width / 2 - 240, canvas.height / 2 + 30);
	ctx.fillText("Shooting while pressing the space bar", canvas.width / 2 - 240, canvas.height / 2 + 70);
	interval = setInterval(start, fps);
}

function End () {
	ctx.beginPath();
	ctx.rect(canvas.width / 2 - 250, canvas.height / 2 - 100, 500, 200);
	ctx.fillStyle = "#3e2c66";
	ctx.fill();
	ctx.closePath();
	ctx.font = "40px Arial";
	ctx.fillStyle = "white";
	ctx.fillText("Game Over", canvas.width / 2 - 110, canvas.height / 2 - 40);
	ctx.font = "25px Arial";
	ctx.fillText("Your score: " + playerShip.score, canvas.width / 2 - 240, canvas.height / 2 + 10);
	ctx.fillText("Try again, press space", canvas.width / 2 - 240, canvas.height / 2 + 50);
	wait();
	
}

function delay(x) {
	var d = new Date();
	var c, diff;
	while (1) {
		c=new Date();
		diff = c-d;
		if (diff > x) break;
	}
}

function wait() {
	if (!spacePressed) {
		setTimeout(wait, 60);
	} else {
		delay(100);
		Start();
	}
}

function start() {
	if (spacePressed) {
		clearInterval(interval);
		interval = setInterval(draw, fps);
	}
}


// System settings
var canvas;
var ctx;
var fps = 1000 / 60;
var interval;

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
		this.immortality = 0;
	}

	draw() {
		ctx.drawImage(this.img, this.x, this.y);
		this.drawInfo();
		if (this.immortality > 0) this.immortality--;
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
	checkListForMove(left, right) {
		for (let i = left; i < right; ++i) {
			if (this.bullets[i].status == 1) {
				ctx.drawImage(this.img, this.bullets[i].x, this.bullets[i].y);
				this.bullets[i].x += 8;
				if (this.bullets[i]. x > canvas.width)
					this.status = 0;
			} else {
				if (this.left == i) {
					this.left++;
					if (this.left == this.maxCountBul)
						this.left = 0;
				}
			}
		}
	}
	checkListForCollision(left, right, leftEnemy, rightEnemy) {
		for (let i = left; i < right; ++i) {
			if (this.bullets[i].status == 1) {
				var b = this.bullets[i];

				for (let j = leftEnemy; j < rightEnemy; ++j) {
					if (enemy.enemies[j].status == 1) {
						var e = enemy.enemies[j];
						
						if (b.x + 26 > e.x + 7 && b.x < e.x + enemy.width && b.y + 14 > e.y && b.y < e.y + enemy.width) {
							enemy.enemies[j].health--;
							if (enemy.enemies[j].health == 0) {
								enemy.enemies[j].status = 0;
								playerShip.score += 25;
								enemy.count--;
							}
							this.bullets[i].status = 0;
						}

					}
				}

			}
		}
	}
	getCollision() {
		if (this.left < this.right) {
			if (enemy.left < enemy.right) {
				this.checkListForCollision(this.left, this.right, enemy.left, enemy.right);
			} else if (enemy.left > enemy.right) {
				this.checkListForCollision(this.left, this.right, enemy.left, enemy.maxCountEnemy + 20);
				this.checkListForCollision(this.left, this.right, 0, enemy.right);
			}
		} else if (this.left > this.right) {
			if (enemy.left < enemy.right) {
				this.checkListForCollision(this.left, this.maxCountBul, enemy.left, enemy.right);
				this.checkListForCollision(0, this.right, enemy.left, enemy.right);
			} else if (enemy.left > enemy.right) {
				this.checkListForCollision(this.left, this.maxCountBul, enemy.left, enemy.maxCountEnemy + 20);
				this.checkListForCollision(this.left, this.maxCountBul, 0, enemy.right);
				this.checkListForCollision(0, this.right, enemy.left, enemy.maxCountEnemy + 20);
				this.checkListForCollision(0, this.right, 0, enemy.right);
			}
		}
	}
	draw() {
		if (this.left < this.right) {
			this.checkListForMove(this.left, this.right);
		} else if (this.left > this.right) {
			this.checkListForMove(this.left, this.maxCountBul);
			this.checkListForMove(0, this.right);
		}
		this.getCollision();
	}
}
var playerBullets;

// Moves
function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    var relativeY = e.clientY - canvas.offsetTop;
    if(relativeX > 0 && relativeX < canvas.height) 
        playerShip.x = relativeX - playerShip.width / 2;
    
    if(relativeY > 0 && relativeY < canvas.height)
    	playerShip.y = relativeY - playerShip.height/ 2;
}

// backgroud Stars
class Stars {
	constructor() {
		this.bank = [];
		for (let i = 1; i <= 15; ++i) {
			this.bank[i - 1] = {num: i - 1, img: new Image()};
			var path = "models/Stars/" + i + ".png";
			this.bank[i - 1].img.src = path;
		}
		this.countOfStars = 100;
		this.stars = [];
		for (let i = 0;  i < this.countOfStars; ++i) {
			this.stars[i] = {
				x: randomInt(0, canvas.width),
				y: randomInt(15, canvas.height - 15),
				dx: randomInt(1, 3) / 5.0,
				img: i % 15
			};
		}
	}
	drawStar() {
		for (let i = 0;  i < this.countOfStars; ++i) {
			ctx.drawImage(this.bank[i % 15].img, this.stars[i].x, this.stars[i].y)
			this.stars[i].x -= this.stars[i].dx;
			if (this.stars[i].x < -16)
				this.stars[i].x = canvas.width + randomInt(20, 500);
		}
	}
}
var bgStars;

class Asteroids {
	constructor() {
		this.bank = [];
		for (let i = 1; i <= 8; ++i) {
			this.bank[i - 1] = {num: i - 1, img: new Image()};
			var path = "models/Asteroids/" + i + ".png";
			this.bank[i - 1].img.src = path;
		}
		this.timeout = 0;
		this.ast = {x: 0, y: 0, dx: 0, dy: 0, width: 88, height: 86, img: 0, status: false};
	}
	addAst() {
		if (this.ast.status == false && this.timeout == 0) {
			if (randomInt(0, 5) == 3) {
				this.ast.y = randomInt(20, canvas.height - 150 - this.ast.height) ;
				this.ast.x = canvas.width + 20;
				this.ast.dx = randomInt(3, 8);
				this.ast.dy = randomInt(-2, 2);
				this.ast.status = true;
				this.ast.img = randomInt(0, 7);
			}
		}
	}
	draw() {
		this.addAst();
		if (this.ast.status) {
			ctx.drawImage(this.bank[this.ast.img].img, this.ast.x, this.ast.y, this.ast.width, this.ast.height);
			this.ast.x -= this.ast.dx;
			this.ast.y += this.ast.dy;
			if (this.ast.x + this.ast.width < 0 || this.ast.y > canvas.height || this.ast.y + this.ast.height < 0) {
				this.ast.status = false;
				this.timeout = 500;
			}
			this.getCollision();
		} else {
			if (this.timeout > 0)
				this.timeout--;
		}
	}
	getCollision() {
		if (this.ast.x < playerShip.x + playerShip.width - 15 && this.ast.x + this.ast.width > playerShip.x &&
			this.ast.y < playerShip.y + playerShip.height - 15 && this.ast.y + this.ast.height > playerShip.y) {
			if (playerShip.immortality == 0) {
				playerShip.lives--;
				playerShip.immortality = 180;
			}
			this.ast.status = false;
			this.timeout = 500;
		}
	}
}
var asteroid;

class Enemy {
	constructor (img) {
		this.enemies = [];
		this.img = new Image();
		this.img.src = img;
		this.left = 0;
		this.right = 0;
		this.maxCountEnemy = 7;
		this.timeout = 0;
		this.height = 100;
		this.width = 170;
		this.count = 0;
	}
	addEnemy() {
		if (this.timeout == 0 && this.count < this.maxCountEnemy) {
			this.enemies[this.right] = {x: canvas.width - this.width , y: randomInt(20, canvas.height - 20 - this.height), dx: -3, dy: -3, health: 25, status: 1};
			EBullets.enemyBull[this.right] = {left: 0, right: 0, timeout: 0, mas: []};
			this.right += 1;
			if (this.right == this.maxCountEnemy + 20)
				this.right = 0;
			this.timeout = 240;
			this.count++;
		} else {
			if (this.timeout > 0)
				this.timeout--;
		}
	}
	checkList(left, right) {
		
		for (let i = left; i < right; ++i) {
			if (this.enemies[i].status == 1) {
				
				this.enemies[i].x += this.enemies[i].dx;
				this.enemies[i].y += this.enemies[i].dy;
				ctx.drawImage(this.img, this.enemies[i].x, this.enemies[i].y);
				EBullets.draw(i);
				if (this.enemies[i].x < canvas.width / 2 || this.enemies[i].x + this.width > canvas.width)
					this.enemies[i].dx = -this.enemies[i].dx;
				if (this.enemies[i].y < 0 || this.enemies[i].y + this.height > canvas.height)
					this.enemies[i].dy = -this.enemies[i].dy;
			} else {
				if (this.left == i) {
					this.left ++;
					if (this.left == this.maxCountEnemy + 1)
						this.left = 0;
				}
			}
		}
	}

	draw() {
		if (this.left < this.right) {
			this.checkList(this.left, this.right);
		} else if (this.left > this.right) {
			this.checkList(this.left, this.maxCountEnemy + 20);
			this.checkList(0, this.right);
		}

	}
}
var enemy;

class EnemyBullet {
	constructor (img) {
		this.enemyBull = [];
		this.img = new Image();
		this.img.src = img;
		this.maxCountBul = 1000;
	}
	addBullet(numEnemy, bx, by) {
		
		if (this.enemyBull[numEnemy].timeout == 0) {
			this.enemyBull[numEnemy].mas[this.enemyBull[numEnemy].right] = {x: bx + 50, y: by, status: 1};
			this.enemyBull[numEnemy].right += 1;
			if (this.enemyBull[numEnemy].right == this.maxCountBul)
				this.enemyBull[numEnemy].right = 0;
			this.enemyBull[numEnemy].timeout = 50;
			
		} else {
			this.enemyBull[numEnemy].timeout--;
		}
	}

    checkListForMove(left, right, numEnemy) {
		for (let i = left; i < right; ++i) {
			if (this.enemyBull[numEnemy].mas[i].status == 1) {
				ctx.drawImage(this.img, this.enemyBull[numEnemy].mas[i].x, this.enemyBull[numEnemy].mas[i].y);
				this.enemyBull[numEnemy].mas[i].x -= 8;
				if (this.enemyBull[numEnemy].mas[i].x > canvas.width)
					this.enemyBull[numEnemy].mas[i].status = 0;
				this.getCollision(numEnemy, i);


			} else {
				if (this.enemyBull[numEnemy].left == i) {
					this.enemyBull[numEnemy].left++;
					if (this.enemyBull[numEnemy].left == this.maxCountBul)
						this.enemyBull[numEnemy].left = 0;
				}
			}
			
		}
	}

	getCollision(numEnemy, i) {
		if (this.enemyBull[numEnemy].mas[i].x < playerShip.x + playerShip.width && this.enemyBull[numEnemy].mas[i].x + 34 > playerShip.x &&
			this.enemyBull[numEnemy].mas[i].y < playerShip.y + playerShip.height && this.enemyBull[numEnemy].mas[i].y + 10 > playerShip.y) {
			this.enemyBull[numEnemy].mas[i].status = 0;
			if (playerShip.immortality == 0) {
				playerShip.immortality = 180;
				playerShip.lives--;
			}
		}
	}

	draw(numEnemy) {
		this.addBullet(numEnemy, enemy.enemies[numEnemy].x, enemy.enemies[numEnemy].y);
		if (this.enemyBull[numEnemy].left < this.enemyBull[numEnemy].right) {
			this.checkListForMove(this.enemyBull[numEnemy].left, this.enemyBull[numEnemy].right, numEnemy);
		} else if (this.left > this.right) {
			this.checkListForMove(this.enemyBull[numEnemy].left, this.enemyBull[numEnemy].maxCountBul, numEnemy);
			this.checkListForMove(0, this.enemyBull[numEnemy].right, numEnemy);
		}

	}

}
var EBullets;

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
	bgStars.drawStar();
	playerShip.draw();
	playerBullets.draw();
	asteroid.draw();
	enemy.addEnemy();
	enemy.draw();
	

	if (playerShip.lives == 0) {
		clearInterval(interval);
		End();
	}
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






function randomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}





