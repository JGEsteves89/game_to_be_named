import Puzzle from "./Puzzle.js";

export default class Level {
    constructor(levelSpec, drawer, timer) {
        this.drawer = drawer;
        this.timer = timer;
        this.puzzle = new Puzzle(levelSpec);
        this.puzzle.pitch(1, 1);
        this.puzzle.yawn(1, 1);
    }

    update(deltaTime) {
        this.drawer.drawPuzzle(this.puzzle);
    }

    start() {
        this.timer.startTimer(this.update.bind(this));
    }

    mouseDown(e) {
        const i = ~~(e.y / this.drawer.sw);
        const j = ~~(e.x / this.drawer.sh);
        console.log(i, j);

    }
    mouseUp(event) {
    }
    mouseMove(event) {
    }
}