const max_val = 2048;
const grid_size = 4;
var grid = [];

emptyGrid = ()=>{
    for(let i=0; i<grid_size; i++){
        grid.push(new Array(grid_size).fill(0));
    }
}

showGird = () =>{
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            
        }
    }
}

randomFill = ()=>{
    let zero_coordinate_array = [];
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            if(grid[i][j] == 0){
                zero_coordinate_array.push([i,j]);
            }    
        }
    }
    let randomCell = zero_coordinate_array[Math.floor(Math.random()*zero_coordinate_array.length)];
    let randomVaue = Math.random() > 0.5 ? 4 : 2;
    grid[randomCell[0]][randomCell[1]] = randomVaue;
    console.log(grid);
}

emptyGrid();
randomFill();