/* eslint-disable import/prefer-default-export */
import { loadLevelImage, loadImage } from './loaders.js';
import Level from './Level.js';
import PuzzleSketcher from './PuzzleSketcher.js';
import Puzzle from './Puzzle.js';
import Timer from './Timer.js';
import PuzzleController from './PuzzleController.js';

const levelName = window.location.href.split('?level=')[1];
const imgPath = `./levels/${levelName}.png`;
const timer = new Timer();
const canvas = document.getElementById('screen');
const minimap = document.getElementById('minimap');
minimap.src = imgPath;
const context = canvas.getContext('2d');

Promise.all([
	loadImage(imgPath),
]).then(([levelImage]) => {
	const levelSpec = loadLevelImage(levelImage);
	const puzzle = new Puzzle(levelSpec);
	canvas.setAttribute('width', canvas.clientWidth);
	canvas.setAttribute('height', canvas.clientHeight);
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
