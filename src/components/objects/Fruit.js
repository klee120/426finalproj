import { Group, TextureLoader, SpriteMaterial, Sprite } from 'three';

export class Fruit extends Group {
    /**
     * Creates a pixel color.
     * @param {number} id - An integer dynamic id
     * @param {string} word - The word
     * @param {FruitType} fruitType - The fruit type
     * @param {Vector3} location - The starting location
     * @param {number} speedX - the speed of the fruit in the x direction
     * @param {number} speedY - the speed of the fruit in the y direction
     */
    constructor(id, word, fruitType, location, speedX, speedY) {
        super();

        this.state = {
            id: id,
            // reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase
            word: word.toLowerCase(),
            fruitType: fruitType,
            location: location, // need to randomize in a circle around the ninja
            currentWordIndex: 0,
            speedX: speedX,
            speedY: speedY,
        };

        const map = new TextureLoader().load(fruitType.sprite);
        const material = new SpriteMaterial({
            map: map,
        });

        const sprite = new Sprite(material);
        sprite.scale.set(3, 3, 1);
        this.add(sprite);
    }

    getWord() {
        return this.state.word;
    }

    getLocation() {
        return this.state.location;
    }

    getId() {
        return this.state.id;
    }

    setId(id) {
        this.state.id = id;
    }

    acceptLetter(letter) {
        // catch erroneous case where fruit is interacted with despite being done
        if (this.state.currentWordIndex >= this.state.word.length) {
            // Exceptions reference: https://www.w3schools.com/js/js_errors.asp
            throw 'Fruit is already done!';
        }
        // correct letter
        if (this.state.word.charAt(this.state.currentWordIndex) === letter) {
            this.state.currentWordIndex = this.state.currentWordIndex + 1;
        }
        //  else { // incorrect letter
        //     // vibrate fruit
        // }

        if (this.state.currentWordIndex >= this.state.word.length) {
            return true;
        }

        return false;
    }

    /**
     * Updates the location of the fruit based on the speed in the x and y direction
     * @param {number} time - A number representing the time elapsed in the game
     */
    update(time) {
        // update location
        this.state.location[0] += this.state.speedX * time;
        this.state.location[1] += this.state.speedY * time;

        // true if hasn't collided with ninja yet
        // return !(this.location[0] === 0 && this.location[1] === 0);

        // false if the fruit collides with the bounding box of the ninja
    }
}
