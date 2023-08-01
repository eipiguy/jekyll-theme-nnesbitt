const containerHeight = 500
let grid;

function preload() {
  relative_paths = loadStrings('/docs/midjourney/midjourney/file_paths.txt');
}

function setup() {
  const containerWidth = document.getElementById('container').offsetWidth;
  let canvas = createCanvas(containerWidth, containerHeight);
  canvas.parent('container');
  //noLoop();

  grid = new DragImageGrid(relative_paths, containerWidth, containerHeight);
}

function draw() {
  background(0);
  grid.draw();
}

function mousePressed() {
  grid.mousePressed();
}

function mouseDragged() {
  grid.mouseDragged();
}

function mouseReleased() {
  grid.mouseReleased();
}
