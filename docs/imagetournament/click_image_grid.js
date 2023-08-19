class ClickImageGrid {
	constructor( sketch, img_paths, container_width, container_height, cell_width, cell_height ) {

		this.sketch = sketch
		this.images = []
		for ( let i = 0; i < img_paths.length; ++i ) {
			this.images.push( sketch.loadImage( '/docs/midjourney/midjourney/' + img_paths[i] ) )
		}

		this.cell_grid = new CellGrid( container_width, container_height, cell_width, cell_height )

		this.current_imgs = []
		for( let i = 0; i < this.cell_grid.num_cells && i < this.images.length; ++i ) {
			this.current_imgs.push( this.images[i] )
		}
	}

	draw() {
		let row_col = [0,0]
		for( let i = 0; i < this.cell_grid.num_cells && i < this.images.length; ++i ) {
			row_col = this.cell_grid.id_to_row_col(i)
			this.drawCell( row_col[0], row_col[1] )
		}
	}

	drawCell( row, col ) {
		if ( 0 <= row && 0 <= col && row < this.cell_grid.rows && col < this.cell_grid.cols ) {
			let cell = this.cell_grid.cell_coords[ [row,col] ]
			this.sketch.image(
				this.current_imgs[ this.cell_grid.row_col_to_id(row,col) ],
				cell.x,
				cell.y,
				this.cell_grid.cell_width,
				this.cell_grid.cell_height
			);
		}
	}

	click( x, y ) {
		let row_col = this.cell_grid.xy_to_row_col(x,y)
	}

	sort() {

	}
}