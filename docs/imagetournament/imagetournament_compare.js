function makeRasters( num_rows, num_cols ) {
	let cur_id = 0;
	let row_col_to_id = [];
	let id_to_row_col = [];

	for( let i = 0; i < num_rows; ++i ) {

		row_col_to_id.push([])
		for( let j = 0; j < num_cols; ++j) {

			row_col_to_id[i].push( cur_id++ );
			id_to_row_col.push(
				{
					row: i,
					col: j
				}
			);

		}
	}

	return [ row_col_to_id, id_to_row_col ]
}

const nup_sketch = (sketch) => {
	let relative_paths;
	let grid;

	sketch.preload = () => {
		relative_paths = sketch.loadStrings('/docs/midjourney/midjourney/file_paths.txt');
	}

	sketch.setup = () => {
		const containerWidth = document.getElementById('grid-container').offsetWidth;
		const containerHeight = containerWidth / 2
		sketch.createCanvas(containerWidth, containerHeight);
		//noLoop();

		let cell_size = containerHeight;
		grid = new DragImageGrid(sketch, relative_paths, containerWidth, containerHeight, cell_size, cell_size, false);
	}

	sketch.draw = () => {
		sketch.background(0);
		grid.draw();
	}

	sketch.mousePressed = () => {
		grid.mousePressed();
	}

	sketch.mouseDragged = () => {
		grid.mouseDragged();
	}

	sketch.mouseReleased = () => {
		grid.mouseReleased();
	}

	sketch.touchStarted = (event) => {
		grid.touchStarted(event);
	}

	sketch.touchMoved = (event) => {
		grid.touchMoved(event);
	}

	sketch.touchEnded = (event) => {
		grid.touchEnded(event);
	}
}

let nup_p5 = new p5(nup_sketch, 'nup-container');