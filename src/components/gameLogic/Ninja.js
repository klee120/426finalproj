import { Group, Vector3 } from 'three';

class Ninja extends Group {
    // Enum of ninja positions
    // Reference: https://www.sohamkamani.com/javascript/enums/
    static NinjaLocation = Vector3(0, 0, 0);
    static NinjaPosition_level1 = {
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
    static NinjaPosition_level2 = {
        FRONT: Symbol('front', 'front-red.png'),
        DOWN: Symbol('down', 'down-red.png'),
        RIGHT: Symbol('right', 'right-red.png'),
        LEFT: Symbol('left', 'left-red.png'),
        UP: Symbol('up', 'up-red.png'),
        UP_RIGHT: Symbol('up_right', 'up_right_red.png'),
        UP_LEFT: Symbol('up_left', 'up_left_red.png'),
        DOWN_RIGHT: Symbol('down_right', 'down_right_red.png'),
        DOWN_LEFT: Symbol('down_left', 'down_right_red.png'),
    };
    static NinjaPosition_level3 = {
        FRONT: Symbol('front', 'front-black.png'),
        DOWN: Symbol('down', 'down-black.png'),
        RIGHT: Symbol('right', 'right-black.png'),
        LEFT: Symbol('left', 'left-black.png'),
        UP: Symbol('up', 'up-black.png'),
        UP_RIGHT: Symbol('up_right', 'up_right_black.png'),
        UP_LEFT: Symbol('up_left', 'up_left_black.png'),
        DOWN_RIGHT: Symbol('down_right', 'down_right_black.png'),
        DOWN_LEFT: Symbol('down_left', 'down_right_black.png'),
    };

    /**
     * Creates a Ninja object.
     * @param {number} level - The current level
     */
    constructor(level) {
        super();

        this.state = {
            ninjaPosition: NinjaPosition.FRONT,
            level: level,
        };
    }

    // calculates angle based on given fruit position + changes position
    // fruitPosition is the fruit vector (can be changed)
    changePosition(fruitPosition, level) {
        let NinjaPosition;
        if (level == 0) {
            NinjaPosition = NinjaPosition_level1;
        } else if (level == 1) {
            NinjaPosition = NinjaPosition_level2;
        } else if (level == 2) {
            NinjaPosition = NinjaPosition_level3;
        }
        const fruitPosition = fruitPosition.normalize();
        let angle = Math.atan2(fruitPosition.y / fruitPosition.x);
        angle = angle * (180 / Math.PI);
        if ((angle >= 0 && angle < 22.5) || (angle <= 0 && angle > -22.5)) {
            this.stateninjaPosition = NinjaPosition.RIGHT;
        } else if (22.5 <= angle && angle < 67.5) {
            this.stateninjaPositon = NinjaPosition.UP_RIGHT;
        } else if (67.5 <= angle && angle < 112.5) {
            this.stateninjaPosition = NinjaPosition.UP;
        } else if (112.5 <= angle && angle < 157.5) {
            this.stateninjaPosition = NinjaPosition.UP_LEFT;
        } else if (
            (157.5 <= angle && angle <= 180) ||
            (angle >= -180 && angle < -157.5)
        ) {
            this.stateninjaPosition = NinjaPosition.LEFT;
        } else if (angle >= -157.5 && angle < -112.5) {
            this.stateninjaPosition = NinjaPosition.DOWN_LEFT;
        } else if (angle >= -112.5 && angle < -67.5) {
            this.stateninjaPosition = NinjaPosition.DOWN;
        } else if (angle >= -67.5 && angle < -22.5) {
            this.stateninjaPosition = NinjaPosition.DOWN_RIGHT;
        }
    }
}

export default Ninja;
