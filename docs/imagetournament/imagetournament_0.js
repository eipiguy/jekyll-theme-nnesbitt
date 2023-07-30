let grid;

function preload() {
  relative_paths = loadStrings('/docs/midjourney/midjourney/file_paths.txt');
}

function setup() {
  const containerWidth = document.getElementById('container').offsetWidth;
  let canvas = createCanvas(containerWidth, 800);
  canvas.parent('container');
  //noLoop();

  grid = new DragImageGrid(relative_paths, 100, 100);
}

function draw() {
  background(220);
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
