var hitbox = []
var currentLevel = []
var editmode = true


//Level Generator
//var level1 = [new Line(50, -50, -125, -50, 0), new Line(-125, -50, -250, -60, 0), new Line(50, -50, 200, 0, 0)]
var level1 = [new Line(50, -50, -125, -50, 0), new Line(50, -50, 50, 75, 0), new Line(-130, 30, -20, 30, 1), new Line(-125, -50, -300, -20, 0), new Line(100, -50, 250, -50, 0), new Line(-300, -20, -600, -20, 5), new MovingLineX(30, 0, -30, 0, 100, 350, 50, 0), new MovingLineY(-30, 0, 30, 0, 50, 300, -50, 3), new Line(-400, 100, -200, 100, 0)];
var level2 //= genMatrixPath(5, 5, 8)

function genLevel(w, h, l) {
	var matrix = genMatrixPath(w, h, l);
	//to implement - converting matrix to a level
}

function genMatrixPath(w, h, l) {
	var mmap = [], newX = rando(w - 1), newY = rando(h - 1)
	//make the map (as a 2 dimensional array)
	for (var i = 0; i < h; i++) {
		width = Array(Number(w)).fill('#')
		mmap.push(width)
	}
	//set the starting point
	mmap[newY][newX] = 1

	var lastX = newX, lastY = newY
	//generate the path
	for (var i = 1; i < l; i++) {
		//randomize the directions
		var dir = randoSequence([[1, 0], [-1, 0], [0, 1], [0, -1]])
		//clean up the list (needs to be done due to how randoSequence() returns)
		dir.forEach(function (a, b) {
			dir[Number(b)] = a.value
		})
		//cycle through each direction (in the random order that was set above)
		for (var i2 = 0; i2 < 5; i2++) {
			if (i2 == 4) break //how i handle if it gets cornered - ignore it
			newX = lastX + dir[Number(i2)][0]
			newY = lastY + dir[Number(i2)][1]
			//check if the new spot is open
			var dobreak = false
			try {
				if (mmap[newY][newX] == "#") dobreak = true
			}
			catch (e) {
				//If it throws an error, it means that it'd out of bounds. So check the other directions
			}
			if (dobreak) break
		}
		//add the new path part to the matrix
		lastX = newX
		lastY = newY
		mmap[newY][newX] = i + 1
	}

	return mmap
}





