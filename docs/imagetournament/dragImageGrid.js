class DragImageGrid {
	constructor(sketch, relative_paths, containerWidth, containerHeight, cellWidth = 150, cellHeight = 150, draggable = true) {
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

		this.cols = Math.trunc( containerWidth / cellWidth );
		this.rows = Math.trunc( containerHeight / cellHeight );
		this.num_cells = this.rows * this.cols;

		this.dragCellIndex = -1;
		this.dragImage;
		this.dragImageX = 0;
		this.dragImageY = 0;
		this.mouseOffsetX = 0;
		this.mouseOffsetY = 0;

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

	nextFilledCell(i) {
		for(let j = i + 1; j < this.cell_stacks.length; j++) {
			if( this.cell_stacks[j].length > 0 ) {
				return j;
			}
		}
		return -1;
	}

	draw() {
		let next_id = -1;
		let num_stack_imgs = 0;
		for (let i = 0; i < this.cell_stacks.length; i++) {
			num_stack_imgs =  this.cell_stacks[i].length;

			// if less images than needed, fill from next cell
			if( num_stack_imgs < this.minStackSize ) {
				next_id = this.nextFilledCell(i);
				if( next_id > 0 ) {
					this.cell_stacks[i].push( this.cell_stacks[next_id].pop() );
				}
			}
			// if too many images, push to next
			else if( num_stack_imgs > this.maxStackSize ) {
				if( i+1 < this.cell_stacks.length ) {
					this.cell_stacks[i+1].push( this.cell_stacks[i].shift() )
				}
			}

			// if any left, draw top
			if(num_stack_imgs > 0) {
				this.sketch.image(
					this.cell_stacks[i][ this.cell_stacks[i].length - 1 ],
					this.cell_coords[i].x,
					this.cell_coords[i].y,
					this.cellWidth,
					this.cellHeight
				);
			}
		}

		if(this.dragCellIndex != -1) {
			this.sketch.image(
				this.dragImage,
				this.dragImageX,
				this.dragImageY,
				this.cellWidth,
				this.cellHeight
			);
		}
	}
  
	mousePressed() {
		if(this.draggable) {
			let cellIndex = this.getCellIndex(this.sketch.mouseX, this.sketch.mouseY);
			if(this.draggable && this.cell_stacks[cellIndex].length > 0) {
				this.dragCellIndex = cellIndex;
				this.dragImage = this.cell_stacks[cellIndex].pop();
				this.dragImageX = this.cell_coords[cellIndex].x;
				this.dragImageY = this.cell_coords[cellIndex].y;
				this.mouseOffsetX = this.sketch.mouseX - this.dragImageX;
				this.mouseOffsetY = this.sketch.mouseY - this.dragImageY;
			}
		}
	}

	mouseDragged() {
		if(this.draggable) {
			this.dragImageX = this.sketch.mouseX - this.mouseOffsetX;
			this.dragImageY = this.sketch.mouseY - this.mouseOffsetY;
		}
	}

	mouseReleased() {
		if(this.dragCellIndex != -1) {
			let cellIndex = this.getCellIndex(this.sketch.mouseX, this.sketch.mouseY);
			this.cell_stacks[cellIndex].push(this.dragImage);
			this.dragCellIndex = -1;
			this.dragImageX = 0;
			this.dragImageY = 0;
			this.mouseOffsetX = 0;
			this.mouseOffsetY = 0;
		}
	}
}
