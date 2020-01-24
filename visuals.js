var sike
var sike2
var pframe = document.getElementById('2w1')
var sprite2 = true
var editValue = document.getElementById('editvalue').value
//A little loop to show some variables for debugging
setInterval(varLoop, 1)
function varLoop() {
	document.getElementById('watcher').innerHTML = `
	<br>${timer}<br>
	Use WASD to move around - Press "s" on blue platforms to drop through them. <br>
	Use the arrow keys to resize the screen. On mobile there is a joystick (use fingers) <br>
	TODO: coins, procedurally generated tile-ish levels`
	if (keyDown('ArrowRight')) canvas.width += 1
	if (keyDown('ArrowLeft')) canvas.width -= 1
	if (keyDown('ArrowUp')) canvas.height -= 1
	if (keyDown('ArrowDown')) canvas.height += 1
	mouseX = mousePos.x;
	mouseY = mousePos.y;
	editValue = document.getElementById('editvalue').value;
}
var logged = false
var mno = setInterval(function () {
	try {
		var final = level2.map(function (arr) {
			return arr.slice();
		});
		final.forEach(function (e, i, a) {
			final[i] = e.toString().replace(/,/g, " ")
		})
		document.getElementById('jkl').innerText = final.toString().replace(/,/g, "\n")
	}
	catch (e) {
		if (!logged) {
			logged = true
			console.log(e)
		}
		document.getElementById('jkl').innerText = "error with matrix"
	}
}, 100)


var cvbg = document.getElementById("bg");


function drawBG() {
	pen.drawImage(cvbg, sx/3 - (canvas.height * 2880/1800) + cvbg.width/6, 0-canvas.height/0.65-sy/10, canvas.height * 2880/1800 * 2.7, canvas.height*2.7)
}

function drawPlayer(iframe) {
	pframe = (sprite2 ? '2' : '') + 'w' + iframe + (d < 0 ? 'r' : '') + (iframe == 19 ? 'abcdefghijkl'.charAt(Math.round((timer*30)%11)) : '');
	player = document.getElementById(pframe)
	pen.drawImage(player, canvas.width / 2 + xvar - (iframe > 18 ? 60 : 42), canvas.height / 2 - yvar - (iframe > 18 ? 56 : 36), iframe > 18 ? 126 : 90, iframe > 18 ? 90 : 64.3);
	sprite.rotation = 90 * d;
}