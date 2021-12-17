import CanvasSketcher from './CanvasSketcher.js';
import { loadSprites } from './loaders.js';

export default class Sketcher {
	constructor(context, image) {
		this.context = context;
		this.sw = 31 * 2;
		this.sh = 31 * 2;
		this.sprites = loadSprites(image, this.sw, this.sh);
		this.canvas = new CanvasSketcher(this.sprites);
	}

	drawPuzzle(puzzle, selected) {
		for (let i = 0; i < puzzle.nr; i++) {
			for (let j = 0; j < puzzle.nc; j++) {
				const movementDisplacement = { dx: 0, dy: 0 };
				if (selected) {
					if (selected.dx > 0 && selected.i === i) {
						movementDisplacement.dx = selected.dx;
					} else if (selected.dy > 0 && selected.j === j) {
						movementDisplacement.dy = selected.dy;
					}
				}

				this.canvas.drawTile(
					puzzle.get(i, j),
					this.context,
					i,
					j,
					this.sw,
					this.sh,
					movementDisplacement
				);

				if (this.selected && this.selected.i === i && this.selected.j === j) {
					this.canvas.drawSelected(this.context, i, j, this.sw, this.sh, movementDisplacement);
				}
			}
		}
	}

	select(i, j) {
		this.selected = { i, j };
	}

	deselect() {
		this.selected = undefined;
	}
}
