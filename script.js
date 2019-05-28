/*
 *  > Game Of P5 <
 *
 *  Author: Nilay Savant
 *  Description: A simple game developing in P5.js
 * 
 */

// GLOBAL Vars

let ball, joystick
let OSD
let touchVect // touch vector



// SETUP -----------------------------------------<<<
function setup() {
    // put setup code here
    initCanvas()
    touchVect = createVector(0, 0)
    ball = new Ball(windowHeight / 11.86, windowHeight / 39.53)
    joystick = new Joystick(windowHeight / 5.5, windowWidth / 2, windowHeight / 1.125)
    OSD = new OnScreenDebugger(windowHeight / 2, windowWidth / 2, windowHeight / 60)
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
    OSD.show()
    onScreenDebug()
}

/*
 *  A function reset canvas to init state
 */
function initCanvas() {
    createCanvas(windowWidth, windowHeight)
    background(0)
    stroke(255) // Set line drawing color to white
    frameRate(60) // 60 fps
}


/*
 * function to display on screen debug params
 */
function onScreenDebug() {
    strokeWeight(0)
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
 *  function to move ball based on location of 
 *   touches with respect to the ball
 */
function touchInput() {
    if (touches.length > 0) { // if there are any touches
        touchVect.set(touches[0].x, touches[0].y)

        if (joystick.active) { // joystick has been touched(active)
            // get vector for the joystick gimble (by subtract touch and joy posn vectrs)
            let gimbleVect = p5.Vector.sub(touchVect, joystick.pos)

            drawArrow(joystick.pos, gimbleVect, 'red') // draw arrow to show

            if (gimbleVect.mag() > joystick.dia / 2) { // check touch drag beyond joy limits
                let v = gimbleVect.copy() // create a copy
                v.setMag(joystick.dia / 2.5) // red mag to max joy limit
                v = p5.Vector.add(joystick.pos, v) // add vec to get the max joy gimble vect
                joystick.gimble.set(v.x, v.y) // set gimble to this vect
            } else {
                // set gimble to touch if whithin limits
                joystick.gimble.set(touchVect.x, touchVect.y)
            }

            // set ball direction according to gimble pos

            let heading = degrees(gimbleVect.heading())
            OSD.set('heading', heading)
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