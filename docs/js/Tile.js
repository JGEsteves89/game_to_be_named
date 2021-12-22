import Drawable from './Drawable.js';

export default class Tile extends Drawable {
	constructor(i, j, value) {
		super(0, 0, 0, 0);
		this.i = i;
		this.j = j;
		this.value = value;
		this.selected = false;
	}
}
