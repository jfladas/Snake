function startUp(){
    if(gameOver) {
        if(score > highScore) {
            highScore = score;
        }
        try {
            document.getElementById("container").removeChild(document.getElementById("table"));
        } catch {}
        checkInput("matrixx", 2, parseInt(window.innerWidth / 20));
        xMatrix = parseInt(document.getElementById("matrixx").value);
        checkInput("matrixy", 2, parseInt(window.innerHeight / 20) - 13);
        yMatrix = parseInt(document.getElementById("matrixy").value);
        matrix = new Matrix(document.getElementById("container"), xMatrix, yMatrix),
            matrixSize = xMatrix * yMatrix,
            direction = DOWN,
            snakeX = [0],
            snakeY = [0],
            snakeLength = 1;
        checkInput("speedfactor", 0, 99);
        speedFactor = 1 - parseInt(document.getElementById("speedfactor").value) / 100;
        checkInput("startspeed", 1, 20);
        delayTime = 1 / parseInt(document.getElementById("startspeed").value) * 1000;
        if(!nan) {
            gameOver = false,
                score = 0,
                xDown = null,
                yDown = null;
            document.getElementById("score").innerHTML = 0;
            document.getElementById("highscore").innerHTML = highScore;
            document.getElementById("button").disabled = true;
            for (let i = 1; i < matrixSize; i++) {
                snakeX[i] = -1;
                snakeY[i] = -1;
            }
            matrix.fill("yellow");
            makeFruit();
            drawMatrix();
            setTimeout(loop(), 4000);
        } else {
            nan = false;
        }
    }
}

function checkInput(id, min, max){
    if(isNaN(document.getElementById(id).value)){
        alert("Bitte Zahl eingeben");
        nan = true;
    } else if(document.getElementById(id).value < min){
        document.getElementById(id).value = min;
    } else if(document.getElementById(id).value > max) {
        document.getElementById(id).value = max;
    }
}