const nup_sketch = (sketch) => {
	let img_paths = []
	let images = []
	let grid

	sketch.preload = () => {
		img_paths = sketch.loadStrings('/docs/midjourney/midjourney/file_paths.txt');
	}

	sketch.setup = () => {
		const containerWidth = document.getElementById('nup-container').offsetWidth;
		const containerHeight = containerWidth / 2
		sketch.createCanvas(containerWidth, containerHeight);
		//noLoop();

		let cell_size = containerHeight;
		grid = new ClickImageGrid(sketch, img_paths, containerWidth, containerHeight, cell_size, cell_size);
	}

	sketch.draw = () => {
		sketch.background(0);
		grid.draw();
	}

// 	sketch.mousePressed = () => {
// 		grid.mousePressed();
// 	}
// 
// 	sketch.mouseDragged = () => {
// 		grid.mouseDragged();
// 	}
// 
	sketch.mouseReleased = () => {
		grid.click( sketch.mouseX, sketch.mouseY );
	}
// 
// 	sketch.touchStarted = (event) => {
// 		grid.touchStarted(event);
// 	}
// 
// 	sketch.touchMoved = (event) => {
// 		grid.touchMoved(event);
// 	}
// 
	sketch.touchEnded = (event) => {
		if( touches.length == 1 ) {
			grid.click( sketch.touches[0].x, sketch.touches[0].y );
		}
	}
}

let nup_p5 = new p5(nup_sketch, 'nup-container');