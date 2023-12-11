class Ninja {
    // Enum of ninja positions
    // Reference: https://www.sohamkamani.com/javascript/enums/
    static NinjaLocation = [0,0]
    static NinjaPosition = {
        FRONT: Symbol('front', 'front-white.png'),
        DOWN: Symbol('down', 'down-white.png'),
        RIGHT: Symbol('right', 'right-white.png'),
        LEFT: Symbol('left', 'left-white.png'),
        UP: Symbol('up', 'up-white.png'),
        UP_RIGHT: Symbol('up_right', 'up_right_white.png'),
        UP_LEFT: Symbol('up_left', 'up_left_white.png'),
        DOWN_RIGHT: Symbol('down_right', 'down_right_white.png'),
        DOWN_LEFT: Symbol('down_left', 'down_right_white.png'),
    };

    /**
     * Creates a Ninja object.
     * @param {number} id - An integer dynamic id
     * @param {string} word - The word
     * @param {Symbol} ninjaPosition - The fruit type
     * @param {number} level - The current level
     */
    constructor(ninjaPosition, level) {
        this.ninjaPosition = NinjaPosition.FRONT;
        this.level = level
    }

    // calculates angle based on given fruit position + changes position
    changePosition(fruitPosition) {
        // replace [5,0] with another point above the ninja's location
        let straightVector = [5 - NinjaLocation[0], 0 - NinjaLocation[1]]
        let straightMag = Math.SQRT2(Math.pow(straightVector[0], 2) + Math.pow(straightVector[1], 2))
        let fruitVector = [fruitPosition[0] - NinjaLocation[0], fruitPosition[1] - NinjaLocation[1]]
        let fruitMag = Math.SQRT2(Math.pow(fruitVector[0], 2) + Math.pow(fruitVector[1], 2))
        let dotProduct = straightVector[0] * fruitVector[0] + fruitVector[1] * fruitPosition[1]
        let angle = Math.acos(dotProduct/(straightMag * fruitMag))
        if (angle == 0) {
            this.ninjaPosition = NinjaPosition.UP
        } else if (0 < angle && angle < 90) {
            this.ninjaPositon = NinjaPosition.UP_RIGHT
        } else if (angle == 90) {
            this.ninjaPosition = NinjaPosition.RIGHT
        } else if (90 < angle && angle < 180) {
            this.ninjaPosition = NinjaPosition.DOWN_RIGHT
        } else if (angle == 180) {
            this.ninjaPosition = NinjaPosition.DOWN
        } else if (180 < angle && angle < 270) {
            this.ninjaPosition = NinjaPosition.DOWN_LEFT
        } else if (angle == 270) {
            this.ninjaPosition = NinjaPosition.LEFT
        } else if (270 < angle && angle < 360) {
            this.ninjaPosition = NinjaPosition.UP_LEFT
        }
    }
}

export default Ninja;
