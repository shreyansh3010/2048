const max_val = 2048;
const grid_size = 4;
var grid = [];

emptyGrid = ()=>{
    for(let i=0; i<grid_size; i++){
        grid.push(new Array(grid_size).fill(0));
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
    if(randomCell.length > 0){
        grid[randomCell[0]][randomCell[1]] = randomVaue;
    }
}

startGame = ()=>{
    console.log('Starting new game.....');
    grid = [];
    emptyGrid();
    randomFill();
    randomFill();
    console.table(grid);
}

control = (x)=>{
    let pre_grid = gridImage();
        switch(x){
            case 'l':
                LeftOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 'r':
                rightOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 'd':
                downOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 'u':
                upOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            default : 
                console.log(`Enter alphabet 'l', 'r', 'd', 'u' only`);
                break;
        }
}

checkFinish = (pre_grid,next_grid)=>{
    if(changeOccur(pre_grid,next_grid)){
        randomFill();
    }
    if(checkWin()){
        console.log('YOU WIN :)');
    }
    if(checkGameOver()){
        console.log('GAME OVER !');
    }
}

upOperation = ()=>{
    grid = rotateAntiClockWise();
    LeftOperation();
    grid = rotateClockWise();
}

downOperation = ()=>{
    grid = rotateClockWise();
    LeftOperation();
    grid = rotateAntiClockWise();
}

LeftOperation = ()=>{
    for(let i=0; i<grid_size; i++){
        let shiftedRow = shiftRowLeft(grid[i]);
        grid[i] = rowAddition(shiftedRow);
    }
}

rightOperation = ()=>{
    grid = horizontal_image();
    LeftOperation();
    grid = horizontal_image();
}

gridImage = ()=>{
    let gridImg = [];
    for(let i=0; i<grid_size; i++){
        gridImg.push(grid[i]);
    }
    return gridImg;
}

changeOccur = (pre_grid,next_grid)=>{
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            if(pre_grid[i][j] != next_grid[i][j]){
                return true;
            }
        }
    }
    return false;
}

horizontal_image = ()=>{
    let flipGrid = [];
    for(let i=0; i<grid_size; i++){
        flipGrid.push(grid[i].reverse());
    }
    return flipGrid;
}

rotateClockWise = ()=>{
    let rotatedGrid = [];
    for(let i=0; i<grid_size; i++){
        let newRow = [];
        for(let j=0; j<grid_size; j++){
            newRow.push(grid[j][i]);
        }
        rotatedGrid.push(newRow.reverse());
    }
    return rotatedGrid;
}

rotateAntiClockWise = ()=>{
    let rotatedGrid = [];
    for(let i=grid_size-1; i>=0; i--){
        let newRow = [];
        for(let j=0; j<grid_size; j++){
            newRow.push(grid[j][i]);
        }
        rotatedGrid.push(newRow);
    }
    return rotatedGrid;
}

shiftRowLeft = (row)=>{
    let non_Zero_arry = row.filter((item)=>{
        if(item > 0){
            return true;
        }
    });
    non_Zero_arry = non_Zero_arry.concat(new Array(grid_size-non_Zero_arry.length).fill(0));
    return non_Zero_arry;
}

rowAddition = (row)=>{
    for(let i=0; i<grid_size-1; i++){
        if(row[i] == row[i+1]){
            row[i] = row[i] + row[i+1];
            row[i+1] = 0;
        }
    }
    return shiftRowLeft(row);
}



checkWin = ()=>{
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            if(grid[i][j] == max_val)
                return true;
        }
    }
    return false;
}

checkGameOver = ()=>{
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            if(grid[i][j] == 0){
                return false;
            }
            if(i<grid_size-1){
                if(grid[i][j] == grid[i+1][j])
                    return false;
            }
            if(j<grid_size-1){
                if(grid[i][j] == grid[i][j+1])
                    return false;
            }
        }
    }
    return true;
}

startGame();
