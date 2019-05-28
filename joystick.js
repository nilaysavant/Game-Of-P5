class Joystick {
    constructor(x, y, dia) {
        this.pos = createVector(x, y) // pos vector
        this.dia = dia // diamenter
    }
    log() {
        console.table(this)
    }
    show() {
        stroke(255)
        fill(0)
        circle(this.pos.x, this.pos.y, this.dia)

        
    }
}