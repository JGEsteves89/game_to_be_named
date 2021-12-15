export default class MouseInput {
    constructor(mouseDown, mouseMove, mouseUp) {
        window.addEventListener("mousedown", mouseDown);
        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseup", mouseUp);
    }
}
