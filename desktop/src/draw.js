function drawMatrix() {
    matrix.clear();
    //drawSnake
    for (let i = 0; i < snakeLength; i++) {
        matrix.on(snakeX[i], snakeY[i], "green");
    }
    //drawFruit
    try {
        matrix.on(fruitX, fruitY, "red");
    } catch {
        gameOver = true;
    }
}

function makeFruit() {
    let x, y;
    do {
        x = Math.floor(Math.random() * xMatrix);
        y = Math.floor(Math.random() * yMatrix);
    } while (onSnake(x, y) || (snakeX[0] == x && snakeY[0] == y));
    fruitX = x;
    fruitY = y;
}

function onMatrix(x,y) {
    if(x >= 0 && x < xMatrix && y >= 0 && y < yMatrix){
        return true;
    } else {
        return false;
    }
}

function onSnake(x,y) {
    for (let i = 1; i < snakeLength; i++) {
        if(x == snakeX[i] && y == snakeY[i]) {
            return true;
        }
    }
    return false;
}