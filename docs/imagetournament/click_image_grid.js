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
		this.nup_sort()
	}

	reset_current_imgs( images, start_id = 0 ) {
		this.current_imgs = []
		for( let i = start_id; i < this.cell_grid.num_cells && i < images.length; ++i ) {
			this.current_imgs.push( images[i] )
		}
	}

	draw() {
		let row_col = []
		for( let i = 0; i < this.cell_grid.num_cells && i < this.images.length; ++i ) {
			row_col = this.cell_grid.id_to_row_col(i)
			this.drawCell( row_col[0], row_col[1] )
		}
	}

	drawCell( row, col ) {
		if ( this.cell_grid.row_col_to_id(row, col) < this.current_imgs.length && 0 <= row && 0 <= col && row < this.cell_grid.rows && col < this.cell_grid.cols ) {
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

	waitForInput() {
		return new Promise( (resolve) => {
			const handler = (event) => {
				let x, y;
				if( event.type === 'mouseup' ) {
					x = this.sketch.mouseX;
					y = this.sketch.mouseY;
				} else if( event.type === 'touchend' ) {
					x = this.sketch.touches[0].x
					y = this.sketch.touches[0].y
				}
				const row_col = this.cell_grid.xy_to_row_col( x, y )
				resolve(row_col);
			};
	
			document.addEventListener('mouseup', handler, { once: true })
			document.addEventListener('touchend', handler, { once: true })
		})
	}

	nup_sort() {
		this.naive_sort()
	}

	async naive_sort() {
		
		let sorted = false
		let next_imgs = []
		let click_row_col, row, col, click_id

		// look at the list in n-up bunches and promote selections
		for( let i = this.current_imgs.length; ; ) {
			
			// wait for n-up selection from current images
			click_row_col = await this.waitForInput()
			if( click_row_col.length < 2 ) {
				continue
			}
			row = click_row_col[0]
			col = click_row_col[1]
			if (
				isNaN(col) ||
				isNaN(row) ||
				col < 0 ||
				row < 0 ||
				col >= this.cols ||
				row >= this.rows) {
				continue
			}
			click_id = this.cell_grid.row_col_to_id(row, col)
			if( isNaN(click_id) || click_id < 0 || click_id >= this.current_imgs.length ) {
				continue
			}

			// add selection to next list stage, and remove from current imgs
			next_imgs.push( this.current_imgs[click_id] )
			this.current_imgs.splice( click_id, 1 )

			// if there are more images not in view,
			if( i < this.images.length ) {
				// add new image to current unselected image group
				this.current_imgs.push( this.images[i++] )
			} else if( this.current_imgs.length <= 1 ) {
				// if only one more images to select,
				// add the remaining image and restart
				next_imgs.push( this.current_imgs[0] )

				// clear to make another pass from the beginning
				this.images = next_imgs
				next_imgs = []

				this.current_imgs = []
				for( let j = 0; j < this.cell_grid.num_cells && j < this.images.length; ++j ) {
					this.current_imgs.push( this.images[j] )
				}
				i = this.current_imgs.length
			}
		}
	}
}