import { Fruit, pickRandomFruitType, Ninja } from 'objects';
import { Vector3 } from 'three';
import { Scene, Color } from 'three';
import { BasicLights } from 'lights';
import { OrthographicCamera } from 'three';

// https://www.educative.io/answers/how-to-generate-a-random-number-between-a-range-in-javascript
// generates a random number between min and max
function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

const SPLAT_DISPLAY_TIME = 1;

class Game extends Scene {
    /**
     * Creates a pixel color.
     * @param {?number} lives - The number of lives (default 3).
     * @param {string[]} wordList - List of words for the game
     * @param {[number, number]} speedRange - (min, max) range of speeds for fruits
     * @param {number} stage - What stage this game is {0, 1, 2}
     * @param {OrthographicCamera} camera - The camera; used to know where to spawn fruits
     */
    constructor(lives, wordList, speedRange, stage, camera) {
        super();

        // should not have negative lives
        if (lives == null || lives <= 0) {
            lives = 3;
        }

        this.points = 0;
        this.lives = lives;
        this.stage = stage;
        this.fruits = [];

        // keep track of splatted fruits so we can still display them
        this.splattedFruits = [];
        this.startingLetter = {};
        this.words = wordList;
        this.currentFruit = null;

        this.camera = camera;

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const land = new Land();
        const lights = new BasicLights();
        const ninja = new Ninja(stage);

        this.ninja = ninja;

        this.add(lights, ninja);
    }

    addFruit() {
        // get random index and word with unique letter
        let idx;
        let word;
        let attempts = 10;

        do {
            idx = Math.floor(Math.random() * this.words.length);
            word = this.words[idx];
            attempts--;
        } while (attempts >= 0 && this.startingLetter[word.charAt(0)]);

        // update dict of starting letters
        this.startingLetter[word.charAt(0)] = true;

        // randomize fruit speed
        // reference: https://github.com/berkerol/typer/blob/master/typer.js

        // deciding which side the fruit will spawn from

        // placeholders for corner coordinates
        const minX = this.camera.left;
        const maxX = this.camera.right;
        const minY = this.camera.bottom;
        const maxY = this.camera.top;

        let x;
        let y;
        const side = Math.random();

        // left
        if (side < 0.35) {
            x = minX;
            y = generateRandom(minY, maxY);
        }
        // right
        else if (side < 0.7) {
            x = maxX;
            y = generateRandom(minY, maxY);
        } // bottom
        else if (side < 0.85) {
            x = generateRandom(minX, maxX);
            y = minY;
        } // top
        else {
            x = generateRandom(minX, maxX);
            y = maxY;
        }
        const position = new Vector3(x, y, 0);

        let newFruit = new Fruit(
            this.fruits.length,
            word,
            pickRandomFruitType(),
            position,
            5,
            performance.now() / 1000
        );
        this.fruits.push(newFruit);
        this.add(newFruit);

        console.log('New fruit:', newFruit.word, newFruit);
    }

    removeFruit(fruit) {
        const id = fruit.getId();

        // Reference: https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
        this.fruits.splice(id, 1);

        // re-index fruits
        for (let i = 0; i < this.fruits.length; i++) {
            this.fruits[i].setId(i);
        }

        this.startingLetter[fruit.word.charAt(0)] = false;
        fruit.splat(performance.now() / 1000);
        this.splattedFruits.push(fruit);
    }

    /**
     * Creates a pixel color.
     * @param {string} letter - The letter to consider
     */
    acceptLetter(letter) {
        letter = letter.toLowerCase();
        // no fruit right now
        if (!this.currentFruit) {
            if (this.fruits.length === 0) {
                // do nothing if there's no fruits
                return;
            }

            for (const fruit of this.fruits) {
                // arbitrarily pick first seen.
                // TODO: Prevent fruits from starting with the same letter
                if (fruit.word.charAt(0) == letter) {
                    this.currentFruit = fruit;
                    break;
                }
            }

            // if letter doesn't match anything, return
            if (!this.currentFruit) {
                return;
            }
        }
        let done = this.currentFruit.acceptLetter(letter);

        if (done) {
            this.ninja.changePosition(this.currentFruit.position.clone());
            console.log('Finished fruit', this.currentFruit);

            this.removeFruit(this.currentFruit); // created a new method for removing fruit
            this.currentFruit.addSlash(
                // add 1 to z position to superimpose on top of other sprite
                this.currentFruit.position.clone().set(2, 1)
            );

            this.currentFruit = null;

            // TODO: More dynamic point allocation
            this.points = this.points + 1;
        }
    }

    /**
     * updates objects in game.
     * @param {Fruit} fruit - The fruit in question
     * @param {number} time - The current time, in seconds
     */
    collisionWithNinja(fruit, time) {
        // TODO: calculate
        // random values for the bounding box
        return time - fruit.startingTime > fruit.secondsAlive;
    }

    /**
     * updates objects in game.
     * @param {number} time - The time elapsed in the game in seconds
     */
    update(time) {
        // Make ninja face current Fruit
        this.ninja.update(time);

        for (const fruit of this.fruits) {
            fruit.update(time);

            // handle collisions with ninja
            if (this.collisionWithNinja(fruit, time)) {
                if (this.currentFruit === fruit) {
                    this.currentFruit = null;
                }

                this.removeFruit(fruit);
                this.lives -= 1;
            }
        }

        let filteredSplattedFruits = [];
        for (const splatted of this.splattedFruits) {
            if (time - splatted.splatTime > SPLAT_DISPLAY_TIME) {
                this.remove(splatted);
            } else {
                filteredSplattedFruits.push(splatted);
            }
        }
        this.splattedFruits = filteredSplattedFruits;
    }
}

export default Game;
