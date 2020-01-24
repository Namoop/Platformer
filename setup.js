//setup stuff
//key detection
var map = {};
var all = [];
var spaceUp = false, backspace = false;
onkeydown = onkeyup = function (e) {
	e = e || event;
	if (e.type == 'keyup') all.splice(all.indexOf(e.code), 1);
	else if (e.type == 'keydown') if (!all.includes(e.code)) all.push(e.code)
	map[e.keyCode] = e.type == 'keydown';
	if (map[80]) pause()
	if (map[32]) spaceUp = !spaceUp
	if (map[8]) backspace = !backspace
}
//canvas setup
var canvas = document.getElementById("myCanvas"); //get Canvas
var pen = canvas.getContext("2d")  //define pen
canvas.width = window.innerWidth - 30
canvas.height = window.innerHeight - 200

//mousedown
var mouseDown = 0;
document.body.onmousedown = function() { 
  ++mouseDown;
}
document.body.onmouseup = function() {
  ++mouseDown;
}
// Set up touch events for mobile, etc
canvas.addEventListener("touchstart", function (e) {
	mousePos = getTouchPos(canvas, e);
	++mouseDown;
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent("mousedown", {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchend", function (e) {
	--mouseDown;
	var mouseEvent = new MouseEvent("mouseup", {});
	canvas.dispatchEvent(mouseEvent);
}, false);
canvas.addEventListener("touchmove", function (e) {
	var touch = e.touches[0];
	var mouseEvent = new MouseEvent("mousemove", {
		clientX: touch.clientX,
		clientY: touch.clientY
	});
	canvas.dispatchEvent(mouseEvent);
}, false);

// Get the position of a touch relative to the canvas
function getTouchPos(canvasDom, touchEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: touchEvent.touches[0].clientX - rect.left - canvas.width / 2,
		y: -1 * (touchEvent.touches[0].clientY - rect.top - (canvas.height / 2))
	};
}

//mouse positions
var mousePos = { x: 0, y: 0 };
var lastPos = mousePos;
canvas.addEventListener("mousedown", function (e) {
	lastPos = getMousePos(canvas, e);
}, false);
canvas.addEventListener("mousemove", function (e) {
	mousePos = getMousePos(canvas, e);
}, false);

// Get the position of the mouse relative to the canvas
function getMousePos(canvasDom, mouseEvent) {
	var rect = canvasDom.getBoundingClientRect();
	return {
		x: mouseEvent.clientX - rect.left - (canvas.width / 2),
		y: -1 * (mouseEvent.clientY - rect.top - (canvas.height / 2))
	};
}
//Vaiable initiations - I know about let and const, I prefer var idk why
var platformHexColors = ["a86110", "0000FF", "FF0000", "FFFF00", "00FF00", "08c9f7"]
var platformHexColor = ["a86110", "FF0000", "FFFF00", "00ff00", "0000FF", "722ebd", "08c9f7"], stopall = 0, moving = [], texts = [], coins = [], dropdown = { positions: [], options: [], check: 0, clickTick: 0, i: 0, opened: 0, optionHover: 0, reversed: 0, size: 20 }, smoothy = [], controls = [false, false, false, false], allKeys = [], b, m, touch, d = 0, antiIceJerk, checkpointX, checkpointY, falling = 0, frame, i2, i3, i4, i5, i6, i8, i9, ice, inPlatform
	, jumpKey, level = 1, lines, slope, speedx = 0, speedy = 0, sx = 0, sy = 0, wallJump = 0, xvar, yvar, fallIn = 0, sprite = { x: 0, y: 0, rotation: 0 }, boing, theml, tMP = 0, mllm = 0;

//timer setup
var albertTheWise = new Date()
var timer = 0
//the actual loop is in the pause function
var timerLoop = setInterval(function () {}, 100);

//draw functions and basic things
function clear() {
	canvas.width = canvas.width
}
function drawLine(x1, y1, x2, y2, s, hex) {
	pen.strokeStyle = "#" + hex;
	pen.lineWidth = s;
	pen.beginPath();
	pen.moveTo(x1 + (canvas.width / 2), (canvas.height / 2) - y1);
	pen.lineTo(x2 + (canvas.width / 2), (canvas.height / 2) - y2);
	pen.stroke();
}
function line(x1, y1, x2, y2) {
	pen.beginPath();
	pen.moveTo(x1 + (canvas.width / 2), (canvas.height / 2) - y1);
	pen.lineTo(x2 + (canvas.width / 2), (canvas.height / 2) - y2);
	pen.stroke();
}
function drawLine2(x, y, length, dir, s, hex) {
	drawLine(x, y, x + (length * Math.cos((Math.PI / 360) * dir)), y + (length * Math.sin((Math.PI / 360) * dir)), s, hex)
	sprite.x = x + (length * Math.cos((Math.PI / 360) * dir));
	sprite.y = y + (length * Math.sin((Math.PI / 360) * dir));
}
function drawDot(x, y, ps, hex) {
	var radius = 80;
	pen.beginPath();
	pen.arc((canvas.width / 2) + x, (canvas.height / 2) - y, ps, 0, 2 * Math.PI, false);
	pen.fillStyle = '#' + hex;
	pen.fill();
	pen.lineWidth = 5;
	pen.strokeStyle = '#' + hex;
	pen.stroke();
}
function keyDown(k) {
	return all.includes(k)
}
function controlsMain() {
	controls.splice(0, 1, keyDown("KeyA") || joystick.left);
	controls.splice(1, 1, keyDown("KeyD") || joystick.right);
	controls.splice(2, 1, keyDown("KeyW") || joystick.up);
	controls.splice(3, 1, keyDown("KeyS") || joystick.down);
}
function drawEllipse(x, y, r1, r2) {
	pen.beginPath();
	pen.ellipse(x + (canvas.width / 2), (canvas.height / 2) - y, r1, r2, 0, 0, Math.PI * 2)
	pen.stroke();
}
function timerReset() { timer = 0 }
function drawRect(x, y, w, h) {
	pen.beginPath();
	pen.rect(x + (canvas.width / 2) - w / 2, (canvas.height / 2) - y - h / 2, w, h);
	pen.stroke();
}
function drawText(txt, x, y, size, fomt, hex) {
	pen.font = size + 'px ' + fomt
	pen.fillStyle = "#" + hex
	pen.fillText(txt, x + (canvas.width / 2), (canvas.height / 2) - y)
	pen.textAlign = 'start'
}
var paused = false
function pause() {
	if (paused == false) {
		clearInterval(mainLoop);
		clearInterval(timerLoop);
		paused = true
	}
	else {
		mainLoop = setInterval(main, 1);
		//set up the timer
		timerLoop = setInterval(function () {
			var johnTheUnwise = new Date()
			timer = (johnTheUnwise - albertTheWise)/1000
		}, 43);
		paused = false;
	}
}
