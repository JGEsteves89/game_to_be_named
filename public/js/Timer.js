export default class Timer {
	constructor() {
		this.fps = 0.0;
		this.toStop = false;
	}

	setFps(value) {
		this.fps = value;
	}

	startTimer(callbackFunction) {
		let now = new Date().getTime();
		let lastTime = now;
		const setFps = this.setFps.bind(this);
		const { toStop } = this;
		function update(totalTime) {
			if (toStop) {
				return;
			}
			now = totalTime;
			const deltaTime = now - lastTime;
			lastTime = now;
			setFps(60 * 1000 / deltaTime);
			document.getElementById('debug').innerText = `Version C024 - ${Math.floor((60 * 1000 / deltaTime))} FPS`;
			callbackFunction(deltaTime);
			requestAnimationFrame(update);
		}
		update(0);
	}

	stop() {
		this.toStop = true;
	}
}
