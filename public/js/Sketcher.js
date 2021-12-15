import { loadSprites } from "./loaders.js";

export default class Sketcher {
    constructor(context, image) {
        this.context = context;
        this.sw = 31;
        this.sh = 31;
        this.sprites = loadSprites(image, this.sw, this.sh);
    }
    drawPuzzle(puzzle) {
        for (let i = 0; i < puzzle.nr; i++) {
            for (let j = 0; j < puzzle.nc; j++) {
                this.sprites.drawTile(puzzle.get(i, j), this.context, i, j);
            }
        }
    }
}