import SpriteSheet from './SpriteSheet.js';

export function loadImage(url) {
	return new Promise(resolve => {
		const image = new Image();
		image.addEventListener('load', () => {
			resolve(image);
		});
		image.src = url;
	});
}

export function loadLevelImage(image) {
	const cols = image.width;
	const rows = image.height;
	const target = [];

	const canvas = document.createElement('canvas');
	canvas.width = image.width;
	canvas.height = image.height;

	const context = canvas.getContext('2d');
	context.drawImage(image, 0, 0);
	const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

	for (let i = 0; i < cols * rows; i++) {
		const index = i * 4;
		const r = imageData.data[index];
		const g = imageData.data[index + 1];
		const b = imageData.data[index + 2];
		const a = imageData.data[index + 3];
		target.push({
			r, g, b, a
		});
	}
	return { rows, cols, target };
}

export function loadLevel(name) {
	return fetch(`/levels/${name}.json`)
		.then(r => r.json());
}

export function loadSprites(image, sw, sh) {
	const tileWidth = 31;
	const tileHeight = 31;
	const sprites = new SpriteSheet(image, sw, sh);
	for (let i = 0; i < 8; i++) {
		sprites.define(i, 4, 4 + i * 33, tileWidth, tileHeight);
	}
	return sprites;
}
