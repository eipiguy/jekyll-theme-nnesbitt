export class DraggableImageGrid {
	constructor(relative_paths, imageWidth, imageHeight) {
		this.images = [];
		this.imageWidth = imageWidth;
		this.imageHeight = imageHeight;
		this.draggingImageIndex = -1;
		this.offsetX = 0;
		this.offsetY = 0;

		for (let i = 0; i < relative_paths.length; i++) {
		this.images[i] = loadImage('/docs/midjourney/midjourney/' + relative_paths[i]);
		}
	}

	draw() {
		for (let i = 0; i < this.images.length; i++) {
		image(this.images[i], i * this.imageWidth, 0, this.imageWidth, this.imageHeight);
		}
	}

	mousePressed() {
		for (let i = 0; i < this.images.length; i++) {
		if (
			mouseX >= i * this.imageWidth &&
			mouseX <= i * this.imageWidth + this.imageWidth &&
			mouseY >= 0 &&
			mouseY <= this.imageHeight
		) {
			this.draggingImageIndex = i;
			this.offsetX = mouseX - i * this.imageWidth;
			this.offsetY = mouseY;
			break;
		}
		}
	}

	mouseDragged() {
		if (this.draggingImageIndex !== -1) {
		this.images[this.draggingImageIndex].position(mouseX - this.offsetX, mouseY - this.offsetY);
		}
	}

	mouseReleased() {
		this.draggingImageIndex = -1;
	}
}
