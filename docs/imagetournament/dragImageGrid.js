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

	computeCoords( start_coords ) {
		let cell_coords = [];
		for (let i = 0; i < this.cell_rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				cell_coords[this.rowColToIndex(i,j)] = {
					x: start_coords[0] + (j * this.cell_size),
					y: start_coords[1] + (i * this.cell_size)
				};
			}
		}
		return cell_coords
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

	correctStackSize(stack_id) {
		let stack_size = this.image_stacks[stack_id].length
		if (stack_size < this.min_stack_size) {
			this.fillFromNext(stack_id);
		} else if (stack_size > this.max_stack_size) {
			this.pushToNext(stack_id);
		}
		return this.image_stacks[stack_id].length
	}

	copyTopLayer() {
		let stack_size = 0;
		let img_id = -1;
		let layer_copy = [];
		for( let i = 0; i < this.num_cells; ++i ) {
			img_id = this.cell_start_id + i;
			if( img_id < 0 ) {
				i = -1-this.cell_start_id;
				continue;
			} else if ( img_id >= this.num_imgs ) {
				break;
			}

			stack_size = this.correctStackSize(img_id);

			if( stack_size > 0 ) {
				layer_copy.push( this.image_stacks[img_id][stack_size - 1] )
			}
		}
		return layer_copy;
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

		this.cell_start_id = 0;
		this.cell_start_coords = [0,0];
		this.cell_coords = this.computeCoords( this.cell_start_coords );

		this.transition_steps = 8;
		this.is_animating = false;
		this.animation_progress = 0;
		this.animation_direction = 0; // -1 for up, 1 for down, 0 for no movement
		this.animation_step = this.cell_size / this.transition_steps;

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
			this.is_animating = true;
			this.animation_direction = cell_change;
			// Skip rest of touch functionality under button
			return;
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

		if (this.is_animating) {
			this.animation_progress += 1; // You can adjust this rate
			let dy = this.animation_direction * this.animation_step * this.animation_progress;
			this.drawLayer(this.cell_start_id, [this.cell_start_coords[0], dy]);
	
			if (Math.abs(dy) >= this.cell_size) {
				this.is_animating = false;
				this.animation_progress = 0;
				this.cell_start_id -= this.animation_direction * this.cols;

				if( this.cell_start_id < - this.cols ) {
					this.cell_start_id = -this.cols;
				} else if( this.cell_start_id + this.num_cells - this.cols > this.num_imgs ) {
					this.cell_start_id = this.num_imgs - this.num_cells + this.cols;
				}
			}
		} else {
			// Draw current top layer of image stacks
			this.drawLayer();
		}

		// Draw active dragged images
		for (const id in this.active_touches) {
			this.drawTouch(id);
		}
	}

	drawLayer( start_id = this.cell_start_id, start_coords = this.cell_start_coords) {
		let img_id = -1;
		for (let i = 0; i < this.num_cells; i++) {
			img_id = start_id + i;
			if( img_id < 0 ) {
				i = -1-start_id;
				continue;
			} else if ( img_id >= this.num_imgs ) {
				return;
			}

			this.correctStackSize(img_id);
			this.drawCell( i, img_id, start_coords[0], start_coords[1] );
		}
	}

	drawCell(cell_index, image_index, dx = 0, dy = 0) {
		if (this.image_stacks[image_index].length > 0) {
			this.sketch.image(
				this.image_stacks[image_index][this.image_stacks[image_index].length - 1],
				this.cell_coords[cell_index].x + dx,
				this.cell_coords[cell_index].y + dy,
				this.cell_size,
				this.cell_size
			);
		}
	}

	drawTouch(image_index) {
		const touch = this.active_touches[image_index];
		this.sketch.image(
			touch.drag_image,
			touch.drag_image_x,
			touch.drag_image_y,
			this.cell_size,
			this.cell_size
		);
	}
}