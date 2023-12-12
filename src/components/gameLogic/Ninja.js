import { Vector3 } from 'three';

class Ninja extends Vector3 {
    // Enum of ninja positions
    // Reference: https://www.sohamkamani.com/javascript/enums/
    static NinjaLocation = Vector3(0, 0, 0);
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
     * @param {number} level - The current level
     */
    constructor(level) {
        this.ninjaPosition = NinjaPosition.FRONT;
        this.level = level;
    }

    // calculates angle based on given fruit position + changes position
    // fruitPosition is the fruit vector (can be changed)
    changePosition(fruitPosition) {
        const fruitPosition = fruitPosition.normalize();
        let angle = Math.atan2(fruitPosition.y / fruitPosition.x);
        angle = angle * (180 / Math.PI);
        if ((angle >= 0 && angle < 22.5) || (angle <= 0 && angle > -22.5)) {
            this.ninjaPosition = NinjaPosition.RIGHT;
        } else if (22.5 <= angle && angle < 67.5) {
            this.ninjaPositon = NinjaPosition.UP_RIGHT;
        } else if (67.5 <= angle && angle < 112.5) {
            this.ninjaPosition = NinjaPosition.UP;
        } else if (112.5 <= angle && angle < 157.5) {
            this.ninjaPosition = NinjaPosition.UP_LEFT;
        } else if (
            (157.5 <= angle && angle <= 180) ||
            (angle >= -180 && angle < -157.5)
        ) {
            this.ninjaPosition = NinjaPosition.LEFT;
        } else if (angle >= -157.5 && angle < -112.5) {
            this.ninjaPosition = NinjaPosition.DOWN_LEFT;
        } else if (angle >= -112.5 && angle < -67.5) {
            this.ninjaPosition = NinjaPosition.DOWN;
        } else if (angle >= -67.5 && angle < -22.5) {
            this.ninjaPosition = NinjaPosition.DOWN_RIGHT;
        }
    }
}

export default Ninja;
