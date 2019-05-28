/*
    > Game Of P5 <

    Author: Nilay Savant
    Description: A simple game developing in P5.js
*/

// GLOBAL Vars

let ball, joystick;
let touchVect; // touch vector



// SETUP -----------------------------------------<<<
function setup() {
    // put setup code here
    initCanvas()
    touchVect = createVector(0, 0)
    ball = new Ball(windowHeight / 11.86, windowHeight / 39.53)
    joystick = new Joystick(windowHeight / 5.5, windowWidth / 2, windowHeight / 1.125)
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
    joystick.show()
    // ball.log()
    onScreenDebug()
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
    function to display on screen debug params
*/
function onScreenDebug() {
    textSize(windowHeight / 60)
    fill(255)
    text('width: ' + windowWidth, windowHeight / 70, windowHeight / 35)
    text('height: ' + windowHeight, windowHeight / 9, windowHeight / 35)
    text('touch x: ' + int(touchVect.x), windowHeight / 3, windowHeight / 35)
    text('y: ' + int(touchVect.y), windowHeight / 2.2, windowHeight / 35)

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
        touchVect.set(touches[0].x, touches[0].y)
        // let ballX = ball.pos.x
        // let ballY = ball.pos.y

        if (joystick.active) {
            let gimbleVect = p5.Vector.sub(touchVect, joystick.pos)
            drawArrow(joystick.pos, gimbleVect, 'red')
        }

        // if (touchY < ballY) {
        //     ball.ballUp()
        // } else if (keyIsDown(83)) {
        //     ball.ballDown()
        // } else if (touchX < ballX) {
        //     ball.ballLeft()
        // } else if (touchX > ballX) {
        //     ball.ballRight()
        // }
    }
    return false; // prevent default
}

function touchStarted() {
    touchVect.set(touches[0].x, touches[0].y)

    if (p5.Vector.dist(touchVect, joystick.pos) < joystick.dia) {
        joystick.activate()
    }
}

function touchEnded() {
    joystick.deactivate()

}