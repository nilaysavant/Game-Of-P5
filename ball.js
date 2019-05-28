function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(0, 0, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}

class Ball {
    constructor(dia, mass) {
        // Attributes of ball
        this.dia = dia // diamenter
        this.mass = mass // mass

        this.pos = createVector(50, 50) // pos vector
        this.rel_height = this.dia / 0.25 // the max value of height when released 
        this.bounce = 0
        this.speed = this.dia / 3.33 // move speed
        this.maxpos = createVector(100, 100)
        this.minpos = createVector(this.dia / 2, height - (this.dia / 2) * 6 - 5)
        this.velocity = createVector(0, 0)
        this.history = []
    }
    log() {
        console.table(this)
    }
    show() {
        stroke(255)
        fill(0)
        circle(this.pos.x, this.pos.y, this.dia)

        // draw ground line for ball
        stroke(100)
        line(0, this.minpos.y + this.dia / 2, width, this.minpos.y + this.dia / 2)

        this.history.push({
            x: this.pos.x,
            y: this.pos.y
        })
        for (let i of this.history) {
            noStroke()
            fill(206, 160, 101)
            circle(i.x, i.y, this.dia * 0.2)
            fill(0)
        }
        if (this.history.length > 15) {
            this.history.shift()
        }

        this.velocity.setMag(this.velocity.mag() - 1)

        this.velocity.limit(this.dia / 2.5)

        this.pos.x += this.velocity.x
        this.pos.y += this.velocity.y

        if (this.pos.x <= this.minpos.x) {
            this.pos.x = this.minpos.x
        }
        if (this.pos.y >= this.minpos.y) {
            this.pos.y = this.minpos.y
            let bounce = this.velocity.copy()
            bounce.mult(-2.5)
            bounce.x = 0
            this.velocity = p5.Vector.add(this.velocity, bounce)
        }
        drawArrow(this.pos, this.velocity, 'red')
    }
    gravity() {
        let grav = createVector(this.pos.x, this.minpos.y + this.dia / 2)
        this.gforce = p5.Vector.sub(grav, this.pos)
        drawArrow(this.pos, this.gforce, 'blue')

        let tempVec = this.gforce.copy()
        tempVec.setMag(1.5)
        this.velocity = p5.Vector.add(this.velocity, tempVec)

    }
    // movement functions
    ballUp() {
        this.velocity.y -= this.speed * (this.dia / 62.5)
        this.rel_height = height - this.pos.y
        let grav = createVector(this.pos.x, this.minpos.y + this.dia / 2)
        drawArrow(grav, this.gforce.mult(-1), 'yellow')
    }
    ballDown() {
        this.velocity.y += this.speed
    }
    ballLeft() {
        this.velocity.x -= this.speed
    }
    ballRight() {
        this.velocity.x += this.speed
    }
}