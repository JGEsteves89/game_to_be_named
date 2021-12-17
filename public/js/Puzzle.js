export default class Puzzle {
	constructor(puzzleSpec) {
		this.mat = [];

		this.rows = puzzleSpec.rows;
		this.cols = puzzleSpec.cols;
		for (let i = 0; i < this.rows; i++) {
			const row = [];
			for (let j = 0; j < this.cols; j++) {
				row.push(puzzleSpec.target[i * this.cols + j]);
			}
			this.mat.push(row);
		}
		console.table(this.mat);
	}

	validateIndex(i, j) {
		const ni = (i >= 0) ? i % this.rows : i % this.rows + i;
		const nj = (j >= 0) ? j % this.cols : j % this.cols + j;
		return { ni, nj };
	}


	set(i, j, value) {
		const { ni, nj } = this.validateIndex(i, j);
		this.mat[ni][nj] = value;
	}

	get(i, j) {
		console.log(i, j);
		const { ni, nj } = this.validateIndex(i, j);
		console.log(ni, nj);
		return this.mat[ni][nj];
	}

	pitch(col, dis) {
		const copyMat = this.mat.map(r => [...r]);
		for (let i = 0; i < this.rows; i++) {
			const newI = this.resolveIndex(i, dis, this.rows);
			this.mat[newI][col] = copyMat[i][col];
		}
	}

	yawn(row, dis) {
		const copyMat = this.mat.map(r => [...r]);
		for (let j = 0; j < this.cols; j++) {
			const newJ = this.resolveIndex(j, dis, this.cols);
			this.mat[row][newJ] = copyMat[row][j];
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
}
