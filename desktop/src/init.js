class Matrix {
    constructor(container, xSize, ySize) {
        let table = document.createElement('table')
        for (let y = 0; y < ySize; y++) {
            let tr = document.createElement('tr')
            for (let x = 0; x < xSize; x++) {
                let td = document.createElement('td')
                td.className = 'off'
                td.id = `${y}-${x}`
                tr.appendChild(td);
            }
            table.appendChild(tr);
            table.id = "table";
        }
        container.appendChild(table);
        container.id = "container";
    }

    clear() {
        for (let ix = 0; ix < xMatrix; ix++) {
            for (let iy = 0; iy < yMatrix; iy++) {
                matrix.off(ix, iy);
            }
        }
    }

    on(x, y, color) {
        document.getElementById(`${y}-${x}`).className = 'on ' + color
    }

    off(x, y) {
        document.getElementById(`${y}-${x}`).className = 'off'
    }

    fill(color) {
        for (let ix = 0; ix < xMatrix; ix++) {
            for (let iy = 0; iy < yMatrix; iy++) {
                matrix.on(ix, iy, color);
            }
        }
    }
}

window.addEventListener("keydown", detectKey, false);

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

const TOP = 0, RIGHT = 1, DOWN = 2, LEFT = 3;
let direction,
    snakeX,
    snakeY,
    snakeLength,
    speedFactor,
    delayTime,
    fruitX,
    fruitY,
    gameOver = true,
    score,
    highScore = 0,
    keysChecked,
    xDown,
    yDown,
    xMatrix,
    yMatrix,
    matrix,
    matrixSize,
    nan = false,
    newHigh = false;
document.getElementById("button").onclick = function () { startUp() };