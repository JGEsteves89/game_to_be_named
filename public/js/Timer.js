export default class Timer {
	constructor() {
		this.fps = 0.0;
	}

	setFps(value) {
		this.fps = value;
	}

	startTimer(callbackFunction) {
		let now = new Date().getTime();
		let lastTime = now;
		const setFps = this.setFps.bind(this);
		function update(totalTime) {
			now = totalTime;
			const deltaTime = now - lastTime;
			lastTime = now;
			setFps(60 * 1000 / deltaTime);
			document.getElementById("debug").innerText = Math.floor((60 * 1000 / deltaTime)) + ' FPS';
			callbackFunction(deltaTime);
			requestAnimationFrame(update);
		}
		update(0);
	}
}
