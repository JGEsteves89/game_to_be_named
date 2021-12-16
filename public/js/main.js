import { loadImage, loadLevel } from './loaders.js';
import Level from './Level.js';
import Sketcher from './Sketcher.js';
import Timer from './Timer.js';
import MouseInput from './MouseInput.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const timer = new Timer();

Promise.all([
	loadImage('/img/tiles.png'),
	loadLevel('1-1')
]).then(([image, levelSpec]) => {
	const sketcher = new Sketcher(context, image);
	const level = new Level(levelSpec, sketcher, timer);
	const mouseInput = new MouseInput(
		level.mouseDown.bind(level),
		level.mouseMove.bind(level),
		level.mouseUp.bind(level));
	level.start();
});