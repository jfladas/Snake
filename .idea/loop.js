function loop() {
    setTimeout(function () {
        nextStep();
        keysChecked = false;
        if(!gameOver){
            drawMatrix();
            loop();
        } else {
            newGame();
        }
    },delayTime);
}

function detectKey(e) {
    if(!keysChecked){
        switch (e.keyCode) {
            case 37:
                if(direction != RIGHT){
                    direction = LEFT;}
                break;
            case 39:
                if(direction != LEFT){
                    direction = RIGHT;}
                break;
            case 38:
                if(direction != DOWN){
                    direction = TOP;}
                break;
            case 40:
                if(direction != TOP){
                    direction = DOWN;}
                break;
        }
        keysChecked = true;
    }
}