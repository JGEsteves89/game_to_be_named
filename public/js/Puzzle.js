import Tile from './Tile.js';

export default class Puzzle {
	constructor(puzzleSpec) {
		this.tiles = [];

		this.rows = puzzleSpec.rows;
		this.cols = puzzleSpec.cols;
		this.target = puzzleSpec.target;
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.tiles.push(new Tile(i, j, this.target[i * this.cols + j]));
			}
		}
		this.hasFinish = false;
	}

	validateIndex(i, j) {
		const ni = (i >= 0) ? i % this.rows : i % this.rows + i;
		const nj = (j >= 0) ? j % this.cols : j % this.cols + j;
		return { ni, nj };
	}

	set(i, j, value) {
		const { ni, nj } = this.validateIndex(i, j);
		const tile = this.get(ni, nj);
		if (tile) {
			tile.value = value;
		}
	}

	get(i, j) {
		const { ni, nj } = this.validateIndex(i, j);
		for (const tile of this.tiles) {
			if (tile.i === ni && tile.j === nj) {
				return tile;
			}
		}
		return undefined;
	}

	yawn(row, displacement) {
		for (const tile of this.tiles) {
			if (tile.i === row) {
				tile.j = this.resolveIndex(tile.j, displacement, this.cols);
			}
		}
	}

	pitch(col, displacement) {
		for (const tile of this.tiles) {
			if (tile.j === col) {
				tile.i = this.resolveIndex(tile.i, displacement, this.rows);
			}
		}
	}

	resolveIndex(i, dist, total) {
		let newI = i + dist;
		newI %= total;
		if (newI < 0) {
			newI = total + newI;
		}
		return newI;
	}

	isComplete() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (this.get(i, j).value !== this.target[i * this.cols + j]) {
					this.hasFinish = false;
					return false;
				}
			}
		}
		this.hasFinish = true;
		return true;
	}
}
