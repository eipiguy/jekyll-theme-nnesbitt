const DEFAULT_CELL_SIZE = 150;
const DEFAULT_DRAGGABLE = true;

class DragImageGrid {
	constructor(sketch, relative_paths, containerWidth, containerHeight = containerWidth, cellWidth = DEFAULT_CELL_SIZE, cellHeight = DEFAULT_CELL_SIZE, draggable = DEFAULT_DRAGGABLE) {
		this.sketch = sketch
		this.containerWidth = containerWidth;
		this.containerHeight = containerHeight;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;

		this.cell_stacks = [];
		this.cell_coords = [];
		this.minStackSize = 1;
		this.maxStackSize = 1;
		this.draggable = draggable;
		this.activeTouches = {};

		this.cols = Math.trunc( containerWidth / cellWidth );
		this.rows = Math.trunc( containerHeight / cellHeight );
		this.num_cells = this.rows * this.cols;

		for(let i = 0; i < this.rows; i++) {
			for(let j=0; j< this.cols; j++) {
				let cur_id = (i * this.cols) + j;
				this.cell_stacks[cur_id] = [];
				this.cell_coords[cur_id] = {
					x: j * cellWidth,
					y: i * cellHeight
				};
			}
		}

		for (let i = 0; i < relative_paths.length && i < this.num_cells; i++) {
			let cur_img = sketch.loadImage('/docs/midjourney/midjourney/' + relative_paths[i]);
			this.cell_stacks[i].push(cur_img);
		}
	}

	getCellIndex(x, y) {
		let col = Math.trunc( x / this.cellWidth );
		let row = Math.trunc( y / this.cellHeight );
		return ( row * this.cols ) + col;
	}

	startDrag(x, y, id) {
		let cellIndex = this.getCellIndex(x, y);
		if (cellIndex < this.num_cells && this.cell_stacks[cellIndex].length > 0) {
			this.activeTouches[id] = {
				dragCellIndex: cellIndex,
				dragImage: this.cell_stacks[cellIndex].pop(),
				dragImageX: this.cell_coords[cellIndex].x,
				dragImageY: this.cell_coords[cellIndex].y,
				mouseOffsetX: x - this.cell_coords[cellIndex].x,
				mouseOffsetY: y - this.cell_coords[cellIndex].y
			};
		}
	}

	moveDrag(x, y, id) {
		const activeTouch = this.activeTouches[id];
		if (activeTouch) {
			activeTouch.dragImageX = x - activeTouch.mouseOffsetX;
			activeTouch.dragImageY = y - activeTouch.mouseOffsetY;
		}
	}

	endDrag(x, y, id) {
		const activeTouch = this.activeTouches[id];
		if (activeTouch) {
			let cellIndex = this.getCellIndex(x, y);
			if(cellIndex < this.num_cells) {
				this.cell_stacks[cellIndex].push(activeTouch.dragImage);
				delete this.activeTouches[id];
			}
		}
	}

	mousePressed() {
		if(!this.draggable) {
			return;
		}
		this.startDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	mouseDragged() {
		if(!this.draggable) {
			return;
		}
		this.moveDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	mouseReleased() {
		if(!this.draggable) {
			return;
		}
		this.endDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	touchStarted(event) {
		if(!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.startDrag(touch.x, touch.y, touch.identifier);
		}
	}

	touchMoved(event) {
		if(!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.moveDrag(touch.x, touch.y, touch.identifier);
		}
	}

	touchEnded(event) {
		if(!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.endDrag(touch.x, touch.y, touch.identifier);
		}
	}

	draw() {
		let num_stack_imgs = 0;
		for (let i = 0; i < this.cell_stacks.length; i++) {
			num_stack_imgs =  this.cell_stacks[i].length;

			// if less images than needed, fill from next cell
			if( num_stack_imgs < this.minStackSize ) {
				this.fillFromNext(i);
			}
			// if too many images, push to next
			else if( num_stack_imgs > this.maxStackSize ) {
				this.pushToNext(i);
			}
			// draw the top image of the current cell
			this.drawCell(i);
		}
		// draw all active touches
		for (const id in this.activeTouches) {
			this.drawTouch(id);
		}
	}

	fillFromNext(i) {
		const next_id = this.nextFilledCell(i);
		if( next_id > 0 ) {
			this.cell_stacks[i].push( this.cell_stacks[next_id].pop() );
		}
	}

	nextFilledCell(i) {
		for(let j = i + 1; j < this.cell_stacks.length; j++) {
			if( this.cell_stacks[j].length > 0 ) {
				return j;
			}
		}
		return -1;
	}

	pushToNext(i) {
		if( i+1 < this.cell_stacks.length ) {
			this.cell_stacks[i+1].push( this.cell_stacks[i].shift() )
		}
	}

	drawCell(i) {
		// if any images exist, draw the top one
		if(this.cell_stacks[i].length > 0) {
			this.sketch.image(
				this.cell_stacks[i][ this.cell_stacks[i].length - 1 ],
				this.cell_coords[i].x,
				this.cell_coords[i].y,
				this.cellWidth,
				this.cellHeight
			);
		}
	}

	drawTouch(id) {
		const touch = this.activeTouches[id];
		this.sketch.image(
			touch.dragImage,
			touch.dragImageX,
			touch.dragImageY,
			this.cellWidth,
			this.cellHeight
		);
	}
}
