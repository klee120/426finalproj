import { Land, Fruit, FRUIT_TYPES, pickRandomFruitType } from 'objects';
import { Vector3 } from 'three';
import { Scene, Color } from 'three';
import { BasicLights } from 'lights';

// https://www.educative.io/answers/how-to-generate-a-random-number-between-a-range-in-javascript
// generates a random number between min and max
function generateRandom(min, max) {
    return Math.random() * (max - min) + min;
}

class Game extends Scene {
    /**
     * Creates a pixel color.
     * @param {?number} lives - The number of lives (default 3).
     * @param {string[]} wordList - List of words for the game
     * @param {[number, number]} speedRange - (min, max) range of speeds for fruits
     * @param {number} stage - What stage this game is {0, 1, 2}
     */
    constructor(lives, wordList, speedRange, stage) {
        super();

        // should not have negative lives
        if (lives == null || lives <= 0) {
            lives = 3;
        }

        this.state = {
            points: 0,
            lives: lives,
            stage: stage,
            fruits: [],
            startingLetter: {},
            words: wordList,
            currentFruit: null,
            speedRange: speedRange,
            updateList: [],
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);

        // Add meshes to scene
        // const land = new Land();
        const lights = new BasicLights();

        this.add(lights);
    }

    addFruit() {
        // get random index and word with unique letter
        let idx;
        let word;
        let attempts = 10;

        do {
            idx = Math.floor(Math.random() * this.state.words.length);
            word = this.state.words[idx];
            attempts--;
        } while (attempts >= 0 && this.state.startingLetter[word.charAt(0)]);

        // update dict of starting letters
        this.state.startingLetter[word.charAt(0)] = true;

        // randomize fruit speed
        // reference: https://github.com/berkerol/typer/blob/master/typer.js
        const speed = generateRandom(
            this.state.speedRange[0],
            this.state.speedRange[1]
        );

        // deciding which side the fruit will spawn from

        // placeholders for corner coordinates
        const minX = -100;
        const maxX = 100;
        const minY = -100;
        const maxY = 100;

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
        const location = new Vector3(x, y, 0);
        const norm = location.length();

        let newFruit = new Fruit(
            this.state.fruits.length,
            word,
            pickRandomFruitType(),
            location,
            (-x / norm) * speed,
            (-y / norm) * speed
        );
        this.state.fruits.push(newFruit);
        this.add(newFruit);

        console.log('New fruit', newFruit);
    }

    removeFruit(fruit) {
        // Reference: https://stackoverflow.com/questions/2003815/how-to-remove-element-from-an-array-in-javascript
        const id = fruit.getId();
        this.state.fruits.splice(id, 1);

        // re-index fruits
        for (let i = 0; i < this.state.fruits.length; i++) {
            this.state.fruits[i].setId(i);
        }

        this.state.startingLetter[fruit.getWord().charAt(0)] = false;
    }

    /**
     * Creates a pixel color.
     * @param {string} letter - The letter to consider
     */
    acceptLetter(letter) {
        letter = letter.toLowerCase();
        // no fruit right now
        if (!this.state.currentFruit) {
            if (this.state.fruits.length === 0) {
                // do nothing if there's no fruits
                return;
            }

            for (const fruit of this.state.fruits) {
                // arbitrarily pick first seen.
                // TODO: Prevent fruits from starting with the same letter
                if (fruit.getWord().charAt(0) == letter) {
                    this.state.currentFruit = fruit;
                    break;
                }
            }

            // if letter doesn't match anything, return
            if (!this.state.currentFruit) {
                return;
            }
        }

        let done = this.state.currentFruit.acceptLetter(letter);

        if (done) {
            console.log('Finished fruit', this.state.currentFruit);

            this.removeFruit(this.state.currentFruit); // created a new method for removing fruit

            this.state.currentFruit = null;

            // TODO: More dynamic point allocation
            this.state.points = this.state.points + 1;
        }
    }
    /**
     * updates objects in game.
     * @param {Fruit} fruit - The fruit in question
     */
    collisionWithNinja(fruit) {
        // TODO: calculate
        // random values for the bounding box
        const ninjaMinX = 0;
        const ninjaMaxX = 10;
        const ninjaMinY = 0;
        const ninjaMaxY = 10;

        return (
            (fruit.getLocation().x >= ninjaMinX ||
                fruit.getLocation().x <= ninjaMaxX) &&
            (fruit.getLocation().y >= ninjaMinY ||
                fruit.getLocation().y >= ninjaMaxY)
        );
    }

    /**
     * updates objects in game.
     * @param {number} time - The time elapsed in the game
     */
    update(time) {
        for (const fruit of this.state.fruits) {
            fruit.update(time);

            // handle collisions with ninja
            if (this.collisionWithNinja(fruit)) {
                // remove fruit
                // console.log('Collision', fruit);
                // this.removeFruit(fruit);
                // this.state.lives -= 1;
            }
        }
        // this.state.time = time;
    }
}

export default Game;
