import {
    BoxGeometry,
    Group,
    Mesh,
    MeshBasicMaterial,
    SpriteMaterial,
    Sprite,
    Texture,
    TextureLoader,
    Vector3,
} from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { PixelFont } from 'fonts';
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
        this.normalSprite = this.getSprite(
            textureLoader,
            fruitSprites.normalSprite
        );

        this.splatSprite = this.getSprite(
            textureLoader,
            fruitSprites.splatSprite
        );

        this.slashSprite = this.getSprite(textureLoader, Slash);

        this.add(this.normalSprite);
        console.log(this.normalSprite);
        this.text = this.drawText(word);
        console.log(this.text.position);
        this.add(this.text);
    }

    // https://threejs.org/docs/#manual/en/introduction/Creating-text

    drawText(message) {
        const fontLoader = new FontLoader();
        let font = fontLoader.parse(PixelFont);
        const geometry = new TextGeometry(message, {
            font: font,
            size: 12,
            height: 0,
        });

        const text = new Mesh(
            geometry,
            new MeshBasicMaterial({ color: 0x000000 })
        );
        const textPosition = new Vector3(0, 0, 0);
        text.position.copy(textPosition);

        return mesh;
    }

    drawBox() {
        const geometry = new BoxGeometry(1, 1, 1);
        const material = new MeshBasicMaterial({ color: 0xffff00 });
        const mesh = new Mesh(geometry, material);

        return mesh;
    }

    getSprite(textureLoader, asset) {
        const map = textureLoader.load(asset);
        const material = new SpriteMaterial({ map: map });
        const sprite = new Sprite(material);
        sprite.scale.set(25, 25, 1);
        return sprite;
    }

    getWord() {
        return this.word;
    }

    getPosition() {
        return this.position;
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
        // this.text && this.remove(this.text);
        this.add(this.splatSprite);
    }

    /**
     * Updates the location of the fruit based on the speed in the x and y direction
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
        this.text &&
            this.text.position.set(newPosition.add(new Vector3(0, 5, 0)));
    }
}
