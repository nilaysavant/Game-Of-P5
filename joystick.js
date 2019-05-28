class Joystick {
    constructor(dia, x, y) {
        this.dia = dia // joystick outer dia
        this.pos = createVector(x, y) // joystick pos
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
        circle(this.pos.x, this.pos.y, this.dia / 3) // inner circle 

    }
}