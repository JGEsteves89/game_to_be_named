export default class Drawable {
	constructor(x, y, width, height) {
		this.dx = 0;
		this.dy = 0;
		this.plot(x, y, width, height);
	}

	get top() {
		return this.y + this.dy;
	}

	get bottom() {
		return this.y + this.dy + this.height;
	}

	get right() {
		return this.x + this.dx + this.width;
	}

	get left() {
		return this.x + this.dx;
	}

	plot(x, y, width, height) {
		this.x = x;
		this.y = y;
		this.width = width;
		this.height = height;
	}
}
