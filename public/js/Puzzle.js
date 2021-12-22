import Tile from './Tile.js';

export default class Puzzle {
	constructor(puzzleSpec) {
		this.tiles = [];
		this.shuffles = 5;
		this.hasFinish = false;
		this.rows = puzzleSpec.rows;
		this.cols = puzzleSpec.cols;
		this.target = puzzleSpec.target;
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.tiles.push(new Tile(i, j, this.target[i * this.cols + j]));
			}
		}
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

	shuffle() {
		let yawn = -1;
		while (this.isComplete()) {
			for (let i = 0; i < this.shuffles; i++) {
				const smallest = this.cols > this.rows ? this.rows : this.cols;
				const index = Math.random() * smallest | 0;
				const disp = Math.random() * smallest | 0;
				yawn *= -1;
				if (yawn === 1) {
					this.yawn(index, disp);
				} else {
					this.pitch(index, disp);
				}
			}
		}
	}

	isComplete() {
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				if (!this.isEqual(this.get(i, j).value, this.target[i * this.cols + j])) {
					this.hasFinish = false;
					return false;
				}
			}
		}
		this.hasFinish = true;
		return true;
	}


	isEqual(a, b) {
		return a.r === b.r && a.g === b.g && a.b === b.b && a.a === b.a;
	}
}
