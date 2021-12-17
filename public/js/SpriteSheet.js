export default class SpriteSheet {
	constructor(image, tileWidth, tileHeight) {
		this.image = image;
		this.tileWidth = tileWidth;
		this.tileHeight = tileHeight;
		this.tiles = new Map();
	}

	define(name, x, y, spriteWidth, spriteHeight) {
		const buffer = document.createElement('canvas');
		buffer.height = this.tileHeight;
		buffer.width = this.tileWidth;
		buffer
			.getContext('2d')
			.drawImage(
				this.image,
				x,
				y,
				spriteWidth,
				spriteHeight,
				0,
				0,
				this.tileWidth,
				this.tileHeight
			);
		this.tiles.set(name, buffer);
	}
}
