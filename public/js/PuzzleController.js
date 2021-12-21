import { DragMovement, Direction } from './DragMovement.js';

export default class PuzzleController {
	constructor(puzzle, sketcher) {
		this.puzzle = puzzle;
		this.puzzle.yawn(2, -2);
		this.puzzle.pitch(0, 2);
		this.puzzle.pitch(2, 5);

		this.sketcher = sketcher;
		this.selected = undefined;
		this.drag = new DragMovement();
	}

	update(deltaTime) {
		if (this.drag !== Direction.unknown) {
			for (const tile of this.puzzle.tiles) {
				if (this.drag.direction === Direction.x) {
					if (tile.i === this.drag.index) {
						tile.dx = this.drag.dist;
					}
				} else if (this.drag.direction === Direction.y) {
					if (tile.j === this.drag.index) {
						tile.dy = this.drag.dist;
					}
				}
			}
		}

		this.sketcher.drawPuzzle();
	}

	mouseDown(canvas, event) {
		const j = event.layerX / this.sketcher.tileWidth | 0;
		const i = event.layerY / this.sketcher.tileHeight | 0;
		if (i >= 0
			&& j >= 0
			&& i < this.puzzle.rows
			&& j < this.puzzle.cols) {
			this.select(i, j);
		}
	}

	mouseUp(canvas, event) {
		if (this.selected) {
			this.deselect();
		}
	}

	mouseMove(canvas, event) {
		if (this.selected) {
			this.move(event.movementX, event.movementY);
		}
	}

	select(i, j) {
		this.selected = this.puzzle.get(i, j);
		if (this.selected) {
			this.selected.selected = true;
			this.drag.clear();
		}
	}

	deselect() {
		if (this.selected) {
			if (this.drag.direction !== Direction.unknown) {
				if (this.drag.direction === Direction.x) {
					const dist = this.drag.dist + Math.sign(this.drag.dist) * this.sketcher.tileWidth / 2;
					const displacement = dist / this.sketcher.tileWidth | 0;
					this.puzzle.yawn(this.drag.index, displacement);
				} else if (this.drag.direction === Direction.y) {
					const dist = this.drag.dist + Math.sign(this.drag.dist) * this.sketcher.tileHeight / 2;
					const displacement = dist / this.sketcher.tileHeight | 0;
					this.puzzle.pitch(this.drag.index, displacement);
				}
				for (const tile of this.puzzle.tiles) {
					if (this.drag.direction === Direction.x) {
						if (tile.i === this.drag.index) {
							tile.dx = 0;
						}
					} else if (this.drag.direction === Direction.y) {
						if (tile.j === this.drag.index) {
							tile.dy = 0;
						}
					}
				}
			}
		}
		this.selected.selected = false;
		this.drag.clear();
		this.selected = undefined;
	}

	move(dx, dy) {
		const isMovingInX = Math.abs(dx) > Math.abs(dy);
		const isMovingInY = Math.abs(dy) > Math.abs(dx);

		if (this.drag.direction === Direction.unknown) {
			if (isMovingInX) {
				this.drag.direction = Direction.x;
			} else if (isMovingInY) {
				this.drag.direction = Direction.y;
			}
		}

		if (this.drag.direction === Direction.x) {
			this.drag.dist += dx;
			this.drag.index = this.selected.i;
		} else if (this.drag.direction === Direction.y) {
			this.drag.dist += dy;
			this.drag.index = this.selected.j;
		}
	}
}
