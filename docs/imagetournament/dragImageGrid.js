const DEFAULT_CELL_SIZE = 150;
const DEFAULT_DRAGGABLE = true;

class DragImageGrid {
	isInSketch(x,y) {
		return (0 <= x && x < this.container_width) && (0 <= y && y < this.container_height);
	}

	rowColToIndex(row, col) {
		return ( row * this.cols ) + col;
	}

	xyToCellIndex(x, y) {
		const col = Math.trunc(x / this.cell_size);
		const row = Math.trunc(y / this.cell_size);
		return (row * this.cols) + col;
	}

	constructor(sketch, relative_paths, container_width, container_height = container_width, columns = 4, draggable = DEFAULT_DRAGGABLE) {
		this.sketch = sketch;

		this.num_imgs = relative_paths.length;
		this.cols = columns;
		this.img_rows = Math.ceil(this.num_imgs / this.cols);
		
		this.container_width = container_width;
		this.container_height = container_height;
		this.cell_size = container_width / columns;
		this.cell_rows = Math.ceil(container_height / this.cell_size);
		this.num_cells = this.cell_rows * this.cols;

		this.image_stacks = [];
		for (let i = 0; i < this.num_imgs; i++) {
			this.image_stacks.push([sketch.loadImage('/docs/midjourney/midjourney/' + relative_paths[i])]);
		}

		this.cell_coords = [];
		for (let i = 0; i < this.cell_rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				this.cell_coords[this.rowColToIndex(i,j)] = {
					x: j * this.cell_size,
					y: i * this.cell_size
				};
			}
		}

		this.cell_start_id = 0;
		this.min_stack_size = 1;
		this.max_stack_size = 1;
		this.draggable = draggable;
		this.active_touches = {};
	}

	checkButtonClicked(y) {
		let tb_edge = 0;
		if( y < this.cell_size ){
			tb_edge = -1;
		}
		else if( this.container_height < y + this.cell_size ) {
			tb_edge = 1;
		}
		return tb_edge;
	}

	startDrag(x, y, id) {
		if(!this.isInSketch(x,y)) {
			return;
		}
		const cell_change = this.checkButtonClicked(y);
		if( cell_change != 0 ) {
			this.cell_start_id += cell_change * this.cols;
			if( this.cell_start_id < 0 ){
				this.cell_start_id = 0;
			}else if( this.cell_start_id >= Math.max(0, this.num_imgs - this.num_cells)) {
				this.cell_start_id = Math.max(0, this.num_imgs - this.num_cells);
			}
			else {
				return;
			}
		}

		const cell_index = this.xyToCellIndex(x, y);
		const img_index = this.cell_start_id + cell_index;
		if( isNaN(cell_index) || img_index < 0 || img_index >= this.num_imgs ) {
			return;
		}

		if (this.image_stacks[img_index].length > 0) {
			this.active_touches[id] = {
				drag_stack_index: img_index,
				drag_image: this.image_stacks[img_index].pop(),
				drag_image_x: this.cell_coords[cell_index].x,
				drag_image_y: this.cell_coords[cell_index].y,
				mouse_offset_x: x - this.cell_coords[cell_index].x,
				mouse_offset_y: y - this.cell_coords[cell_index].y
			};
		}
	}

	moveDrag(x, y, id) {
		const activeTouch = this.active_touches[id];
		if (activeTouch) {
			activeTouch.drag_image_x = x - activeTouch.mouse_offset_x;
			activeTouch.drag_image_y = y - activeTouch.mouse_offset_y;
		}
	}

	endDrag(x, y, id) {
		const active_touch = this.active_touches[id];
		if (active_touch) {
			let cell_index = this.xyToCellIndex(x,y);
			let image_index = this.cell_start_id+cell_index;
			if(image_index < 0){
				image_index = 0;
			}
			if (this.num_imgs <= image_index) {
				image_index = this.num_imgs-1;
			}
			this.image_stacks[image_index].push(active_touch.drag_image);
			delete this.active_touches[id];
		}
	}

	mousePressed() {
		if (!this.draggable) {
			return;
		}
		this.startDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	mouseDragged() {
		if (!this.draggable) {
			return;
		}
		this.moveDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	mouseReleased() {
		if (!this.draggable) {
			return;
		}
		this.endDrag(this.sketch.mouseX, this.sketch.mouseY, 'mouse');
	}

	touchStarted(event) {
		if (!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.startDrag(touch.x, touch.y, touch.identifier);
		}
	}

	touchMoved(event) {
		if (!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.moveDrag(touch.x, touch.y, touch.identifier);
		}
	}

	touchEnded(event) {
		if (!this.draggable) {
			return;
		}
		for (let touch of event.touches) {
			this.endDrag(touch.x, touch.y, touch.identifier);
		}
	}

	draw() {
		let num_stack_imgs = 0;
		let img_id = -1;
		for (let i = 0; i < this.num_cells; i++) {
			img_id = i+this.cell_start_id;
			if( img_id < 0 || img_id >= this.num_imgs ){
				continue;
			}

			num_stack_imgs = this.image_stacks[img_id].length;
			if (num_stack_imgs < this.min_stack_size) {
				this.fillFromNext(img_id);
			} else if (num_stack_imgs > this.max_stack_size) {
				this.pushToNext(img_id);
			}

			this.drawCell(i, img_id);
		}
		for (const id in this.active_touches) {
			this.drawTouch(id);
		}
	}

	fillFromNext(i) {
		const next_id = this.nextFilledStack(i);
		if (next_id > 0) {
			this.image_stacks[i].push(this.image_stacks[next_id].pop());
		}
	}

	nextFilledStack(i) {
		for (let j = i + 1; j < this.image_stacks.length; j++) {
			if (this.image_stacks[j].length > 0) {
				return j;
			}
		}
		return -1;
	}

	pushToNext(i) {
		if (i + 1 < this.image_stacks.length) {
			this.image_stacks[i + 1].push(this.image_stacks[i].shift());
		}
	}

	drawCell(cell_index, image_index) {
		if (this.image_stacks[image_index].length > 0) {
			this.sketch.image(
				this.image_stacks[image_index][this.image_stacks[image_index].length - 1],
				this.cell_coords[cell_index].x,
				this.cell_coords[cell_index].y,
				this.cell_size,
				this.cell_size
			);
		}
	}

	drawTouch(id) {
		const touch = this.active_touches[id];
		this.sketch.image(
			touch.drag_image,
			touch.drag_image_x,
			touch.drag_image_y,
			this.cell_size,
			this.cell_size
		);
	}
}