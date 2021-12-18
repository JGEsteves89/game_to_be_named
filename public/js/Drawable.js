export default class Drawable {
	constructor(x, y, width, height) {
		this.plot(x, y, width, height);
	}

	plot(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.dx = 0;
		this.dy = 0;
		this.width = width;
		this.height = height;
	}
}
