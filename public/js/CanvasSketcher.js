export default class CanvasSketcher {
	drawRoundRect(x, y, w, h, r, context) {
		let nr = r;
		if (w < 2 * nr) nr = w / 2;
		if (h < 2 * nr) nr = h / 2;
		context.beginPath();
		context.moveTo(x + nr, y);
		context.arcTo(x + w, y, x + w, y + h, nr);
		context.arcTo(x + w, y + h, x, y + h, nr);
		context.arcTo(x, y + h, x, y, nr);
		context.arcTo(x, y, x + w, y, nr);
		context.closePath();
		context.fill();
	}

	drawSelected(tile, context) {
		context.fillStyle = 'black';
		context.globalAlpha = 0.1;
		context.fillRect(tile.left, tile.top, tile.width, tile.height);
		context.globalAlpha = 1;
	}

	drawTile(tile, context) {
		const tileMargin = 0.04 * tile.width;
		const radius = 0.04 * tile.width;
		context.fillStyle = 'black';
		context.fillRect(tile.left, tile.top, tile.width, tile.height);

		context.fillStyle = `rgb(${tile.value.r}, ${tile.value.g}, ${tile.value.b})`;
		this.drawRoundRect(
			tile.left + tileMargin,
			tile.top + tileMargin,
			tile.width - 2 * tileMargin,
			tile.height - 2 * tileMargin,
			radius,
			context
		);
		if (tile.selected) {
			this.drawSelected(tile, context);
		}
	}

	drawFrame(frame, context) {
		context.fillStyle = 'white';
		context.fillRect(frame.left, frame.top, frame.width, frame.height);
	}
}
