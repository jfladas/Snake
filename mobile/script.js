class Matrix {
    constructor(container, xSize, ySize) {
        const table = document.createElement('table');
        for (let y = 0; y < ySize; y++) {
            let tr = document.createElement('tr');
            for (let x = 0; x < xSize; x++) {
                let td = document.createElement('td');
                td.className = 'off';
                td.id = `${y}-${x}`;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }
        container.appendChild(table);
    }

    clear() {
        for (let ix = 0; ix < xMatrix; ix++) {
            for (let iy = 0; iy < yMatrix; iy++) {
                matrix.off(ix, iy);
            }
        }
    }

    on(x, y, color) {
        document.getElementById(`${y}-${x}`).className = 'on ' + color;
    }

    off(x, y) {
        document.getElementById(`${y}-${x}`).className = 'off';
    }

    fill(color) {
        for (let ix = 0; ix < xMatrix; ix++) {
            for (let iy = 0; iy < yMatrix; iy++) {
                matrix.on(ix, iy, color);
            }
        }
    }
}

xMatrix = 10, yMatrix = 10;
const matrix = new Matrix(document.body, xMatrix, yMatrix);

window.addEventListener("keydown", detectKey, false);
window.addEventListener('touchstart', handleTouchStart, false);
window.addEventListener('touchmove', handleTouchMove, false);
const TOP = 0, RIGHT = 1, DOWN = 2, LEFT = 3, matrixSize = xMatrix * yMatrix;
let direction,
    snakeX,
    snakeY,
    snakeLength,
    speedFactor,
    delayTime,
    fruitX,
    fruitY,
    gameOver,
    keysChecked,
    xDown,
    yDown;
startUp();

function loop() {
    if (gameOver) {
        reStart();
    } else {
        setTimeout(function () {
            nextStep();
            keysChecked = false;
            if (!gameOver) {
                drawMatrix();
            }
            loop();
        }, delayTime);
    }
}

function detectKey(e) {
    if (!keysChecked) {
        switch (e.keyCode) {
            case 37:
                if (direction != RIGHT) {
                    direction = LEFT;
                }
                break;
            case 39:
                if (direction != LEFT) {
                    direction = RIGHT;
                }
                break;
            case 38:
                if (direction != DOWN) {
                    direction = TOP;
                }
                break;
            case 40:
                if (direction != TOP) {
                    direction = DOWN;
                }
                break;
        }
        keysChecked = true;
    }
}

function reStart() {
    matrix.fill("yellow");
    startUp();
}

function nextStep() {
    for (let i = snakeLength; i >= 0; i--) {
        snakeX[i] = snakeX[i - 1];
        snakeY[i] = snakeY[i - 1];
    }
    switch (direction) {
        case TOP:
            snakeY[0] = snakeY[1] - 1;
            snakeX[0] = snakeX[1];
            break;
        case RIGHT:
            snakeX[0] = snakeX[1] + 1;
            snakeY[0] = snakeY[1];
            break;
        case DOWN:
            snakeY[0] = snakeY[1] + 1;
            snakeX[0] = snakeX[1];
            break;
        case LEFT:
            snakeX[0] = snakeX[1] - 1;
            snakeY[0] = snakeY[1];
            break;
    }
    if (snakeX[0] == fruitX && snakeY[0] == fruitY) {
        snakeLength++;
        if (snakeLength < matrixSize) {
            makeFruit();
            delayTime *= speedFactor;
        } else {
            fruitX = -1;
            fruitY = -1;
        }
    }
    else if (!onMatrix(snakeX[0], snakeY[0]) || onSnake(snakeX[0], snakeY[0])) {
        gameOver = true;
    }
}

function onMatrix(x, y) {
    if (x >= 0 && x < xMatrix && y >= 0 && y < yMatrix) {
        return true;
    } else {
        return false;
    }
}

function onSnake(x, y) {
    for (let i = 1; i < snakeLength; i++) {
        if (x == snakeX[i] && y == snakeY[i]) {
            return true;
        }
    }
    return false;
}

function drawMatrix() {
    matrix.clear();
    for (let i = 0; i < snakeLength; i++) {
        matrix.on(snakeX[i], snakeY[i], "green");
    }
    matrix.on(fruitX, fruitY, "red");
}

function makeFruit() {
    let x, y;
    do {
        x = Math.floor(Math.random() * xMatrix);
        y = Math.floor(Math.random() * yMatrix);
    } while (onSnake(x, y));
    fruitX = x;
    fruitY = y;
}

function startUp() {
    direction = DOWN,
        snakeX = [1],
        snakeY = [2],
        snakeLength = 1,
        speedFactor = 0.99,
        delayTime = 500,
        gameOver = false,
        waiting = false,
        xDown = null,
        yDown = null;
    for (let i = 1; i < matrixSize; i++) {
        snakeX[i] = -1;
        snakeY[i] = -1;
    }
    makeFruit();
    drawMatrix();
    matrix.fill("yellow");
    setTimeout(loop(), 4000);
}

function getTouches(evt) {
    return evt.touches ||
        evt.originalEvent.touches;
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {

    if (!xDown || !yDown) { return; }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {

        if (xDiff > 0) {
            if (direction != RIGHT) {
                direction = LEFT;
            }
        } else {
            if (direction != LEFT) {
                direction = RIGHT;
            }
        }
    } else {
        if (yDiff > 0) {
            if (direction != DOWN) {
                direction = TOP;
            }
        } else {
            if (direction != TOP) {
                direction = DOWN;
            }
        }
    }
    xDown = null; yDown = null;
}