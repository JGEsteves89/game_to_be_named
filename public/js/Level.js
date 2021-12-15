import Puzzle from "./Puzzle.js";

export default class Level {
    constructor(levelSpec, sketcher, timer) {
        this.sketcher = sketcher;
        this.timer = timer;
        this.puzzle = new Puzzle(levelSpec);
        this.puzzle.pitch(1, 1);
        this.puzzle.yawn(1, 1);
    }

    update(deltaTime) {
        this.sketcher.drawPuzzle(this.puzzle);
    }

    start() {
        this.timer.startTimer(this.update.bind(this));
    }

    mouseDown(e) {
        const i = e.layerX / this.sketcher.sw | 0;
        const j = e.layerY / this.sketcher.sh | 0;
        console.log(i,j);
    }
    mouseUp(event) {
    }
    mouseMove(event) {
    }
}