import { CanvasSketcher } from "./CanvasSketcher.js";
import { loadSprites } from "./loaders.js";

export default class Sketcher {
    constructor(context, image) {
        this.context = context;
        this.sw = 31 * 2;
        this.sh = 31 * 2;
        this.sprites = loadSprites(image, this.sw, this.sh);
        this.canvas = new CanvasSketcher(this.sprites);
    }
    drawPuzzle(puzzle) {
        for (let i = 0; i < puzzle.nr; i++) {
            for (let j = 0; j < puzzle.nc; j++) {
                this.canvas.drawTile(puzzle.get(i, j), this.context, i, j, this.sw, this.sh);
                if (this.selected && this.selected.i === i && this.selected.j === j) {
                    this.canvas.drawSelected(this.context, i, j, this.sw, this.sh);
                }
            }
        }
    }

    select(i, j) {
        this.selected = { i, j };
        console.log('Selected', i, j);
    }
    deselect() {
        this.selected = undefined;
    }
}