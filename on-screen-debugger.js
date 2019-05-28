class OnScreenDebugger {
    constructor(x, y, text_size) {
        this.startx = x
        this.starty = y
        this.text_size = text_size
        this.debugArray = []
    }
    add(param, value) {
        this.debugArray.push([param, value])
    }
    set(param, value) {
        let index = this.debugArray.findIndex((element) => {
            return element[0] === param
        })
        if (index !== -1) {
            this.debugArray[index][1] = value
        } else {
            console.log("undefind param")
            this.add(param, value)
        }

    }
    show() {
        strokeWeight(0)
        textSize(this.text_size)
        fill(255)
        for (let i = 0; i < this.debugArray.length; i++) {
            text(this.debugArray[i][0] + ': ' + this.debugArray[i][1], this.startx, this.starty + i * 10)
        }
    }

}