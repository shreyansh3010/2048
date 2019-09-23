/*
    Declear the constan values
    Play up to 4096 instead of 2048 by 
    changing the grid_size to 8 and max_val to 4096
*/
const max_val = 2048;
const grid_size = 4;
var grid = [];

//Filling the global grid with zero's
emptyGrid = ()=>{
    for(let i=0; i<grid_size; i++){
        grid.push(new Array(grid_size).fill(0));
    }
}

//Selecting the position to be filled by 2 or 4
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

//Initializing the game
startGame = ()=>{
    console.log('Starting new game.....');
    console.log(`Controls for the game\n-> 'control(1)' for LEFT\n-> 'control(2)' for RIGHT\n-> 'control(3)' for UP\n-> 'control(4)' for DOWN`);
    grid = [];
    emptyGrid();
    randomFill();
    randomFill();
    console.table(grid);
}

//Do action based on user input
control = (x)=>{
    let pre_grid = gridImage();
        switch(x){
            case 1:
                LeftOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 2:
                rightOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 3:
                upOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            case 4:
                downOperation();
                checkFinish(pre_grid,grid);
                console.table(grid);
                break;
            default : 
                console.log(`Enter alphabet 'l', 'r', 'd', 'u' only`);
                break;
        }
}

//check the terminating conditions
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

//shifting operation in UP direction
upOperation = ()=>{
    grid = rotateAntiClockWise();
    LeftOperation();
    grid = rotateClockWise();
}

//shifting operation in DOWN direction
downOperation = ()=>{
    grid = rotateClockWise();
    LeftOperation();
    grid = rotateAntiClockWise();
}

//shifting operation in LEFT direction
LeftOperation = ()=>{
    for(let i=0; i<grid_size; i++){
        let shiftedRow = shiftRowLeft(grid[i]);
        grid[i] = rowAddition(shiftedRow);
    }
}

//shifting operation in RIGHT direction
rightOperation = ()=>{
    grid = horizontal_image();
    LeftOperation();
    grid = horizontal_image();
}

//Returning the copy of the grid
gridImage = ()=>{
    let gridImg = [];
    for(let i=0; i<grid_size; i++){
        gridImg.push(grid[i]);
    }
    return gridImg;
}

//Compare the grid before and after operation
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

//Create a side by side image
horizontal_image = ()=>{
    let flipGrid = [];
    for(let i=0; i<grid_size; i++){
        flipGrid.push(grid[i].reverse());
    }
    return flipGrid;
}

//Rotate the entire global grid clockWise 90 degree
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

//Rotate the entire global grid anitclockWise 90 degree
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

//Push all the values in a row towards left
shiftRowLeft = (row)=>{
    let non_Zero_arry = row.filter((item)=>{
        if(item > 0){
            return true;
        }
    });
    non_Zero_arry = non_Zero_arry.concat(new Array(grid_size-non_Zero_arry.length).fill(0));
    return non_Zero_arry;
}

//Add the adjacent vales if equal
rowAddition = (row)=>{
    for(let i=0; i<grid_size-1; i++){
        if(row[i] == row[i+1]){
            row[i] = row[i] + row[i+1];
            row[i+1] = 0;
        }
    }
    return shiftRowLeft(row);
}

//Check the win condition
checkWin = ()=>{
    for(let i=0; i<grid_size; i++){
        for(let j=0; j<grid_size; j++){
            if(grid[i][j] == max_val)
                return true;
        }
    }
    return false;
}

//Check the game over condition
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

//Starting the game
startGame();
