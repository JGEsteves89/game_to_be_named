export default class Puzzle {
	constructor(puzzleSpec) {
		this.mat = [];

		this.nr = puzzleSpec.nr;
		this.nc = puzzleSpec.nc;
		for (let i = 0; i < this.nr; i++) {
			const row = [];
			for (let j = 0; j < this.nc; j++) {
				row.push(puzzleSpec.target[i * this.nc + j]);
			}
			this.mat.push(row);
		}
		console.table(this.mat);
	}

	set(i, j, value) {
		this.mat[i][j] = value;
	}

	get(i, j) {
		return this.mat[i][j];
	}

	pitch(col, dis) {
		const copyMat = this.mat.map(r => [...r]);
		for (let i = 0; i < this.nr; i++) {
			const newI = this.resolveIndex(i, dis, this.nr);
			this.mat[newI][col] = copyMat[i][col];
		}
	}

	yawn(row, dis) {
		const copyMat = this.mat.map(r => [...r]);
		for (let j = 0; j < this.nc; j++) {
			const newJ = this.resolveIndex(j, dis, this.nc);
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
