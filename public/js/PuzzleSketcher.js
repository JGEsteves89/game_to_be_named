import CanvasSketcher from './CanvasSketcher.js';
import PuzzleCamera from './PuzzleCamera.js';
import { loadSprites } from './loaders.js';

export default class PuzzleSketcher {
	constructor(context, puzzle, image) {
		this.context = context;
		this.tileWidth = 31 * 2;
		this.tileHeight = 31 * 2;
		this.puzzle = puzzle;
		this.sprites = loadSprites(image, this.tileWidth, this.tileHeight);
		this.canvas = new CanvasSketcher(this.sprites);
		this.camera = new PuzzleCamera(this.context.size, puzzle, this.tileWidth, this.tileHeight);
	}

	drawPuzzle() {
		// we want some system which allows to pitch like the cogs in a lock system
		// something which gives use the position of each item
		// we want to draw 1 tile before and after but only show the current
		for (let i = -1; i < this.puzzle.rows + 1; i++) {
			for (let j = -1; j < this.puzzle.cols + 1; j++) {
				// get will bring value
				const tileInfo = this.puzzle.get(i, j);
				console.log('Tile info:', i, j, tileInfo);
				const pos = this.camera.resolve(tileInfo);
				if (!tileInfo.selected) {
					this.canvas.drawTile(tileInfo, pos);
				} else {
					this.canvas.drawSelectedTile(tileInfo, pos);
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
