function init () {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d");
	var bodySize = document.body.getBoundingClientRect();
	canvas.setAttribute("width", bodySize.width);
	canvas.setAttribute("height", bodySize.height);
}



var canvas;
var ctx;



function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function keyDownHandler(e) {
	if (e.keyCode == 39) {	
		rightPressed = true;
	} else if (e.keyCode == 37) {
		leftPressed = true;
	}
}

function keyUpHandler(e) {
	if (e.keyCode == 39) {
		rightPressed = false;
	} else if (e.keyCode == 37) {
		leftPressed = false;
	}
}

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if(relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth/2;
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

draw();

//requestAnimationFrame(draw);