export default class PuzzleController {
	constructor(puzzle, sketcher) {
		this.puzzle = puzzle;
		this.sketcher = sketcher;
		this.selected = undefined;
	}

	drawPuzzle() {
		this.sketcher.drawPuzzle(this.puzzle, this.selected);
	}

	select(i, j) {
		this.sketcher.select(i, j);
		this.selected = {
			i, j, dx: 0, dy: 0
		};
	}

	deselect() {
		this.sketcher.deselect();

		if (this.selected) {
			if (Math.abs(this.selected.dy) > Math.abs(this.selected.dx)) {
				const displacement = this.selected.dy / this.sketcher.sh | 0;
				this.puzzle.pitch(this.selected.j, displacement);
			} else if (Math.abs(this.selected.dx) > Math.abs(this.selected.dy)) {
				const displacement = this.selected.dx / this.sketcher.sw | 0;
				this.puzzle.yawn(this.selected.i, displacement);
			}
		}

		this.selected = undefined;
	}

	move(dx, dy) {
		const isMovingInX = Math.abs(dx) > Math.abs(dy);
		const isMovingInY = Math.abs(dy) > Math.abs(dx);

		const hasMovedInX = this.selected.dx !== 0;
		const hasMovedInY = this.selected.dy !== 0;

		if (isMovingInY && !hasMovedInX) {
			this.selected.dy += dy;
			this.selected.dx = 0;
		} else if (isMovingInX && !hasMovedInY) {
			this.selected.dx += dx;
			this.selected.dy = 0;
		}
	}
}
