import CanvasSketcher from './CanvasSketcher.js';
import PuzzleCamera from './PuzzleCamera.js';
import { loadSprites } from './loaders.js';
import Drawable from './Drawable.js';

export default class PuzzleSketcher {
	constructor(context, puzzle, image, frameWidth, frameHeight) {
		this.context = context;
		this.frame = new Drawable(0, 0, frameWidth, frameHeight);
		this.tileWidth = this.frame.width / puzzle.cols;
		this.tileHeight = this.frame.height / puzzle.rows;
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
		this.canvas.drawFrame(this.frame, this.context);

		for (const tile of this.puzzle.tiles) {
			tile.x = tile.j * this.tileWidth;
			tile.y = tile.i * this.tileHeight;

			if (tile.bottom > this.frame.bottom) {
				this.canvas.drawTile(tile, this.context);
				const offset = tile.bottom % this.frame.height;
				const newPos = -tile.height + offset;
				tile.dy = newPos - tile.y;
			}
			if (tile.top < this.frame.top) {
				this.canvas.drawTile(tile, this.context);
				const offset = tile.top % this.frame.height;
				const newPos = this.frame.height + offset;
				tile.dy = newPos - tile.y;
			}
			if (tile.right > this.frame.right) {
				this.canvas.drawTile(tile, this.context);
				const offset = tile.right % this.frame.width;
				const newPos = -tile.width + offset;
				tile.dx = newPos - tile.x;
			}
			if (tile.left < this.frame.left) {
				this.canvas.drawTile(tile, this.context);
				const offset = tile.left % this.frame.width;
				const newPos = this.frame.width + offset;
				tile.dx = newPos - tile.x;
			}

			this.canvas.drawTile(tile, this.context);
		}
	}
}
