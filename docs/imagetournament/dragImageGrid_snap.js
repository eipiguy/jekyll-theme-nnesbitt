class DragImageGrid {
	constructor(relative_paths, containerWidth, containerHeight, cellWidth = 100, cellHeight = 100) {
		this.images = [];
		this.containerWidth = containerWidth;
		this.containerHeight = containerHeight;
		this.cellWidth = cellWidth;
		this.cellHeight = cellHeight;
		this.rows = Math.trunc( containerWidth / cellWidth )

		this.draggingImageIndex = -1;
		this.offsetX = 0;
		this.offsetY = 0;

		let row = 0
		let col = 0
		for (let i = 0; i < relative_paths.length; i++) {
			let cur_img = loadImage('/docs/midjourney/midjourney/' + relative_paths[i])

			this.images[i] = {
				img: cur_img,
				x: row * cellWidth,
				y: col * cellHeight
			};

			row++
			if( row >= this.rows ) {
				col++
				row = 0
			}
		}
	}

	draw() {
		for (let i = 0; i < this.images.length; i++) {
			image(
				this.images[i].img,
				this.images[i].x,
				this.images[i].y,
				this.cellWidth,
				this.cellHeight
			);
		}
	}
  
	mousePressed() {
		for (let i = 0; i < this.images.length; i++) {
			if (
				mouseX >= this.images[i].x &&
				mouseX <= this.images[i].x + this.cellWidth &&
				mouseY >= this.images[i].y &&
				mouseY <= this.images[i].y + this.cellHeight
			) {
				this.draggingImageIndex = i;
				this.offsetX = mouseX - this.images[i].x;
				this.offsetY = mouseY - this.images[i].y;
				break;
			}
		}
	}

	mouseDragged() {
		if (this.draggingImageIndex !== -1) {
			this.images[this.draggingImageIndex].x = mouseX - this.offsetX;
			this.images[this.draggingImageIndex].y = mouseY - this.offsetY;
		}
	}

	mouseReleased() {
		this.images[this.draggingImageIndex].x = this.cellWidth * Math.trunc(this.images[this.draggingImageIndex].x / this.cellWidth);
		this.images[this.draggingImageIndex].y = this.cellHeight * Math.trunc(this.images[this.draggingImageIndex].y / this.cellHeight);
		this.draggingImageIndex = -1;
	}
}
