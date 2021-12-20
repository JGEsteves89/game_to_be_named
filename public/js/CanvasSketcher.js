export default class CanvasSketcher {
	constructor(spriteSheet) {
		this.spriteSheet = spriteSheet;
	}

	drawSelected(tile, context) {
		context.globalAlpha = 0.1;
		context.fillRect(tile.left, tile.top, tile.width, tile.height);
		context.globalAlpha = 1;
	}

	drawTile(tile, context) {
		const buffer = this.spriteSheet.tiles.get(tile.value);
		context.drawImage(buffer, tile.left, tile.top);
		if (tile.selected) {
			this.drawSelected(tile, context);
		}
	}

	drawFrame(frame, context) {
		context.fillRect(frame.left, frame.top, frame.width, frame.height);
	}
}
