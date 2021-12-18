import CanvasSketcher from './CanvasSketcher.js';
import PuzzleCamera from './PuzzleCamera.js';
import { loadSprites } from './loaders.js';

export default class PuzzleSketcher {
	constructor(context, puzzle, image, frameWidth, frameHeight) {
		this.context = context;
		this.tileWidth = frameWidth / puzzle.cols;
		this.tileHeight = frameHeight / puzzle.rows;
		this.puzzle = puzzle;
		this.sprites = loadSprites(image, this.tileWidth, this.tileHeight);
		this.canvas = new CanvasSketcher(this.sprites);
		this.camera = new PuzzleCamera(this.context.size, puzzle, this.tileWidth, this.tileHeight);

		for (const tile of this.puzzle.tiles) {
			const x = tile.j * this.tileWidth;
			const y = tile.i * this.tileHeight;
			tile.plot(x, y, this.tileWidth, this.tileHeight);
		}
	}

	drawPuzzle() {
		// we want some system which allows to pitch like the cogs in a lock system
		// something which gives use the position of each item
		// we want to draw 1 tile before and after but only show the current
		for (const tile of this.puzzle.tiles) {
			this.canvas.drawTile(tile, this.context);
			if (tile.selected) {
				this.canvas.drawSelected(tile, this.context);
			}
		}
	}
}
