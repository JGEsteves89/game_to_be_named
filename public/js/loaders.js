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
