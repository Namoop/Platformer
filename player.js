//the functions the main loop utses (in no particular order
function resetLevel() {
	if (checkpointX) {
		sprite.x = checkpointX[1]
		sx = checkpointX[0]
		sprite.y = checkpointY[1]
		sy = checkpointY[0]
	}
	else sy = 0, sx = 0, speedy = 0, speedx = 0, sprite.x = 0, sprite.y = 300, fallIn = 125
}
function callPlatform(pl) {
	if (pl == 2) resetLevel()
	if (pl == 3) boing = 1
	else boing = 0
	if (pl == 4) checkpointX = [sx, sprite.x], checkpointY = [sy, sprite.y]
	if (pl == 5) ice = 1
	else ice = 0
	if (pl == 6) var a = 0//next level
}
function doScroll() {
	if (fallIn > 0) fallIn--
	if (sprite.x > (canvas.width / 4)) sx -= sprite.x - (canvas.width / 4), sprite.x = (canvas.width / 4)
	if (sprite.x < -(canvas.width / 4)) sx += -(canvas.width / 4) - sprite.x, sprite.x = -(canvas.width / 4)
	if (sprite.y < -(canvas.height / 4)) {
		sy += -(canvas.height / 4) - sprite.y
		sprite.y = -(canvas.height / 4)
		if (sy > (canvas.height + 200)) resetLevel()
	}
	if (sprite.y > (canvas.height / 4) && fallIn == 0) sy -= sprite.y - (canvas.height / 4), sprite.y = (canvas.height / 4)
}
function doSmoothY() {
	if (mean(...smoothy) > sprite.y - 2 && mean(...smoothy) < sprite.y + 2) { if (!smoothy.includes(sprite.y)) smoothy.push(sprite.y) }
	else smoothy.splice(0, smoothy.length, sprite.y)
}
function walk(dir, speed, step) {
	sprite.rotation = dir
	d = sprite.rotation > 0 ? 1 : -1
	sprite.x += ice ? speed * 2.5 : speed
	frame += Math.abs(speed) / 5
	if (theml) sprite.y = theml.origin.y, sprite.x = theml.origin.x
	var prevy = sprite.y
	for (slope = 0; ; slope++) {
		sprite.y += 0.01
		getTouching(inPlatform == 1)
		if (slope == step || touch == 0) break
	}
	if (slope == step) {
		sprite.x -= ice ? speed * 2.5 : speed
		sprite.y = prevy
		if (touch == 1 && inPlatform == 1) {
			inPlatform++
			walk(dir, speed, step)
			if (speedx == 0) inPlatfdaorm = 1
		}
		else if (controls[2] && touch > 1 && Math.abs(speed) > 0.05 && wallJump == 0 && falling > 50) {
			speedx = d * -0.8
			speedy = 2
			falling = 60
			wallJump = 150
		}
		else speedx = 0
	}
}
function collision() {
	for (var i = -1; i <= hitbox.length; i += 4) {
		if (lineRect(hitbox[i + 1] + sx, hitbox[i + 2] + sy, hitbox[i + 3] + sx, hitbox[i + 4] + sy, sprite.x - 12, sprite.y - 25, 24, 50)) {
			//if above condition is true then the player IS touching a platform

			//below if/else handles dropthrough conditions
			if (currentLevel[((i + 1) / 4)].type == 1 || currentLevel[((i + 1) / 4)].isMLx || currentLevel[((i + 1) / 4)].isMLy) if (speedy > -0.03 || controls[3] || mllm == true) { mllm = true; return 2 }
			else mllm = false

			//this should add the player to the platform's personal "touching" list if it's a moving platform
			if (currentLevel[((i + 1) / 4)].isMLx) if (!currentLevel[((i + 1) / 4)].touching.includes('player')) currentLevel[((i + 1) / 4)].touching.push('player')
			if (currentLevel[((i + 1) / 4)].isMLy) if (!currentLevel[((i + 1) / 4)].touching.includes('player')) currentLevel[((i + 1) / 4)].touching.push('player')

			//Checking if the platform is anything special (trampoline, lava, etc)
			callPlatform(currentLevel[((i + 1) / 4)].type)
			return 1
		}
	}
	mllm = false
	return 0
}
function getTouching(cDrop) {
	var col = collision()
	if (col == 1) touch = 9
	else if (cDrop && col == 2) touch = 1
	else touch = 0
}
function checkUpDown(up) {
	getTouching(true)
	if (touch == 0) inPlatform = 1
	else if (up && touch == 1) inPlatform = 2
	for (; touch > inPlatform;) {
		if (up) sprite.y--
		else sprite.y++ , falling = 0
		getTouching(!up)
		speedy = 0
	}
}
function controlsLeftRight() {
	if (controls[0] && controls[1]) speedx *= 0.99
	if (controls[0]) speedx -= .01
	if (controls[1]) speedx += .01
	speedx *= 0.99
}
function controlsUpDown() {
	if (controls[2]) {
		if (jumpKey == 0 && falling < 3) {
			speedy = 2.1 + 1 * boing
			falling = 6
			jumpKey = 1
		}
	}
	else jumpKey = 0
	if (controls[3]) inPlatform = 2
}
function gravity() {
	if (speedy < 0.10 || controls[2]) speedy -= 0.025
	else speedy -= 0.05
	sprite.y += speedy
	falling++
}
var c = 0, v = 0;
function rotation() {
	if (controls[0]) d = -1
	if (controls[1]) d = 1
}
function doDrawPlayer() {
	xvar = sprite.x;
	oldy = sprite.y
	yvar = mean(...smoothy)
	//frame = 0
	if (falling < 30) {
		if (frame == 0) {
			drawPlayer(9 + 10*sprite2);
		}
		else {
			drawPlayer(Math.floor((frame % (8 + 10*sprite2) + 1)));
		}
	}
	else if (speedy > 0) {
		drawPlayer(10 + 10*sprite2);
	}
	else {
		drawPlayer(11 + 10*sprite2);
	}
	sprite.x = xvar;
	sprite.y = oldy;
}

function lineLine(x1, y1, x2, y2, x3, y3, x4, y4) {
	var uA = ((x4 - x3) * (y1 - y3) - (y4 - y3) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
	var uB = ((x2 - x1) * (y1 - y3) - (y2 - y1) * (x1 - x3)) / ((y4 - y3) * (x2 - x1) - (x4 - x3) * (y2 - y1));
	if (uA >= 0 && uA <= 1 && uB >= 0 && uB <= 1) {
		return true
	}
	return false
}
function lineRect(x1, y1, x2, y2, rx, ry, rw, rh) {
	var left = lineLine(x1, y1, x2, y2, rx, ry, rx, ry + rh);
	var right = lineLine(x1, y1, x2, y2, rx + rw, ry, rx + rw, ry + rh);
	var top = lineLine(x1, y1, x2, y2, rx, ry, rx + rw, ry);
	var bottom = lineLine(x1, y1, x2, y2, rx, ry + rh, rx + rw, ry + rh);
	if (left || right || top || bottom) {
		return true;
	}
	return false;
}
function mean() {
	var total = 0
	for (var kji of arguments) total += kji
	return total / arguments.length
}


