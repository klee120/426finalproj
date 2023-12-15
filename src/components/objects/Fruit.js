import {
    Group,
    Mesh,
    MeshBasicMaterial,
    ShapeGeometry,
    TextureLoader,
    Vector3,
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { CourierFont } from 'fonts';
import { Slash, createSprite } from 'sprites';

import {
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
} from 'sprites';

// Enum of fruit types
// Reference: https://www.sohamkamani.com/javascript/enums/

const FRUIT_TYPES = [
    APPLE_SPRITES,
    STRAW_SPRITES,
    LEMON_SPRITES,
    ORANGE_SPRITES,
    LIME_SPRITES,
    GRAPE_SPRITES,
    WATERMELON_SPRITES,
];

export function pickRandomFruitSprites() {
    let idx = Math.floor(Math.random() * FRUIT_TYPES.length);
    return FRUIT_TYPES[idx];
}

export class Fruit extends Group {
    /**
     * Creates a Fruit object.
     * @param {number} fruitId - An integer dynamic id
     * @param {string} word - The word
     * @param {FruitSprites} FruitSprites - The sprites for the fruit
     * @param {Vector3} position - The starting position
     * @param {number} secondsAlive - the number of seconds to keep this fruit alive
     * @param {startingTime} startingTime - The second this fruit was created
     */
    constructor(
        fruitId,
        word,
        fruitSprites,
        position,
        secondsAlive,
        startingTime
    ) {
        super();

        // note that the `Group` object unfortunately already has a property id
        this.fruitId = fruitId;
        this.word = word.toLowerCase();
        this.fruitSprites = fruitSprites;
        this.startingPosition = position.clone();
        this.position.copy(position);
        this.currentWordIndex = 0;
        this.secondsAlive = secondsAlive;

        // calculates speed based on when this fruit should hit (0, 0, 0)
        this.speed = position.clone().negate().divideScalar(secondsAlive);
        this.startingTime = startingTime;

        const textureLoader = new TextureLoader();
        const scale = new Vector3(25, 25, 1);
        this.normalSprite = createSprite(
            textureLoader,
            fruitSprites.normalSprite,
            scale
        );

        this.splatSprite = createSprite(
            textureLoader,
            fruitSprites.splatSprite,
            scale
        );

        this.slashSprite = createSprite(textureLoader, Slash, scale);

        this.add(this.normalSprite);

        this.text = this.getTextSprite(word);
        this.add(this.text);
    }

    /**
     * Generates text
     * @param {string} message - the message to be displayed
     */
    // Reference: https://threejs.org/docs/#manual/en/introduction/Creating-text
    // Reference: https://threejs.org/examples/#webgl_geometry_text_stroke
    getTextSprite(message) {
        const fontLoader = new FontLoader();
        let font = fontLoader.parse(CourierFont);

        let numShapesCompleted = font.generateShapes(
            message.slice(0, this.currentWordIndex)
        ).length;

        const shapes = font.generateShapes(message, 6);
        const materials = [];
        const completed = new MeshBasicMaterial({ color: 0x808080 });
        const normal = new MeshBasicMaterial({ color: 0xffffff });
        for (let i = 0; i < shapes.length; i++) {
            if (i < numShapesCompleted) {
                materials.push(completed);
            } else {
                materials.push(normal);
            }
        }

        const geometry = new ShapeGeometry(shapes);
        geometry.computeBoundingBox();

        // bounding box is (0, 0, 0), (x_max, y_max, z_max)
        const xOffset = geometry.boundingBox.max.x / 2;
        const yOffset = geometry.boundingBox.max.y / 2;

        const text = new Mesh(geometry, materials);

        // slightly above fruit in y direction
        // above in z direction to make sure it's always visible
        const textPosition = new Vector3(-xOffset, 5 - yOffset, 1);
        text.position.copy(textPosition);

        return text;
    }

    /**
     * Returns the id of the fruit.
     */
    getId() {
        return this.fruitId;
    }

    /**
     * Sets the id of the fruit.
     * @param {number} newId - the new id of the fruit
     */
    setId(newId) {
        this.fruitId = newId;
    }

    /**
     * Accepts a letter from the user, checking for correctness and indicating fruit completion.
     * @param {string} letter - The letter to consider
     */
    acceptLetter(letter) {
        // catch erroneous case where fruit is interacted with despite being done
        if (this.currentWordIndex >= this.word.length) {
            // Exceptions reference: https://www.w3schools.com/js/js_errors.asp
            throw 'Fruit is already done!';
        }
        // correct letter
        if (this.word.charAt(this.currentWordIndex) === letter) {
            this.currentWordIndex = this.currentWordIndex + 1;
        }

        if (this.currentWordIndex >= this.word.length) {
            return true;
        }

        return false;
    }

    /**
     * Adds a slash to the fruit completed
     * @param {Vector3} position - the position of the fruit
     */
    addSlash(position) {
        this.slashSprite.position.copy(position);
        this.add(this.slashSprite);
    }

    /**
     * Adds a splat 
     * @param {number} time - the time at which to splat
     */
    splat(time) {
        this.splatTime = time;

        this.remove(this.normalSprite);
        this.text && this.remove(this.text);
        this.add(this.splatSprite);
    }

    /**
     * Updates the text sprite to match the current word index
     */
    updateText() {
        this.remove(this.text);
        this.text = this.getTextSprite(this.word);
        this.add(this.text);
    }

    /**
     * Updates the location of the fruit based on the speed in the x and y direction.
     * NOTE: Should only be called when fruit is still active (not splatted)
     * @param {number} time - A number representing the time elapsed in the game
     */
    update(currentTime) {
        // update location
        let newPosition = this.startingPosition.clone();
        newPosition.addScaledVector(
            this.speed,
            currentTime - this.startingTime
        );
        this.position.copy(newPosition);
        this.updateText();
    }
}
