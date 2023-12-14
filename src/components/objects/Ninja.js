import { Group, Vector3, TextureLoader, SpriteMaterial, Sprite } from 'three';
import { NINJA_SPRITES, createSprite } from 'sprites';

const TIME_BEFORE_FRONT = 0.5;

export class Ninja extends Group {
    // Enum of ninja positions
    // Reference: https://www.sohamkamani.com/javascript/enums/

    // note default position is (0, 0, 0) so we don't need to use this
    // static POSITION = new Vector3(0, 0, 0);

    /**
     * Creates a Ninja object.
     * @param {number} level - The current level
     */
    constructor(level) {
        super();
        this.level = level;
        const ninjaSprites = NINJA_SPRITES[level];

        const textureLoader = new TextureLoader();
        const scale = new Vector3(25, 25, 1);
        this.front = createSprite(textureLoader, ninjaSprites.front, scale);
        this.down = createSprite(textureLoader, ninjaSprites.down, scale);
        this.right = createSprite(textureLoader, ninjaSprites.right, scale);
        this.left = createSprite(textureLoader, ninjaSprites.left, scale);
        this.up = createSprite(textureLoader, ninjaSprites.up, scale);
        this.upRight = createSprite(textureLoader, ninjaSprites.upRight, scale);
        this.upLeft = createSprite(textureLoader, ninjaSprites.upLeft, scale);
        this.downRight = createSprite(
            textureLoader,
            ninjaSprites.downRight,
            scale
        );
        this.downLeft = createSprite(
            textureLoader,
            ninjaSprites.downLeft,
            scale
        );

        this.currentSprite = this.front;
        this.add(this.currentSprite);

        this.lastPositionChange = performance.now();
    }

    // calculates angle based on given fruit position + changes position
    // fruitPosition is the fruit Vector3 (can be changed)
    changePosition(fruitPosition) {
        fruitPosition = fruitPosition.normalize();
        let angle = Math.atan2(fruitPosition.y, fruitPosition.x);
        angle = angle * (180 / Math.PI);
        let newSprite;
        if (-22.5 <= angle && angle < 22.5) {
            newSprite = this.right;
        } else if (22.5 <= angle && angle < 67.5) {
            newSprite = this.upRight;
        } else if (67.5 <= angle && angle < 112.5) {
            newSprite = this.up;
        } else if (112.5 <= angle && angle < 157.5) {
            newSprite = this.upLeft;
        } else if (
            (157.5 <= angle && angle <= 180) ||
            (angle >= -180 && angle < -157.5)
        ) {
            newSprite = this.left;
        } else if (angle >= -157.5 && angle < -112.5) {
            newSprite = this.downLeft;
        } else if (angle >= -112.5 && angle < -67.5) {
            newSprite = this.down;
        } else {
            newSprite = this.downRight;
        }

        this.remove(this.currentSprite);
        this.add(newSprite);
        this.currentSprite = newSprite;
        this.lastPositionChange = performance.now() / 1000;
    }

    update(time) {
        if (
            this.currentSprite != this.front &&
            time - this.lastPositionChange > TIME_BEFORE_FRONT
        ) {
            this.remove(this.currentSprite);
            this.currentSprite = this.front;
            this.add(this.front);
        }
    }
}
