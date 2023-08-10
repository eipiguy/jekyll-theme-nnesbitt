const grid_sketch = (sketch) => {
  let relative_paths;
  let grid;

  sketch.preload = () => {
    relative_paths = sketch.loadStrings('/docs/midjourney/midjourney/file_paths.txt');
  }

  sketch.setup = () => {
    const containerWidth = document.getElementById('grid-container').offsetWidth;
    const containerHeight = containerWidth
    sketch.createCanvas(containerWidth, containerHeight);
    //noLoop();

    let num_cols = 5;
    let cell_size = containerWidth / num_cols;
    grid = new DragImageGrid(sketch, relative_paths, containerWidth, containerHeight, cell_size, cell_size);
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
}

let grid_p5 = new p5(grid_sketch, 'grid-container');