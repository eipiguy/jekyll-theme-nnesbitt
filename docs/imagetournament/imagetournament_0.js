let images = [];
let relative_paths;

function preload() {
	relative_paths = loadStrings('/docs/midjourney/midjourney/file_paths.txt')
}

function setup() {
	const containerWidth = document.getElementById('container').offsetWidth;
	let canvas = createCanvas(containerWidth, 800);
	canvas.parent('container');
	//noLoop();

	for (let i = 0; i < relative_paths.length; i++) {
		images[i] = loadImage('/docs/midjourney/midjourney/' + relative_paths[i]);
	}
}

function draw() {
	background(220);
	for (let i = 0; i < images.length; i++) {
		image(images[i], i * 100, 0);
	}
}
