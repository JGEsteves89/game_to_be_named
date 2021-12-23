export default class Level {
	constructor(controller, timer) {
		this.timer = timer;
		this.controller = controller;
		this.stopped = false;
	}

	update(deltaTime) {
		this.controller.update();
		if (this.controller.puzzle.hasFinish) {
			this.controller.sketcher.runCompleteAnimation(this.stop.bind(this));
		}
	}

	start() {
		this.timer.startTimer(this.update.bind(this));
	}

	stop() {
		if (!this.stopped) {
			this.stopped = true;
			console.log('change location was called');
			const splites = window.location.href.split('/');
			window.location.href = window.location.href.replace(splites[splites.length - 1], 'index.html');
			this.timer.stop();
		}
	}
}
