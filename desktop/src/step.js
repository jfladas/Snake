function nextStep(){
    for (let i = snakeLength; i > 0; i--) {
        snakeX[i] = snakeX[i - 1];
        snakeY[i] = snakeY[i - 1];
    }
    switch (direction) {
        case TOP:
            snakeY[0] = snakeY[1] - 1;
            break;
        case RIGHT:
            snakeX[0] = snakeX[1] + 1;
            break;
        case DOWN:
            snakeY[0] = snakeY[1] + 1;
            break;
        case LEFT:
            snakeX[0] = snakeX[1] - 1;
            break;
    }
    if(snakeX[0] == fruitX && snakeY[0] == fruitY) {
        snakeLength++;
        score++;
        document.getElementById("score").innerHTML = score;
        if(score > highScore){
            document.getElementById("highscore").innerHTML = score;
            newHigh = true;
        }
        if(snakeLength < matrixSize) {
            makeFruit();
            delayTime *= speedFactor;
        } else {
            fruitX = -1;
            fruitY = -1;
            setTimeout(function () {
                matrix.fill("red");
                setTimeout(function () {
                    matrix.fill("green");
                }, 500);
            }, 1000);
        }
    }
    else if(!onMatrix(snakeX[0],snakeY[0])||onSnake(snakeX[0],snakeY[0])){
        gameOver = true;
    }
}

function newGame (){
    if (newHigh) {
        matrix.fill("red");
        newHigh = false;
    } else {
        matrix.fill("yellow");
    }
    document.getElementById("button").disabled = false;
    document.getElementById("button").onclick = function(){startUp()};
}