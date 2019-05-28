class Joystick {
    constructor(dia, x, y) {
        this.dia = dia // joystick outer dia
        this.pos = createVector(x, y) // joystick structure pos vect
        this.gimble = createVector(x, y) // joystick gimble vect
        this.active = false // check if joystick is being touched
    }
    log() {
        console.table(this)
    }
    show() {
        // draw joystick
        stroke(255)
        fill(0) // fill color
        circle(this.pos.x, this.pos.y, this.dia) // outer circle
        circle(this.pos.x, this.pos.y, this.dia / 1.1) // inner ring circle

        stroke(200)
        fill(100)
        circle(this.gimble.x, this.gimble.y, this.dia / 3) // inner circle 

    }
    /**
     * function to activate joystick
     */
    activate() {
        this.active = true
    }
    /**
     * fuction to deactivate joystick
     */
    deactivate(){
        this.active = false
        this.gimble.set(this.pos.x, this.pos.y)
    }
    
}