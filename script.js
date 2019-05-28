/*
    > Game Of P5 <

    Author: Nilay Savant
    Description: A simple game developing in P5.js
*/

// GLOBAL Vars

let ball;



// SETUP -----------------------------------------<<<
function setup() {
    // put setup code here
    initCanvas()
    ball = new Ball(50, 15)
}


// DRAW ------------------------------------------<<<
function draw() {
    clear()
    initCanvas()
    // ball.display()
    ball.gravity()
    keyboardInput()
    touchInput()
    ball.show()
    // ball.log()

    textSize(15);
    fill(255);
    text('width: ' + windowWidth, 10, 30);
    text('height: ' + windowHeight, 100, 30);

}

/*
    A function reset canvas to init state
*/
function initCanvas() {
    createCanvas(windowWidth, windowHeight)
    background(0)
    stroke(255) // Set line drawing color to white
    frameRate(60) // 60 fps
}

/*
    A function to resize canvas if window is resized
*/
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}


// KeyPress function
function keyboardInput() {
    if (keyIsDown(87)) { // W prees: UP
        ball.ballUp()
    } else if (keyIsDown(83)) { // S press: DOWN
        ball.ballDown()
    } else if (keyIsDown(65)) { // A press: LEFT
        ball.ballLeft()
    } else if (keyIsDown(68)) { // D press: RIGHT
        ball.ballRight()
    }
    return false; // prevent default
}

/*
    function to move ball based on location of 
    touches with respect to the ball
*/
function touchInput() {
    if (touches.length > 0) {
        let touchX = touches[0].x
        let touchY = touches[0].y
        let ballX = ball.pos.x
        let ballY = ball.pos.y

        if (touchY < ballY) {
            ball.ballUp()
        } else if (keyIsDown(83)) {
            ball.ballDown()
        } else if (touchX < ballX) {
            ball.ballLeft()
        } else if (touchX > ballX) {
            ball.ballRight()
        }
    }
    return false; // prevent default
}