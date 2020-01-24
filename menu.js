var mainLoop = setInterval(main, 1)
pause()

doLoadBar = setInterval(drawLoadbar, 10)

var imgs = document.images,
	len = imgs.length,
	loadBar = 0;

[].forEach.call(imgs, function (img) {
	if (img.complete)
		loadBar++
	else
		img.addEventListener('load', function () { loadBar++ }, false);
});

function drawLoadbar() {
	canvas.width = canvas.width
	pen.textAlign = 'center'
	drawText('UNTITLED', 0, 80, 80, "Exo", 'bd38c6')
	pen.textAlign = 'center'
	drawText('KNIGHT GAME', 0, 0, 80, "Exo", 'bd38c6')
	pen.textAlign = 'center'
	drawText('made by:           ', 0, -50, 50, 'Shadows into light', '6dd8e6')
	pen.textAlign = 'center'
	drawText('        the banana', 0, -50, 50, 'Shadows into light', 'E7D709')
	drawLine(0 - canvas.width / 4 - 10, 0 - canvas.height / 4, canvas.width / 4 + 10, 0 - canvas.height / 4, 20, '000000')
	drawLine(0 - canvas.width / 4, 0 - canvas.height / 4, 0 - canvas.width / 4 + (((loadBar / 88) * 100) * canvas.width / 2) / 100, 0 - canvas.height / 4, 8, '0033ff')
	var eieio = document.getElementById('ban')
	pen.drawImage(eieio, canvas.width/2+190, canvas.height/2+10, eieio.width/6, eieio.height/6)
	drawText(Math.round((loadBar / 88) * 100) + "%", canvas.width / 4 + 20, 0 - canvas.height / 4 - 7, 20, 'Exo', '000000')
	if (loadBar >= 87) {
		clearInterval(doLoadBar)
		doLoadBar = setInterval(playButton, 10)
	}
}

var mouseX, mouseY
var playbuttonsize = 0
function playButton() {
	drawLoadbar()
	var mouseOn = mouseX > -80 && mouseX < 80 && mouseY > 0 - canvas.height / 4 - 50 - 25 && mouseY < 0 - canvas.height / 4 - 50 + 25
	playbuttonsize += mouseOn ? (70 - playbuttonsize) / 5 : (50 - playbuttonsize) / 5
	drawLine(-80 - (playbuttonsize - 50) - (0.125 * (playbuttonsize - 50) + 2.5), 0 - canvas.height / 4 - 50, 80 + (playbuttonsize - 50) + (0.125 * (playbuttonsize - 50) + 2.5), 0 - canvas.height / 4 - 50, (110 * playbuttonsize) / 100, '000000')
	drawLine(-80 - (playbuttonsize - 50), 0 - canvas.height / 4 - 50, 80 + (playbuttonsize - 50), 0 - canvas.height / 4 - 50, playbuttonsize, '00ff33')
	pen.textAlign = 'center'
	drawText('PLAY', 0, 0 - canvas.height / 4 - 70, playbuttonsize * 80 / 100, 'Shadows into light', '000000')
	if (mouseDown && mouseOn) {
		clearInterval(doLoadBar)
		pause()
	}
}


//Defining the main loop, what to run

function main() {
	//per frame setup
	clear();
	transfer();
	controlsMain()

	//the actual code
	controlsUpDown()
	gravity()
	checkUpDown(speedy > 0)
	if (sprite.y < -(canvas.height / 2)) sprite.y = canvas.height, speedy = 0
	if (wallJump > 0) wallJump--
	else controlsLeftRight()
	if (speedx < -0.05) walk(-90, speedx, 80)
	else if (speedx > 0.05) walk(90, speedx, 80)
	else frame = 0

	if (keyDown("KeyR")) resetLevel()

	//draw the frame
	doScroll();
	drawBG();
	drawLevel();
	doSmoothY();
	doDrawPlayer();
	drawJoystick();
	drawText(Math.round(timer * 100) / 100, -(canvas.width / 2 - 10), canvas.height / 2 - 40, 30, 'Exo', '00ffff')
	drawText(Math.round(mouseX - sx), -(canvas.width / 2 - 10), canvas.height / 2 - 60, 20, 'Exo', "ffffff")
	drawText(Math.round(mouseY - sy), -(canvas.width / 2 - 10), canvas.height / 2 - 80, 20, "Exo", "ffffff")
	spaceUp = false
	backspace = false
}