//Functions
function setML() {
	for (var i of currentLevel) {
		if (i.isMLx) {
			var oldX = i.origin.x
			var ltx = 40 * timer % (Math.abs(i.bg.a.x - i.bg.b.x))
			var ox = ltx > (Math.abs(i.bg.a.x - i.bg.b.x)) / 2 ? i.bg.b.x - (ltx * 2 - Math.abs(i.bg.a.x - i.bg.b.x)) : i.bg.a.x + (ltx * 2)
			var oy = i.bg.a.y
			i.p = [ox + i.mn.a.x, oy + i.mn.a.y, ox + i.mn.b.x, oy + i.mn.b.y]
			i.origin = new Point(ox, oy)
			i.speed = i.origin.x - oldX
			if (i.touching.includes('player')) sprite.x += i.speed
			if (falling > 20) i.touching.splice(i.touching.indexOf('player'), 1)
		}
		if (i.isMLy) {
			var oldY = i.origin.y
			var lty = 40 * timer % (Math.abs(i.bg.a.y - i.bg.b.y))
			var oy = lty > (Math.abs(i.bg.a.y - i.bg.b.y)) / 2 ? i.bg.b.y - (lty * 2 - Math.abs(i.bg.a.y - i.bg.b.y)) : i.bg.a.y + (lty * 2)
			var ox = i.bg.a.x
			i.p = [ox + i.mn.a.x, oy + i.mn.a.y, ox + i.mn.b.x, oy + i.mn.b.y]
			i.origin = new Point(ox, oy)
			i.speed = i.origin.y - oldY
			if (i.touching.includes('player')) sprite.y += i.speed
			if (falling > 20) i.touching.splice(i.touching.indexOf('player'), 1)
		}
	}
}
function transfer() {
	hitbox = []
	if (level == 1) currentLevel = level1.slice(); for (var gnq of level1) hitbox.push(...gnq.p)
	setML();
}
function drawLevel() {
	for (var q = 0; q < hitbox.length; q += 4) {
		var p1 = hitbox[q + 0] + sx, p2 = hitbox[q + 1] + sy, p3 = hitbox[q + 2] + sx, p4 = hitbox[q + 3] + sy
		var onMouse = lineCircle(p1, p2, p3, p4, mouseX, mouseY, 7)
		var color = addHexColor(platformHexColors[level1[q / 4].type], !editmode ? "0" : onMouse && q > 3 ? '444444' : '0') 
		drawLine(p1, p2, p3, p4, 5, platformHexColors[level1[q / 4].type])
		for (var v = 1; v < 20; v += 0.5) {
			pen.globalAlpha = 0.7 - (v / 2 / 10)
			drawLine(p1 + v, p2 - v, p3 + v, p4 - v, 1, color )
		}
		pen.globalAlpha = 1
		if (editmode) {
			var onpoint = false
			if (dist(p1, p2, mouseX, mouseY) < 12 && q > 3) {
				drawDot(p1, p2, 7, '000000')
				drawDot(p1, p2, 6, '23ff32')
				onPoint = true
			}
			if (dist(p3, p4, mouseX, mouseY) < 12 && q > 3) {
				drawDot(p3, p4, 7, '000000')
				drawDot(p3, p4, 6, '23ff32')
				onPoint = true
			}
			if (onMouse && q > 3) {
				if ((dist(p1, p2, mouseX, mouseY)) >= 12 && (dist(p3, p4, mouseX, mouseY) >= 12)) drawDot(mouseX, mouseY, 7, '43ab52')
				if (spaceUp) {
					level1[q / 4].type = (level1[q / 4].type + 1) % 6
					spaceUp = false
				}
				if (backspace) {
					level1.splice(q/4, 1, 0)
					backspace = false
				}
				if (mouseDown && onPoint)
			}
			//need:
			//new line (both points)
			//hook/unhook from gridlock
			//save & load?
		}
	}
	level1.forEach(function (a, b) {
		if (a == 0) level1.splice(b, 1)
	})
}
function addHexColor(c1, c2) {
	var hexStr = (parseInt(c1, 16) + parseInt(c2, 16)).toString(16);
	while (hexStr.length < 6) { hexStr = '0' + hexStr; } // Zero pad.
	return hexStr;
}
//drawLine(hitbox[q + 0] + sx, hitbox[q + 1] + sy, hitbox[q + 2] + sx, hitbox[q + 3] + sy, 3, platformHexColors[level1[q / 4].type])

function dist(a, b, x, y) {
	return Math.hypot(x - a, y - b)
}
function pointCircle(px, py, cx, cy, r) {
	var distX = px - cx, distY = py - cy;
	var distance = Math.sqrt((distX * distX) + (distY * distY));
	if (distance <= r) return true;
	return false;
}
function linePoint(x1, y1, x2, y2, px, py) {
	var d1 = dist(px, py, x1, y1);
	var d2 = dist(px, py, x2, y2);
	var lineLen = dist(x1, y1, x2, y2);
	var buffer = 0.1;    // higher # = less accurate
	if (d1 + d2 >= lineLen - buffer && d1 + d2 <= lineLen + buffer) {
		return true;
	}
	return false;
}
function lineCircle(x1, y1, x2, y2, cx, cy, r) {
	var inside1 = pointCircle(x1, y1, cx, cy, r), inside2 = pointCircle(x2, y2, cx, cy, r), distX = x1 - x2, distY = y1 - y2;
	if (inside1 || inside2) return true;
	var len = Math.sqrt((distX * distX) + (distY * distY));
	var dot = (((cx - x1) * (x2 - x1)) + ((cy - y1) * (y2 - y1))) / (len * len);
	var closestX = x1 + (dot * (x2 - x1));
	var closestY = y1 + (dot * (y2 - y1));
	var onSegment = linePoint(x1, y1, x2, y2, closestX, closestY);
	if (!onSegment) return false;
	distX = closestX - cx;
	distY = closestY - cy;
	var distance = Math.sqrt((distX * distX) + (distY * distY));
	if (distance <= r) return true;
	return false;
}