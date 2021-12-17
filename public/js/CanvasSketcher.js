export default class CanvasSketcher {
	constructor(spriteSheet) {
		this.spriteSheet = spriteSheet;
	}

	drawSelected(context, i, j, sw, sh, dxy) {
		const x = j * sw + dxy.dx;
		const y = i * sh + dxy.dy;
		context.globalAlpha = 0.1;
		context.fillRect(x, y, sw, sh);
		context.globalAlpha = 1;
	}

	drawTile(name, context, i, j, sw, sh, dxy) {
		const x = j * sw + dxy.dx;
		const y = i * sh + dxy.dy;
		const buffer = this.spriteSheet.tiles.get(name);
		context.drawImage(buffer, x, y);
	}
}
