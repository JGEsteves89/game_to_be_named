import Puzzle from './Puzzle.js';

export default class Level {
	constructor(levelSpec, sketcher, timer) {
		this.sketcher = sketcher;
		this.timer = timer;
		this.puzzle = new Puzzle(levelSpec);
		this.isMouseDown = false;
	}

	/**
	 * Level update loop that draws and updates elements
	 * @param deltaTime Delta time since last update
	 */
	update(deltaTime) {
		this.sketcher.drawPuzzle(this.puzzle);
	}

	/**
	 * Starts the main loop of level update
	 */
	start() {
		this.timer.startTimer(this.update.bind(this));
	}

	/**
	 * Callback for when there is a mouse down
	 * @param {event} event mouse down event
	 */
	mouseDown(event) {
		this.isMouseDown = true;
		const j = event.layerX / this.sketcher.sw | 0;
		const i = event.layerY / this.sketcher.sh | 0;
		this.sketcher.select(i, j);
	}

	/**
	 * Callback for when the mouse is up
	 * @param {event} event mouse up event
	 */
	mouseUp(event) {
		this.isMouseDown = false;
		this.sketcher.deselect();
	}

	/**
	 * Callback for when the mouse moves
	 * @param {event} event mouse move event
	 */
	mouseMove(event) {
		if (this.isMouseDown) {
			console.log('MouseMove');
		}
	}
}
