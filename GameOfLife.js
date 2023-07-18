class GameOfLife{
    constructor(){
        //define size for one cell
        this.cell_size = 5;
        //color for dead cells (default background)
        this.dead_color = '#181818';
        //color for live cells
        this.live_color = '#FF756B';
        //Math for counting rows needed
        this.cells_in_column = Math.floor(canvas.width / this.cell_size);
        //Columns needed
        this.cells_in_rows = Math.floor(canvas.height / this.cell_size);
        //Array that holds state of current life cycle
        this.active_array = [];
        //Array that holds stat of last life cycle
        this.inactive_array = [];


        this.arrayInitialization = () => {
             //Init 2 2d arrays
            for (let i = 0; i <this.cells_in_rows;i++){
                this.active_array[i] = [];
                for(let j = 0; j < this.cells_in_column; j++){
                    this.active_array[i][j] = 0;
                }
            }
            this.inactive_array = this.active_array;
        };

        this.arrayRandomize = () => {
            //Randomly fills avtive array with ones and zeros
            for (let i = 0; i < this.cells_in_rows; i++){
                for (let j = 0; j < this.cells_in_column; j++){
                    this.active_array[i][j] = (Math.random() > 0.5) ? 1 : 0;
                }
            }
        };

        this.fillArray = () => {
            //Filling array with color based on state
            for (let i = 0; i < this.cells_in_rows; i++){
                for (let j = 0; j < this.cells_in_column; j++){
                    let color;
                    if(this.active_array[i][j] == 1)
                        color = this.live_color;
                    else   
                        color = this.dead_color;
                    ctx.fillStyle = color;
                    ctx.fillRect(j * this.cell_size, i * this.cell_size, this.cell_size, this.cell_size);

                }
            }
        };

        this.setCellValueHelper = (row,col) => {
            try {
                return this.active_array[row][col];
            }
            catch{
                return 0;
            }
        };

        this.countNeighbors = (row,col) => {
           // count neighbors for one cell
           let total_neighbors = 0;

           //one row up and count neighbors
           total_neighbors += this.setCellValueHelper(row-1,col-1);
           total_neighbors += this.setCellValueHelper(row -1,col);
           total_neighbors += this.setCellValueHelper(row-1,col+1);

           //One row down
           total_neighbors += this.setCellValueHelper(row+1,col-1);
           total_neighbors+= this.setCellValueHelper(row+1,col);
           total_neighbors += this.setCellValueHelper(row+1,col+1);

           //On the same row
           total_neighbors += this.setCellValueHelper(row,col-1);
           total_neighbors += this.setCellValueHelper(row,col+1);

           return total_neighbors;
        };

        this.updateCellValue = (row,col) => {
            //update cell value based on sum of its neighbors (return 1 or 0)
            const total = this.countNeighbors(row,col);
            //cell with more than 4 or less than 3 neighbors die
            if (total > 4 || total < 3){
                return 0;
            }
            //dead cell with 3 neighbors become live
            else if (this.active_array[row][col] === 0 && total === 3){
                return 1;
            }
            //or return its status back
            else {
                return this.active_array[row][col];
            }
        };

        this.updateLifeCycle = () => {
            //setting new cel value to inactive array
            for (let i = 0; i < this.cells_in_rows; i++) {
                for (let j =0 ;j < this.cells_in_column;j++){
                    let new_state = this.updateCellValue(i,j);
                    this.inactive_array[i][j] = new_state;
                 }
        }
        this.active_array = this.inactive_array

    }

    this.gameSetUp = () => {
        this.arrayInitialization();
    };
    
    this.runGame = () =>{
        this.updateLifeCycle();
        this.fillArray();
    };


}
}