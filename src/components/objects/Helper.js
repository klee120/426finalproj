import { Vector3, TextureLoader } from 'three';
import { Fruit } from 'objects';
import { FruitSprites, HELPER_NINJA_SPRITES, createSprite } from '../sprites';

function getSplatSprite(position) {
    position = position.clone().normalize();

    let textureLoader = new TextureLoader();
    const scale = new Vector3(25, 25, 1);
    // negative because we want to face the center
    let angle = Math.atan2(-position.y, -position.x);
    angle = angle * (180 / Math.PI);
    if (-22.5 <= angle && angle < 22.5) {
        return HELPER_NINJA_SPRITES.right;
    } else if (22.5 <= angle && angle < 67.5) {
        return HELPER_NINJA_SPRITES.upRight;
    } else if (67.5 <= angle && angle < 112.5) {
        return HELPER_NINJA_SPRITES.up;
    } else if (112.5 <= angle && angle < 157.5) {
        return HELPER_NINJA_SPRITES.upLeft;
    } else if (
        (157.5 <= angle && angle <= 180) ||
        (angle >= -180 && angle < -157.5)
    ) {
        return HELPER_NINJA_SPRITES.left;
    } else if (angle >= -157.5 && angle < -112.5) {
        return HELPER_NINJA_SPRITES.downLeft;
    } else if (angle >= -112.5 && angle < -67.5) {
        return HELPER_NINJA_SPRITES.down;
    } else {
        return HELPER_NINJA_SPRITES.downRight;
    }
}

export class Helper extends Fruit {
    /**
     * Creates a helper ninja
     * @param {number} fruitId - An integer dynamic id
     * @param {string} word - The word
     * @param {Vector3} position - The starting position
     * @param {number} secondsAlive - the number of seconds to keep this fruit alive
     * @param {startingTime} startingTime - The second this fruit was created
     */
    constructor(fruitId, word, position, secondsAlive, startingTime) {
        const sprites = new FruitSprites(
            'helper',
            HELPER_NINJA_SPRITES.front,
            getSplatSprite(position)
        );

        super(fruitId, word, sprites, position, secondsAlive, startingTime);

        this.isHelper = true;
    }
}
