import {
    BoxGeometry,
    Group,
    Mesh,
    MeshBasicMaterial,
    ShapeGeometry,
    SpriteMaterial,
    Sprite,
    Texture,
    TextureLoader,
    Vector3,
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { CourierFont } from 'fonts';
import { Slash } from 'sprites';

export class Fruit extends Group {
    /**
     * Creates a pixel color.
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
        this.normalSprite = this.createSprite(
            textureLoader,
            fruitSprites.normalSprite
        );

        this.splatSprite = this.createSprite(
            textureLoader,
            fruitSprites.splatSprite
        );

        this.slashSprite = this.createSprite(textureLoader, Slash);
        this.add(this.normalSprite);

        this.text = this.getTextSprite(word);
        this.add(this.text);
    }

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
        for (let i = 0; i < shapes.length; i++) {
            if (i < numShapesCompleted) {
                const mat = new MeshBasicMaterial({ color: 0x808080 });
                materials.push(mat);
            } else {
                const mat = new MeshBasicMaterial({ color: 0xffffff });
                materials.push(mat);
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

    createSprite(textureLoader, asset) {
        const map = textureLoader.load(asset);
        const material = new SpriteMaterial({ map: map });
        const sprite = new Sprite(material);
        sprite.scale.set(25, 25, 1);
        return sprite;
    }

    getId() {
        return this.fruitId;
    }

    setId(newId) {
        this.fruitId = newId;
    }

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
        // TODO:
        //  else { // incorrect letter
        //     // vibrate fruit
        // }

        if (this.currentWordIndex >= this.word.length) {
            return true;
        }

        return false;
    }

    addSlash(position) {
        this.slashSprite.position.copy(position);
        this.add(this.slashSprite);
    }

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
