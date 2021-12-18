export default class CanvasSketcher {
	constructor(spriteSheet) {
		this.spriteSheet = spriteSheet;
	}

	drawSelected(tile, context) {
		context.globalAlpha = 0.1;
		context.fillRect(tile.x + tile.dx, tile.y + tile.dy, tile.width, tile.height);
		context.globalAlpha = 1;
	}

	drawTile(tile, context) {
		const buffer = this.spriteSheet.tiles.get(tile.value);
		context.drawImage(buffer, tile.x + tile.dx, tile.y + tile.dy);
	}
}
