import PuzzleController from './PuzzleController.js';
import Puzzle from './Puzzle.js';

export default class Level {
	constructor(levelSpec, sketcher, timer) {
		this.sketcher = sketcher;
		this.timer = timer;
		this.puzzle = new Puzzle(levelSpec);
		this.controller = new PuzzleController(this.puzzle, this.sketcher);
	}

	update(deltaTime) {
		this.controller.drawPuzzle();
	}

	start() {
		this.timer.startTimer(this.update.bind(this));
	}

	mouseDown(event) {
		this.isMouseDown = true;
		const j = event.layerX / this.sketcher.sw | 0;
		const i = event.layerY / this.sketcher.sh | 0;
		if (i >= 0
			&& j >= 0
			&& i < this.puzzle.nr
			&& j < this.puzzle.nc) {
			this.controller.select(i, j);
		}
	}

	mouseUp(event) {
		this.controller.deselect();
	}

	mouseMove(event) {
		if (this.controller.selected) {
			const dx = event.movementX;
			const dy = event.movementY;
			this.controller.move(dx, dy);
		}
	}
}
