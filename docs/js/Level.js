export default class Level {
	constructor(controller, timer) {
		this.timer = timer;
		this.controller = controller;
	}

	update(deltaTime) {
		this.controller.update();
	}

	start() {
		this.timer.startTimer(this.update.bind(this));
	}
}
