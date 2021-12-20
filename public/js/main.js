import { loadImage, loadLevelImage } from './loaders.js';
import Level from './Level.js';
import PuzzleSketcher from './PuzzleSketcher.js';
import Puzzle from './Puzzle.js';
import Timer from './Timer.js';
import PuzzleController from './PuzzleController.js';

const canvas = document.getElementById('screen');
const context = canvas.getContext('2d');
const timer = new Timer();

Promise.all([
	loadImage('/levels/1x1.png'),
]).then(([levelImage]) => {
	const levelSpec = loadLevelImage(levelImage);
	const puzzle = new Puzzle(levelSpec);

	const sketcher = new PuzzleSketcher(
		context,
		puzzle,
		canvas.clientWidth,
		canvas.clientHeight
	);
	const controller = new PuzzleController(puzzle, sketcher);
	const level = new Level(controller, timer);

	canvas.onmousedown = controller.mouseDown.bind(controller, canvas);
	window.addEventListener('mousemove', controller.mouseMove.bind(controller, canvas));
	window.addEventListener('mouseup', controller.mouseUp.bind(controller, canvas));

	level.start();
});
