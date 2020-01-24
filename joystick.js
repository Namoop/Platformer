//the joystick
var joystLoop
var joystick1
var fadeLoop
var jyfade = {
	x: 0,
	y: 0,
	ix: 0,
	iy: 0,
	alpha: 0.9
}
canvas.addEventListener('touchstart', e => {
	joystick1 = true; joystLoop = setInterval(joystick.update, 1);
	setTimeout(joystick.reset, 10)
});
canvas.addEventListener('touchend', e => { fadeOut() })

var joystick = {
	x: 0,
	y: 0,
	ix: 0,
	iy: 0,
	dx: 0,
	dy: 0,
	dir: 0,
	up: false,
	left: false,
	right: false,
	down: false,
	reset: function () {
		joystick.x = mouseX;
		joystick.ix = mouseX;
		joystick.y = mouseY;
		joystick.iy = mouseY;
	},
	update: function () {
		joystick.dx = (mouseX - joystick.x)
		joystick.dy = (mouseY - joystick.y)
		joystick.dir = Math.atan2(joystick.dy, joystick.dx) * 2 * 180 / Math.PI
		joystick.ix = joystick.x + ((Math.abs(joystick.dx) > 60 ? 60 : Math.abs(joystick.dx)) * Math.cos((Math.PI / 360) * joystick.dir));
		joystick.iy = joystick.y + ((Math.abs(joystick.dy) > 60 ? 60 : Math.abs(joystick.dy)) * Math.sin((Math.PI / 360) * joystick.dir));
		joystick.right = joystick.ix - joystick.x > 30
		joystick.left = joystick.ix - joystick.x < -30
		joystick.up = joystick.iy - joystick.y > 30
		joystick.down = joystick.iy - joystick.y < -30
	}
}

function fadeOut() {
	joystick1 = 0;
	clearInterval(joystLoop);
	setTimeout(joystick.reset, 10)/*
	jyfade.alpha = 0.9
	jyfade.x = joystick.x
	jyfade.y = joystick.y
	jyfade.ix = joystick.ix
	jyfade.iy = joystick.iy
	fadeLoop = setInterval(function () {jyfade.alpha -= 0.1;}, 100)*/
}
function drawJoystick() {
	/*if (joystick1 == 0) {
		pen.globalAlpha = jyfade.alpha
		drawDot(jyfade.x, jyfade.y, 70, 'add8e6')
		drawDot(jyfade.ix, jyfade.iy, 55, 'a2c2ff')
		pen.globalAlpha = 1
		if (jyfade.alpha < 0.1) {
			clearInterval(fadeLoop)
			joystick1 = false
		}
	}*/
	if (joystick1) {
		pen.globalAlpha = 0.9
		drawDot(joystick.x, joystick.y, 70, 'add8e6')
		drawDot(joystick.ix, joystick.iy, 55, 'a2c2ff')
		pen.globalAlpha = 1
	}
	else {
		joystick.left = false
		joystick.right = false
		joystick.up = false
		joystick.down = false
	}
}