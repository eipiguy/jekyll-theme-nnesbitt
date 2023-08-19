class CellGrid {
	constructor( container_width, container_height, cell_width, cell_height, x = 0, y = 0 ) {
		this.width = container_width
		this.height = container_height
		this.cell_width = cell_width
		this.cell_height = cell_height
		this.x = x
		this.y = y

		this.cols = Math.trunc( container_width / cell_width )
		this.rows = Math.trunc( container_height / cell_height )
		this.num_cells = this.rows * this.cols

		this.cell_coords = {}
		for( let i = 0; i < this.rows; ++i ) {
			for( let j = 0; j < this.cols; ++j ) {
				this.cell_coords[ [i,j] ] = {
					x: j * cell_width,
					y: i * cell_height
				};
			}
		}
	}

	row_col_to_id( row, col ) {
		return ( row * this.cols ) + col
	}

	id_to_row_col( id ) {
		let row = Math.trunc(id / this.cols)
		let col = id % this.cols
		return [ row, col ]
	}
	
	xy_to_row_col( x, y ) {
		let col = Math.trunc( x / this.cell_width )
		let row = Math.trunc( y / this.cell_height )
		return [ row, col ]
	}
}