//Level Objects
function LevelTile(name, sides, goal) {
	this.name = name
	this.all = [...arguments].splice(3, arguments.length);
	this.sidesMaster = sides
	this.iLeft = sides[0] == 1 ? true : sides[0] == 3 ? true : false
	this.iRight = sides[1] == 1 ? true : sides[1] == 3 ? true : false
	this.iUp = sides[2] == 1 ? true : sides[2] == 3 ? true : false
	this.iDown = sides[3] == 1 ? true : sides[3] == 3 ? true : false
	this.oLeft = sides[0] == 2 ? true : sides[0] == 3 ? true : false
	this.oRight = sides[1] == 2 ? true : sides[1] == 3 ? true : false
	this.oUp = sides[2] == 2 ? true : sides[2] == 3 ? true : false
	this.oDown = sides[3] == 2 ? true : sides[3] == 3 ? true : false
	this.goal = goal
}
function Point(x1, y1) {
	this.x = x1
	this.y = y1
}
function Box(x, y, w, h) {
	this.top = new Line(x - w / 2, y + h / 2, x + w / 2, y + y / 2)
	this.left = 0
	this.right = 0
	this.down = 0
}
function Line(x1, y1, x2, y2, ty) {
	this.a = new Point(x1, y1)
	this.b = new Point(x2, y2)
	this.type = ty
	this.p = [x1, y1, x2, y2]
}
function MovingLineX(x1, y1, x2, y2, a, b, y, ty) {
	this.type = ty
	this.isMLx = true
	this.bg = new Line(a, y, b, y)
	this.mn = new Line(x1, y1, x2, y2)
	this.origin = new Point(a, y)
	this.p = [a + x1, y + y1, a + x2, y + y2]
	this.speed = 0
	this.touching = []
	this.touchingLast = []
}
function MovingLineY(x1, y1, x2, y2, a, b, x, ty) {
	this.type = ty
	this.isMLy = true
	this.bg = new Line(x, a, x, b)
	this.mn = new Line(x1, y1, x2, y2)
	this.origin = new Point(x, a)
	this.p = [x + x1, a + y1, x + x2, a + y2]
	this.speed = 0
	this.touching = []
	this.touchingLast = []
}

//Tile Defining
var tiles = [
	new LevelTile(
		"empty",
		[0, 0, 0, 0],
		false
	),
	new LevelTile(
		"flat"
		[3, 3, 0, 0],
		false,
		new Line (-100, -80, 100, -80, 0)
	),
	new LevelTile(
		"flat goal"
		[3, 3, 0, 0],
		true,
		new Line (-100, -80, 100, -80, 0)
	)
]