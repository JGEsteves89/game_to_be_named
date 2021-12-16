export default class CanvasSketcher {
	constructor(spriteSheet) {
		this.spriteSheet = spriteSheet;
	}

	drawSelected(context, i, j, sw, sh) {
		const x = j * sw;
		const y = i * sh;
		context.globalAlpha = 0.1;
		context.fillRect(x, y, sw, sh);

		console.log('Drawing in ', x, y);
	}

	drawTile(name, context, i, j, sw, sh) {
		const buffer = this.spriteSheet.tiles.get(name);
		const x = j * sw;
		const y = i * sh;
		context.drawImage(buffer, x, y);
	}
}
