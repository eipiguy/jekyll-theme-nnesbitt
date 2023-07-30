class DragImageGrid {
	constructor(relative_paths, imageWidth, imageHeight) {
	  this.images = [];
	  this.imageWidth = imageWidth;
	  this.imageHeight = imageHeight;
	  this.draggingImageIndex = -1;
	  this.offsetX = 0;
	  this.offsetY = 0;
  
	  for (let i = 0; i < relative_paths.length; i++) {
		this.images[i] = {
		  img: loadImage('/docs/midjourney/midjourney/' + relative_paths[i]),
		  x: i * imageWidth,
		  y: 0
		};
	  }
	}
  
	draw() {
	  for (let i = 0; i < this.images.length; i++) {
		image(this.images[i].img, this.images[i].x, this.images[i].y, this.imageWidth, this.imageHeight);
	  }
	}
  
	mousePressed() {
	  for (let i = 0; i < this.images.length; i++) {
		if (
		  mouseX >= this.images[i].x &&
		  mouseX <= this.images[i].x + this.imageWidth &&
		  mouseY >= this.images[i].y &&
		  mouseY <= this.images[i].y + this.imageHeight
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
	  this.draggingImageIndex = -1;
	}
  }
  