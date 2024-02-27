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