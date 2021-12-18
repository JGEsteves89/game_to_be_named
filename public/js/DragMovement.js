export const Direction = Object.freeze({
	unknown: Symbol('unknown'),
	x: Symbol('x'),
	y: Symbol('y'),
});

export class DragMovement {
	constructor() {
		this.clear();
	}

	clear() {
		this.direction = Direction.unknown;
		this.dist = 0;
		this.index = -1;
	}
}
