import Puzzle from "./Puzzle.js";

export default class Level {
    constructor(levelSpec, sketcher, timer) {
        this.sketcher = sketcher;
        this.timer = timer;
        this.puzzle = new Puzzle(levelSpec);
        this.isMouseDown = false;
    }

    update(deltaTime) {
        this.sketcher.drawPuzzle(this.puzzle);
    }

    start() {
        this.timer.startTimer(this.update.bind(this));
    }

    mouseDown(event) {
        this.isMouseDown = true;
        const j = event.layerX / this.sketcher.sw | 0;
        const i = event.layerY / this.sketcher.sh | 0;
        this.sketcher.select(i,j);
    }
    mouseUp(event) {
        this.isMouseDown = false;
        this.sketcher.deselect();
    }
    mouseMove(event) {

    }


}